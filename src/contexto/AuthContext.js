import { createContext, useState, useContext } from "react";

// Contexto responsável por armazenar e compartilhar o token JWT
const AuthContext = createContext();

// Provedor que envolve a aplicação e mantém o estado de autenticação
export const AuthProvider = ({ children }) => {
    // O token é carregado do localStorage (se existir)
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Salva o token no localStorage e atualiza estado global
    const loginUser = (jwtToken) => {
        localStorage.setItem("token", jwtToken);
        setToken(jwtToken);
    };

    // Remove o token e "desloga" o usuário
    const logoutUser = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    

    return (
        <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};


// Hook para acessar o AuthContext com facilidade
export const useAuth = () => useContext(AuthContext);
