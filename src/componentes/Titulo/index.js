import styles from './Titulo.module.css';

function Titulo({ children }) {
    return (
        <div className={styles.titulo}>
            {children}
        </div>
    )
}

export default Titulo;