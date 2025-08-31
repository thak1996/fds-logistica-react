import React from 'react';
import styles from './Modal.module.css';

type ModalType = 'success' | 'error';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: ModalType;
  title?: string;
  message?: string;
  details?: string | React.ReactNode;
  debugMessage?: string | undefined;
}

export default function Modal({
  isOpen,
  onClose,
  type = 'success',
  title,
  message,
  details,
  debugMessage
}: ModalProps) {
  if (!isOpen) return null;

  // defaults (from your PHP templates)
  const defaults = {
    success: {
      title: 'Orçamento Enviado com Sucesso!',
      message:
        'Sua solicitação foi recebida. Nossa equipe entrará em contato em breve para fornecer todas as informações sobre sua mudança.',
      details: `<strong>Próximos passos:</strong><br>
        • Nossa equipe analisará sua solicitação<br>
        • Entraremos em contato por telefone ou e-mail<br>
        • Enviaremos uma proposta personalizada`
    },
    error: {
      title: 'Erro no Envio do Orçamento',
      message:
        'Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente ou entre em contato conosco diretamente.',
      details: `<strong>O que você pode fazer:</strong><br>
        • Tente enviar o orçamento novamente<br>
        • Verifique se todos os campos estão preenchidos<br>
        • Entre em contato: contato@fdslogistica.com.br`
    }
  };

  const isError = type === 'error';
  const titleToShow = title ?? (isError ? defaults.error.title : defaults.success.title);
  const messageToShow = message ?? (isError ? defaults.error.message : defaults.success.message);
  const detailsToShow = details ?? (isError ? defaults.error.details : defaults.success.details);

  const icon = isError ? (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.iconWrap} data-type={type}>
            {icon}
          </div>

          <h3 className={isError ? styles.titleError : styles.titleSuccess}>{titleToShow}</h3>

          {messageToShow && <div className={styles.message}>{messageToShow}</div>}

          {detailsToShow && (
            <div
              className={styles.details}
              dangerouslySetInnerHTML={typeof detailsToShow === 'string' ? { __html: detailsToShow } : undefined}
            >
              {typeof detailsToShow !== 'string' ? detailsToShow : null}
            </div>
          )}

          {isError && debugMessage && (
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: '0.75rem', background: '#fff6f6', padding: '0.75rem', borderRadius: 6, color: '#7f1d1d' }}>
              {debugMessage}
            </pre>
          )}

          <div className={styles.actions}>
            <button className={isError ? styles.btnError : styles.btnSuccess} onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}