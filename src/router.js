import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cabecalho from "./Componetes/Cabecalho";

function AppRoutes() {
    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Cabecalho />
                        
                    </Route>
                </Routes>
            </BrowserRouter>
        </main>
        
    )
}

export default AppRoutes;