import axios from "axios";

const fetch = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Content-Type": "application/json; charset=UTF-8",        
    },
});

export default fetch