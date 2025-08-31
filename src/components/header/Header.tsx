import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const base = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';
    const navLinks = [
        { href: `${base}/`, label: 'Home' },
        { href: `${base}/company`, label: 'A Empresa' },
        { href: `${base}/service`, label: 'Serviços' },
        { href: `${base}/quote`, label: 'Orçamento' },
        { href: `${base}/contact`, label: 'Contato' },
    ];

    return (
        <div className={isMenuOpen ? styles.menuOpen : ''}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.logoWrapper}>
                        <Link to={base + '/'}>
                            <img src="https://i.imgur.com/eP2y6gB.jpeg" alt="Logo FDS" className={styles.logoImage} />
                        </Link>
                        <span className={styles.logoText}>FDS Logística e Terceirização</span>
                    </div>

                    <nav className={styles.navDesktop}>
                        <ul className={styles.navList}>
                            {navLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <NavLink href={href} className={styles.navLink} activeClassName={styles.activeLink}>
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <button className={styles.menuButton} onClick={() => setIsMenuOpen(true)} aria-label="Abrir menu">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24"><path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" /></svg>
                    </button>
                </div>
            </header>

            {isMenuOpen && (
                <div className={styles.overlay} onClick={closeMenu} aria-hidden="true"></div>
            )}

            <nav className={styles.navMobile} aria-label="Menu de navegação">
                <ul className={styles.navList} style={{ flexDirection: 'column', padding: '2rem', paddingTop: '5rem' }}>
                    {navLinks.map(({ href, label }) => (
                        <li key={href} onClick={closeMenu}>
                            <NavLink href={href} className={styles.navLink} activeClassName={styles.activeLink}>
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}