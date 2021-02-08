import axios from 'axios';

export const BASE_URL = "http://localhost:5000/api";
//export const BASE_URL = "https://potluckplannerapi.herokuapp.com/api";

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: BASE_URL,
        headers: { Authorization: token }
    });
}