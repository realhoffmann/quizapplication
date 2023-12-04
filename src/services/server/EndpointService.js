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
        return axios
            .get(`${BASE_URL}/${endpoint}`, {'headers': this.getAuthHeader()});
    },

    /**
     * Post data to the API
     */
    post(endpoint, data) {
        return axios
            .post(`${BASE_URL}/${endpoint}`, data, {'headers': this.getAuthHeader()});
    },

    /**
     * Put data to the API
     */
    put(endpoint, data) {
        return axios
            .put(`${BASE_URL}/${endpoint}`, data, {'headers': this.getAuthHeader()});
    },

    /**
     * Delete data from the API
     */
    delete(endpoint) {
        return axios
            .delete(`${BASE_URL}/${endpoint}`, {'headers': this.getAuthHeader()});
    },

    /**
     * Set the authorization token
     * @returns {{Authorization: string}|{}}
     */
    getAuthHeader() {
        return {"Authorization": "Bearer " + (localStorage.getItem("auth_token") || null)};
    }
};
