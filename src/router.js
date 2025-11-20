import Inicio from "paginas/home";
import Login from "paginas/login/Login"; // adicione o caminho correto
import Register from "paginas/registro/Register"; // adicione o caminho correto

import PrivateRoute from "componentes/Login/PrivateRoute"; // caminho conforme seu projeto
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRoutes() {
    return (
        // basename mantém compatibilidade com deploy em subdiretórios
        <BrowserRouter basename={process.env.PUBLIC_URL}>

            <Routes>

                {/* Rota pública - Login */}
                <Route path="/login" element={<Login />} />

                {/* Rota pública - Registro */}
                <Route path="/register" element={<Register />} />

                {/* Rota protegida */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Inicio />
                        </PrivateRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;
