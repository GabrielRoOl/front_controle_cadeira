import { Link } from 'react-router-dom';
import { useAuth } from "../../contexto/AuthContext";
import logo from './logo.png';
import styles from './Cabecalho.module.css';
import CabecalhoLink from 'componentes/CabecalhoLink';


function Cabecalho() {
    const { logoutUser } = useAuth();

    const handleLogout = () => {
        logoutUser();   
    };

    return (
        <header className={styles.cabecalho}>
            <Link to="/">
                <img src={logo} alt="Logo do Vitrium" />
            </Link>

            <nav>
                <CabecalhoLink url="/login" onClick={handleLogout}>
                    Sair
                </CabecalhoLink>
            </nav>
        </header>
    );
}

export default Cabecalho;