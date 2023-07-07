import axios from 'axios';
import { getUserLocalStorage } from '../context/AuthProvider/util';
import React, { useState } from 'react';


function isTokenExpired(token) {
    if (!token) {
        // Se não houver token, considera-se como expirado
        return true;
    }

    const decodedToken = parseJwt(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Compara a expiração com o timestamp atual
    return decodedToken.exp < currentTimestamp;
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const fetch = axios.create({


    // baseURL para CONEXÃO LOCAL
    baseURL: "http://localhost:3001",


    // baseURL PARA CONEXÃO NUVEM (RENDER): 
    // baseURL: "https://api-selecionebem.onrender.com",
    // headers: {
    //     "Content-Type": "application/json; charset=UTF-8"
    // },
});

fetch.interceptors.request.use(

    async (config) => {
        const user = getUserLocalStorage();
   
        if (user) {
            const isExpired = isTokenExpired(user.token); // Verifique se o token expirou

            if (isExpired) {
                // Token expirou, redirecionará pra a tela de login
                localStorage.removeItem('u');
                window.alert("Sua sessão expirou. Por favor, faça login novamente.");
                window.location.href = "/login";

                // Rejeite a solicitação com um erro
                return Promise.reject(new Error("Token expirado"));
            }

            config.headers.Authorization = `Bearer ${user.token}`;
            config.headers['Content-Type'] = "application/json; charset=UTF-8";
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

);

export default fetch;