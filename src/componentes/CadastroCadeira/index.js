import React, { useState } from 'react';
import styles from './CadastroCadeira.module.css';
import axios from 'axios'; 
import Titulo from 'componentes/Titulo';

function CadastroCadeira() {
    const [formData, setFormData] = useState({
        nomePaciente: '',
        destino: '',
        numeroClinica: 0,
        cadeira: 'CADEIRA_01'
    });

    // Estado para feedback ao usuário
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    // Função para atualizar os campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'numeroClinica' ? parseInt(value) : value // Converte para número se for o campo numeroClinica
        }));
    };

    // Função para enviar os dados ao backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setMensagem('');

        try {
            // Envia a requisição POST para o endpoint do backend
            const response = await axios.post('http://localhost:8080/api/cadeira', formData);

            // Feedback de sucesso
            setMensagem('Cadastro realizado com sucesso!');
            console.log('Resposta do servidor:', response.data);

            // Limpa o formulário após o sucesso
            setFormData({
                nomePaciente: '',
                destino: '',
                numeroClinica: 0,
                cadeira: 'CADEIRA_01'
            });

        } catch (error) {
            // Tratamento de erros
            console.error('Erro ao cadastrar:', error);
            setErro('Erro ao cadastrar. Por favor, tente novamente.');
        }
    };

    return (
        <div className={styles.container}>
            <Titulo><h1>Cadastrar Cadeira</h1></Titulo>

            {/* Mensagens de feedback */}
            {mensagem && <div className={styles.alertSuccess}>{mensagem}</div>}
            {erro && <div className={styles.alertDanger}>{erro}</div>}

            {/* Formulário de cadastro */}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Nome do Paciente:</label>
                    <input
                        type="text"
                        name="nomePaciente"
                        value={formData.nomePaciente}
                        onChange={handleChange}
                        required
                        className={styles.formControl} 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Destino:</label>
                    <input
                        type="text"
                        name="destino"
                        value={formData.destino}
                        onChange={handleChange}
                        required
                        className={styles.formControl}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Número da Clínica:</label>
                    <input
                        type="number"
                        name="numeroClinica"
                        value={formData.numeroClinica}
                        onChange={handleChange}
                        required
                        className={styles.formControl}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Cadeira:</label>
                    <select
                        name="cadeira"
                        value={formData.cadeira}
                        onChange={handleChange}
                        className={styles.formControl}
                    >
                        <option value="CADEIRA_01">Cadeira 01</option>
                        <option value="CADEIRA_02">Cadeira 02</option>
                        <option value="CADEIRA_03">Cadeira 03</option>
                        <option value="CADEIRA_04">Cadeira 04</option>
                        <option value="CADEIRA_05">Cadeira 05</option>
                        <option value="CADEIRA_06">Cadeira 06</option>
                        <option value="CADEIRA_07">Cadeira 07</option>
                        <option value="CADEIRA_08">Cadeira 08</option>
                        <option value="CADEIRA_09">Cadeira 09</option>
                        {/* Adicione outras opções conforme seu enum */}
                    </select>
                </div>

                <button type="submit" className={styles.btnPrimary}>Cadastrar</button>
            </form>
        </div>
    );
}

export default CadastroCadeira;