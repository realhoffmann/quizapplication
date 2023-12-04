import {jwtDecode} from "jwt-decode";


export function getUserFromToken(token) {
    try {
        console.log("token to decode: ", token);
        const decodedToken = jwtDecode(token);

        console.log("decoded token: ", decodedToken);

        return {
            id: decodedToken.id,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
            role: decodedToken.role
        };
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}
