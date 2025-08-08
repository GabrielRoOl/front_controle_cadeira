import BotaoDevolucao from "componentes/BotaoDevolucao/BotaoDevolucao";
import CadastroCadeira from "componentes/CadastroCadeira";
import Rodape from "componentes/Rodape";
import Titulo from "componentes/Titulo";

const { default: Cabecalho } = require("componentes/Cabecalho");


function Inicio() {
    return (
        <>
            <Cabecalho />
            <Titulo>
                <h1>Controle de cadeira de rodas</h1>
            </Titulo>
            <CadastroCadeira />
            <BotaoDevolucao/>
            
            <Rodape/>
        </>
    )
}

export default Inicio;