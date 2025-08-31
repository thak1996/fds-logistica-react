import { useState } from 'react';
import SEO from '../../components/SEO';
import Modal from '../../components/modals/Modal';
import { sendContactEmail, type ContactFormData } from '../../services/emailService';
import styles from './ContactPage.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', phone: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const formatPhone = (value: string) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 2) return digits;
        if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const formatted = formatPhone(raw);
        setFormData(prev => ({ ...prev, phone: formatted }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === 'sending') return;
        setStatus('sending');
        try {
            const result = await sendContactEmail(formData);
            console.log('sendContactEmail result:', result);
            if (result.success) {
                setStatus('success');
                setErrorMessage(undefined);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 4000);
            } else {
                setErrorMessage(result.message ?? 'Resposta inesperada do servidor');
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (err) {
            console.error('Erro ao enviar contato:', err);
            setErrorMessage(err instanceof Error ? err.message : String(err));
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const closeModal = () => {
        setStatus('idle');
        setErrorMessage(undefined);
    };

    return (
        <>
            <SEO title="Contato" description="Entre em contato com a FDS Logística." />

            <div className={styles.pageWrapper}>
                <div className={styles.grid}>
                    {/* Lado Esquerdo: Formulário */}
                    <div className={styles.card}>
                        <h1 className={styles.title}>Contato</h1>
                        <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Para entrar em contato, preencha o formulário abaixo ou envie sua mensagem para o email: <strong>contato@fdslogistica.com.br</strong></p>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}><label htmlFor="name" className={styles.label}>Nome *</label><input id="name" name="name" type="text" placeholder="Seu nome" value={formData.name} onChange={handleChange} className={styles.input} required /></div>
                                <div className={styles.formGroup}><label htmlFor="email" className={styles.label}>E-mail *</label><input id="email" name="email" type="email" placeholder="seu@exemplo.com" value={formData.email} onChange={handleChange} className={styles.input} required /></div>
                                <div className={styles.formGroup}><label htmlFor="phone" className={styles.label}>Telefone *</label><input id="phone" name="phone" type="tel" placeholder="(11) 9xxxx-xxxx" value={formData.phone} onChange={handlePhoneChange} className={styles.input} maxLength={16} required /></div>
                                <div className={styles.formGroup}><label htmlFor="subject" className={styles.label}>Assunto *</label><input id="subject" name="subject" type="text" placeholder="Assunto da mensagem" value={formData.subject} onChange={handleChange} className={styles.input} required /></div>
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}><label htmlFor="message" className={styles.label}>Mensagem *</label><textarea id="message" name="message" placeholder="Descreva sua dúvida, solicitação ou comentário..." value={formData.message} onChange={handleChange} rows={6} className={styles.textarea} required></textarea></div>
                            <div className={`${styles.buttonRow} ${styles.fullWidth}`}>
                                <button type="submit" className={styles.smallButton} disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}</button>
                            </div>
                        </form>
                    </div>

                    {/* Lado Direito: Informações */}
                    <div className={styles.card}>
                        <h2 className={styles.infoSide_h2}>FDS Logística</h2>

                        <div className={styles.infoBlock}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoIcon}>📞</span>
                                <div className={styles.infoContent}>
                                    <strong>Telefone</strong>
                                    <div>11 2358-9716</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoBlock}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoIcon}>✉️</span>
                                <div className={styles.infoContent}>
                                    <strong>E-mail</strong>
                                    <div>contato@fdslogistica.com.br</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoBlock}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoIcon}>📍</span>
                                <div className={styles.infoContent}>
                                    <strong>Endereço</strong>
                                    <div>Rua Palhoça, 398<br />Cumbica - Parque Industrial<br />Guarulhos/SP<br />CEP 07241-010</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoBlock}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoIcon}>🕒</span>
                                <div className={styles.infoContent}>
                                    <strong>Horário de Atendimento</strong>
                                    <div>Segunda a Sexta: 8h às 18h<br />Sábado: 8h às 12h</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoBlock}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoIcon}>📌</span>
                                <div className={styles.infoContent}>
                                    <strong>Localização</strong>
                                </div>
                            </div>
                            <div className={styles.mapContainer}>
                                <iframe
                                    title="Mapa FDS Logística"
                                    className={styles.mapIframe}
                                    src="https://www.google.com/maps?q=Rua+Palho%C3%A7a+398+Guarulhos+SP&hl=pt&z=15&output=embed"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={status === 'success'} onClose={closeModal} type="success" />
            <Modal isOpen={status === 'error'} onClose={closeModal} type="error" debugMessage={errorMessage} />
        </>
    );
}