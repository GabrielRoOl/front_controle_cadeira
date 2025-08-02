import Rodape from "componentes/Rodape";

const { default: Cabecalho } = require("componentes/Cabecalho");


function Inicio() {
    return (
        <>
            <Cabecalho />
            
            <Rodape/>
        </>
    )
}

export default Inicio;