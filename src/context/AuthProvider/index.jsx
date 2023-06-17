import React, { createContext, useEffect, useState } from "react";
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from "./util";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const navigate = new useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = getUserLocalStorage();

        if (user) {
            setUser(user);
        }
    }, []);

    async function authenticate(email, password) {
        const response = await LoginRequest(email, password);

        const { id, name } = response.user;
        const { token } = response;

        const payload = { id, name, email, token };

        setUser(payload);
        setUserLocalStorage(payload);
    }

    async function logout() {
        setUser(null);
        setUserLocalStorage(null);
        localStorage.removeItem('u');
    }

    return (
        <AuthContext.Provider value={{ ...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
