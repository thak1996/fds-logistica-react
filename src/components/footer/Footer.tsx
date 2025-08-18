import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} FDS Logística e Terceirização.
                Todos os direitos reservados.</p>
        </footer>
    );
}