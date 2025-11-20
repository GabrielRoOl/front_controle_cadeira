import axios from "axios";

const API_URL = "http://localhost:8080/auth"; 

// crie um axios instance para debug e headers padrão
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000,
});

api.interceptors.request.use(request => {
    // loga as requisições antes de envia-las
    console.log("[API REQUEST]", request.method.toUpperCase(), request.baseURL + request.url, request.data);
    return request;
}, error => {
    console.error("[API REQUEST ERROR]", error);
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    console.log("[API RESPONSE]", response.status, response.data);
    return response;
}, error => {
    console.error("[API RESPONSE ERROR]", error?.response ? error.response : error.message);
    return Promise.reject(error);
});

// exporta funções usando o axios instance
export const login = async (login, password) => {
    const response = await api.post("/login", { login, password });
    return response.data;
};

export const register = async (login, password, confirmPassword, role) => {
    // validação simples no cliente (evita chamadas desnecessárias)
    if (!login || !password || !confirmPassword || !role) {
        throw new Error("Todos os campos são obrigatórios.");
    }
    if (password !== confirmPassword) {
        throw new Error("As senhas não coincidem.");
    }

    const response = await api.post("/register", {
        login,  
        password,
        confirmPassword,
        role
    });

    return response.data;
};
