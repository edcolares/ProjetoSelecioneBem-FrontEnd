import axios from "axios";

const fetch = axios.create({
    baseURL: "http://localhost:3001",
    //     baseURL: "https://api-selecionebem.cyclic.app",
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    },
});

export default fetch