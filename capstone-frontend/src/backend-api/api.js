import axios from "axios";

export const BACKEND_API = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8000/api"
});

export function SetAuthToken(token) {
    if(token) {
        BACKEND_API.defaults.headers.common['Authorization'] = `Bearer ${ token }`;
    } else {
        delete BACKEND_API.defaults.headers.common['Authorization'];
    }
}

export default BACKEND_API;