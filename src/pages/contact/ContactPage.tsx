import { useState } from 'react';
import SEO from '../../components/SEO';
import styles from './ContactPage.module.css';

export default function ContactPage() {
    const [status, setStatus] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus('Enviando...');

        const form = event.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/YOUR_UNIQUE_CODE', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('Mensagem enviada com sucesso!');
                form.reset();
            } else {
                setStatus('Ocorreu um erro ao enviar. Tente novamente.');
            }
        } catch (error) {
            console.error(error);
            setStatus('Ocorreu um erro de rede. Tente novamente.');
        }
    }

    return (
        <>
            <SEO
                title="Contact"
                description="FDS Logística: especialista em mudanças residenciais e comerciais, transporte de equipamentos sensíveis, armazenagem e terceirização de mão de obra."
            />
            <div className={styles.pageContainer}>
                <h1 className={styles.title}>Entre em Contato</h1>
                <div className={styles.grid}>
                    {/* Lado das Informações */}
                    <div className={styles.infoSide}>
                        <h2>Nossas Informações</h2>
                        <div className={styles.infoBlock}>
                            <strong>Endereço</strong>
                            <p>Rua Palhoça, 398, Guarulhos, SP, 07241-010</p>
                        </div>
                        <div className={styles.infoBlock}>
                            <strong>Telefone</strong>
                            <p><a href="tel:+551123589716">+55 (11) 2358-9716</a></p>
                        </div>
                        <div className={styles.infoBlock}>
                            <strong>Email</strong>
                            <p><a href="mailto:contato@fdslogistica.com.br">contato@fdslogistica.com.br</a></p>
                        </div>
                        <div className={styles.infoBlock}>
                            <strong>Horário de Funcionamento</strong>
                            <p>Seg-Sex: 08:00 - 18:00</p>
                            <p>Sáb: 08:00 - 12:00</p>
                        </div>
                    </div>

                    {/* Lado do Formulário */}
                    <div className={styles.formSide}>
                        <h2>Envie uma Mensagem</h2>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <input className={styles.input} type="text" name="name" placeholder="Seu Nome" required />
                            <input className={styles.input} type="email" name="email" placeholder="Seu E-mail" required />
                            <input className={styles.input} type="tel" name="phone" placeholder="Seu Telefone" />
                            <textarea className={styles.textarea} name="message" placeholder="Sua Mensagem" required></textarea>
                            <button className={styles.button} type="submit" disabled={status === 'Enviando...'}>
                                {status === 'Enviando...' ? 'Enviando...' : 'Enviar'}
                            </button>
                            {status && <p className={`${styles.statusMessage} ${status.includes('sucesso') ? styles.success : styles.error}`}>{status}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}