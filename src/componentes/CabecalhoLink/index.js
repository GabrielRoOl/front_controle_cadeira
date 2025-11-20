import { Link } from 'react-router-dom';
import styles from './CabecalhoLink.module.css';

function CabecalhoLink({ url, children, onClick }) {
    return (
        <Link
            to={url}
            className={styles.link}
            onClick={onClick}
        >
            {children}
        </Link>
    );
}

export default CabecalhoLink;