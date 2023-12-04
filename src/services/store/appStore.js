import {defineStore} from 'pinia';

const authWorker = new Worker('/auth/AuthWorker.js', {type: 'module'});


export const useAppStore = defineStore('appStore', {
    state: () => ({
        selectedCategory: String,
        requestId: Number,
        points: Number,
        quizDuration: Number,
        nickname: String,
        loggedIn: localStorage.getItem('isLoggedIn') === 'true',
        authToken: localStorage.getItem('auth_token') || null
    }),

    actions: {
        setSelectedCategory(category) {
            this.selectedCategory = category;
        },
        getSelectedCategory() {
            return this.selectedCategory;
        },
        setRequestId(requestId) {
            this.requestId = requestId;
        },
        getRequestId() {
            return this.requestId;
        },
        setPoints(points) {
            this.points = points;
        },
        getPoints() {
            return this.points;
        },
        setQuizDuration(quizDuration) {
            this.quizDuration = quizDuration;
        },
        getQuizDuration() {
            return this.quizDuration;
        },
        setNickname(nickname) {
            this.nickname = nickname;
        },
        getNickname() {
            return this.nickname;
        },
        getLoggedIn() {
            return this.loggedIn;
        },
        logIn(token) {
            console.log('Logging in with token: ' + token);
            localStorage.setItem('isLoggedIn', 'true');
            this.loggedIn = true;
            localStorage.setItem('auth_token', token);
            authWorker.postMessage({ type: 'SET_TOKEN', token: token });
        },

        logOut() {
            this.loggedIn = false;
            localStorage.removeItem('auth_token');
            console.log('Logging out and clearing token, token:' + localStorage.getItem('auth_token'));
            localStorage.setItem('isLoggedIn', 'false');
            authWorker.postMessage({ type: 'CLEAR_TOKEN' });
        },

        checkAuthState() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            this.loggedIn = isLoggedIn;
            if (isLoggedIn) {
                authWorker.postMessage({ type: 'CHECK_AUTH' });
            }
        },
    }
});

authWorker.onmessage = function(e) {
    if (e.data.type === 'AUTH_UPDATED') {
        console.log('Auth updated: ' + e.data.loggedIn);
        const store = useAppStore();
        store.loggedIn = e.data.loggedIn;
    }
};
