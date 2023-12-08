let token = null;
let expiryTimer = null;

onmessage = function(e) {
    switch (e.data.type) {
        case 'SET_TOKEN':
            token = e.data.token;
            setExpiryTimer();
            console.log('Token set: ' + token);
            postMessage({ type: 'AUTH_UPDATED', loggedIn: true });
            break;
        case 'CLEAR_TOKEN':
            clearToken();
            console.log('Token cleared');
            postMessage({ type: 'AUTH_UPDATED', loggedIn: false });
            break;
        case 'CHECK_AUTH':
            console.log('Auth check: ' + token);
            postMessage({ type: 'AUTH_UPDATED', loggedIn: token !== null });
            break;
    }
};

function setExpiryTimer() {
    if (token) {
        const expiryTime = decodeTokenAndGetExpiry(token);
        const currentTime = Date.now() / 1000;
        const timeUntilExpiry = (expiryTime - currentTime) * 1000;
        console.log('Token expires in ' + timeUntilExpiry + 'ms');
        expiryTimer = setTimeout(() => {
            token = null;
            postMessage({ type: 'TOKEN_EXPIRED' });
            postMessage({ type: 'AUTH_UPDATED', loggedIn: false });
        }, timeUntilExpiry);
    }
}

function clearToken() {
    token = null;
    clearTimeout(expiryTimer);
    localStorage.removeItem('auth_token');
    postMessage({ type: 'AUTH_UPDATED', loggedIn: false });
}

function decodeTokenAndGetExpiry(token) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload).exp;
}
