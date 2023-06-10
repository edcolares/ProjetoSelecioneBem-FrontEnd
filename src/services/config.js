import axios from 'axios';
import { getUserLocalStorage } from '../context/AuthProvider/util';

export const fetch = axios.create({


    // baseURL para CONEXÃO LOCAL
    baseURL: "http://localhost:3001",


    // baseURL PARA CONEXÃO NUVEM (CYCLIC): 
    // baseURL: "https://api-selecionebem.cyclic.app",
    // headers: {
    //     "Content-Type": "application/json; charset=UTF-8"
    // },
});

fetch.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage();

        config.headers.Authorization = `Bearer ${user?.token}`;
        config.headers['Content-Type'] = "application/json; charset=UTF-8";

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default fetch;