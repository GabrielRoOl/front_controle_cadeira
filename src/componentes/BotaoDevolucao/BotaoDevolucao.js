import React, { useState } from 'react';
import styles from './BotaoDevolucao.module.css';
import axios from 'axios';

function BotaoDevolucao() {
    // Estado para armazenar a cadeira selecionada
    const [cadeiraSelecionada, setCadeiraSelecionada] = useState('CADEIRA_01');
    // Estados para feedback ao usuário
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Array com todas as opções de cadeira disponíveis
    const opcoesCadeiras = [
        'CADEIRA_01', 'CADEIRA_02', 'CADEIRA_03',
        'CADEIRA_04', 'CADEIRA_05', 'CADEIRA_06',
        'CADEIRA_07', 'CADEIRA_08', 'CADEIRA_09'
    ];

    // Função para lidar com a devolução da cadeira
    const handleDevolucao = async () => {
        setIsLoading(true);
        setErro('');
        setMensagem('');

        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://localhost:8080/api/cadeira/devolucao/ECadeira/${cadeiraSelecionada}`,
                {}, // body vazio (PUT exige body, mesmo que não use)
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            // Feedback de sucesso
            setMensagem(`Cadeira ${cadeiraSelecionada} devolvida com sucesso!`);
            console.log('Resposta da devolução:', response.data);
        } catch (error) {
            console.error('Erro ao devolver cadeira:', error);

            // Tratamento de diferentes tipos de erros
            if (error.response) {
                if (error.response.status === 404) {
                    setErro(`Cadeira ${cadeiraSelecionada} não encontrada`);
                } else {
                    setErro(`Cadeira ${ cadeiraSelecionada } já foi devolvida!`);
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

            {/* Mensagens de feedback */}
            {mensagem && <div className={styles.mensagemSucesso}>{mensagem}</div>}
            {erro && <div className={styles.mensagemErro}>{erro}</div>}

            <div className={styles.formGroup}>
                <label htmlFor="cadeira" className={styles.label}>
                    Selecione a Cadeira:
                </label>
                {/* Dropdown de seleção de cadeiras */}
                <select
                    id="cadeira"
                    value={cadeiraSelecionada}
                    onChange={(e) => setCadeiraSelecionada(e.target.value)}
                    className={styles.select}
                >
                    {opcoesCadeiras.map((cadeira) => (
                        <option key={cadeira} value={cadeira}>
                            {cadeira.replace('_', ' ')} {/* Transforma "CADEIRA_01" em "CADEIRA 01" */}
                        </option>
                    ))}
                </select>
            </div>

            {/* Botão de devolução */}
            <button
                onClick={handleDevolucao}
                disabled={isLoading}
                className={styles.botao}
            >
                {isLoading ? 'Processando...' : 'Devolver Cadeira'}
            </button>
        </div>
    );
}

export default BotaoDevolucao;