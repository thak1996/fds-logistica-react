import styles from './Modal.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'success' | 'error';
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, type, children }: ModalProps) {
  if (!isOpen) return null;

  const titleStyle = type === 'success' ? styles.titleSuccess : styles.titleError;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <h2 className={`${styles.title} ${titleStyle}`}>{title}</h2>
        <div className={styles.message}>{children}</div>
        <button className={styles.closeButton} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}