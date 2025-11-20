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

    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    // Função para atualizar os campos do formulário com validações de tamanho
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validações individuais por campo
        if (name === "nomePaciente" && value.length > 100) return;
        if (name === "destino" && value.length > 40) return;
        if (name === "numeroClinica" && value.length > 4) return;

        setFormData(prev => ({
            ...prev,
            [name]: name === 'numeroClinica'
                ? value.replace(/\D/g, "") // remove caracteres não numéricos
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setMensagem('');

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                'http://localhost:8080/api/cadeira',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMensagem('Cadastro realizado com sucesso!');
            console.log('Resposta do servidor:', response.data);

            setFormData({
                nomePaciente: '',
                destino: '',
                numeroClinica: 0,
                cadeira: 'CADEIRA_01'
            });

        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            setErro(`Cadeira ${formData.cadeira} está em uso`);
        }
    };

    return (
        <div className={styles.container}>
            <Titulo><h1>Cadastrar Cadeira</h1></Titulo>

            {mensagem && <div className={styles.alertSuccess}>{mensagem}</div>}
            {erro && <div className={styles.alertDanger}>{erro}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>

                {/* Nome do Paciente */}
                <div className={styles.formGroup}>
                    <label>Nome do Paciente:</label>
                    <input
                        type="text"
                        name="nomePaciente"
                        value={formData.nomePaciente}
                        onChange={handleChange}
                        required
                        maxLength={50}  // limite no HTML
                        className={styles.formControl}
                    />
                </div>

                {/* Destino */}
                <div className={styles.formGroup}>
                    <label>Destino:</label>
                    <input
                        type="text"
                        name="destino"
                        value={formData.destino}
                        onChange={handleChange}
                        required
                        maxLength={30}  // limite no HTML
                        className={styles.formControl}
                    />
                </div>

                {/* Número da Clínica */}
                <div className={styles.formGroup}>
                    <label>Número da Clínica:</label>
                    <input
                        type="text"
                        name="numeroClinica"
                        value={formData.numeroClinica}
                        onChange={handleChange}
                        required
                        maxLength={4} // máximo 4 dígitos
                        className={styles.formControl}
                    />
                </div>

                {/* Cadeira */}
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
                    </select>
                </div>

                <button type="submit" className={styles.btnPrimary}>Cadastrar</button>
            </form>
        </div>
    );
}

export default CadastroCadeira;
