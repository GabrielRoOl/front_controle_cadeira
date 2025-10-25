import Inicio from "paginas";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function AppRoutes() {
    return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route>
                    <Route path="/" element={<Inicio />}></Route>
                </Route>
                
                </Routes>
            </BrowserRouter>
    )
}

export default AppRoutes;