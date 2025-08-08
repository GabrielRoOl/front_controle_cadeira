import React, { useState } from 'react';
import styles from './BotaoDevolucao.module.css';
import axios from 'axios';

function BotaoDevolucao() {
    const [idCadeira, setIdCadeira] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDevolucao = async () => {
        if (!idCadeira) {
            setErro('Por favor, informe o ID da cadeira');
            return;
        }

        setIsLoading(true);
        setErro('');
        setMensagem('');

        try {
            const response = await axios.put(`http://localhost:8080/api/cadeira/devolucao/${idCadeira}`);

            setMensagem(`Cadeira ${idCadeira} devolvida com sucesso!`);
            setIdCadeira('');
            console.log('Resposta da devolução:', response.data);
        } catch (error) {
            console.error('Erro ao devolver cadeira:', error);

            if (error.response) {
                if (error.response.status === 404) {
                    setErro(`Cadeira com ID ${idCadeira} não encontrada`);
                } else {
                    setErro(`Erro ${error.response.status}: ${error.response.data.message || 'Erro ao processar devolução'}`);
                }
            } else {
                setErro('Erro de conexão com o servidor');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Devolução de Cadeira</h2>

            {mensagem && <div className={styles.mensagemSucesso}>{mensagem}</div>}
            {erro && <div className={styles.mensagemErro}>{erro}</div>}

            <div className={styles.formGroup}>
                <label htmlFor="idCadeira" className={styles.label}>
                    ID da Cadeira:
                </label>
                <input
                    type="text"
                    id="idCadeira"
                    value={idCadeira}
                    onChange={(e) => setIdCadeira(e.target.value)}
                    className={styles.input}
                    placeholder="Digite o ID da cadeira"
                />
            </div>

            <button
                onClick={handleDevolucao}
                disabled={isLoading || !idCadeira}
                className={styles.botao}
            >   
                {isLoading ? 'Processando...' : 'Devolver Cadeira'}
            </button>
        </div>
    );
}

export default BotaoDevolucao;