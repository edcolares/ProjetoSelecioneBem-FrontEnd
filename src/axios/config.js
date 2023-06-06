import axios from "axios";

const fetch = axios.create({

    // baseURL para CONEXÃO LOCAL
    baseURL: "http://localhost:3001",

    // baseURL PARA CONEXÃO NUVEM (CYCLIC): 
    // baseURL: "https://api-selecionebem.cyclic.app",
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    },
});

export default fetch