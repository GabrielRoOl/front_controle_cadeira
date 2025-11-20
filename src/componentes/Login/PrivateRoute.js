import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexto/AuthContext";

// Componente que protege rotas
// Se o usuário tiver token, renderiza a página normalmente
// Se não tiver, redireciona para /login
export default function PrivateRoute({ children }) {
    const { token } = useAuth();

    return token ? children : <Navigate to="/login" />;
}
