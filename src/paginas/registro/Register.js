import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/authService";
import styles from "./Register.module.css";
import Rodape from "componentes/Rodape";

export default function Register() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🚨 Limite de 20 caracteres
        if (login.length > 20 || password.length > 20 || confirmPassword.length > 20) {
            setErro("Login e senha devem ter no máximo 20 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            setErro("As senhas não coincidem!");
            return;
        }

        try {
            await register(login, password, confirmPassword, role);

            alert("Usuário registrado com sucesso!");
            navigate("/login");
        } catch (err) {
            setErro("Erro ao registrar");
        }
    };

    // ⛔ Inputs limitados a 20 caracteres
    const handleLoginChange = (e) => {
        if (e.target.value.length <= 20) setLogin(e.target.value);
    };

    const handlePasswordChange = (e) => {
        if (e.target.value.length <= 20) setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        if (e.target.value.length <= 20) setConfirmPassword(e.target.value);
    };

    return (
        <><div className={styles.registerContainer}>
            <div className={styles.registerBox}>
                <h2 className={styles.registerTitle}>Criar Conta</h2>

                {/* Exibição de erro */}
                {erro && <p className={styles.errorMsg}>{erro}</p>}

                <form onSubmit={handleSubmit} className={styles.registerForm}>
                    <input
                        type="text"
                        placeholder="Login"
                        value={login}
                        onChange={handleLoginChange}
                        className={styles.registerInput}
                        maxLength={20}
                        required />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={handlePasswordChange}
                        className={styles.registerInput}
                        maxLength={20}
                        required />

                    <input
                        type="password"
                        placeholder="Confirmar senha"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={styles.registerInput}
                        maxLength={20}
                        required />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className={styles.registerInput}
                        required
                    >
                        <option value="USER">Usuário</option>
                        <option value="ADMIN">Administrador</option>
                    </select>

                    <button type="submit" className={styles.registerButton}>
                        Registrar
                    </button>
                </form>
            </div>
        </div><Rodape /></>
    );
}
