import axios from "axios";

const BASE_URL = "http://localhost:8081/api";

/**
 * Service for making API calls
 * @type {{get(*): *, post(*, *): *, put(*, *): *, delete(*): *}}
 * @private {string} BASE_URL - The base URL for the API
 */
export default {

    /**
     * Get data from the API
     */
    get(endpoint) {
        let headers = {};
        if (this.getAuthToken() !== null) {
            headers = {"Authorization": "Bearer " + this.getAuthToken()};
        }
        return axios
            .get(`${BASE_URL}/${endpoint}`, {'headers': headers});
    },

    /**
     * Post data to the API
     */
    post(endpoint, data) {
        let headers = {};
        if (this.getAuthToken() !== null) {
            headers = {"Authorization": "Bearer " + this.getAuthToken()};
        }
        return axios
            .post(`${BASE_URL}/${endpoint}`, data, {'headers': headers});
    },

    /**
     * Put data to the API
     */
    put(endpoint, data) {
        let headers = {};
        if (this.getAuthToken() !== null) {
            headers = {"Authorization": "Bearer " + this.getAuthToken()};
        }
        return axios
            .put(`${BASE_URL}/${endpoint}`, data, {'headers': headers});
    },

    /**
     * Delete data from the API
     */
    delete(endpoint) {
        let headers = {};
        if (this.getAuthToken() !== null) {
            headers = {"Authorization": "Bearer " + this.getAuthToken()};
        }
        return axios
            .delete(`${BASE_URL}/${endpoint}`, {'headers': headers});
    },

    getAuthToken() {
        return window.localStorage.getItem("auth_token");
    },

    setAuthToken(token) {
        if (token !== null) {
            window.localStorage.setItem("auth_token", token);
        } else {
            window.localStorage.removeItem("auth_token");
        }
    }
};
