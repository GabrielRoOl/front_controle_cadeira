import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authService";
import { useAuth } from "../../contexto/AuthContext";
import styles from "../login/Login.module.css";
import Rodape from "componentes/Rodape";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚨 Validação de máximo 20 caracteres
    if (user.length > 20 || password.length > 20) {
      setErro("Login e senha devem ter no máximo 20 caracteres.");
      return;
    }

    try {
      const data = await login(user, password);
      loginUser(data.token);
      navigate("/");
    } catch (err) {
      setErro("Credenciais inválidas");
    }
  };

  // Funções de atualização com limite automático
  const handleUserChange = (e) => {
    const valor = e.target.value;
    if (valor.length <= 20) setUser(valor);
  };

  const handlePasswordChange = (e) => {
    const valor = e.target.value;
    if (valor.length <= 20) setPassword(valor);
  };

  return (
    <><div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Entrar</h2>

        {/* Mensagem de erro */}
        {erro && <p className={styles.errorMsg}>{erro}</p>}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            type="text"
            placeholder="Login"
            value={user}
            onChange={handleUserChange}
            className={styles.loginInput}
            maxLength={20} // <-- também limita pelo HTML
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={handlePasswordChange}
            className={styles.loginInput}
            maxLength={20} />

          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
        </form>
      </div>
    </div><Rodape /></>

  );
}
