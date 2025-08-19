import React from 'react';
import styles from '../pages/home/HomePage.module.css';
import { Link } from 'react-router-dom';

interface ButtonProps {
    children: React.ReactNode;
    to?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    variant?: 'primary' | 'secondary';
}

export default function Button({ children, to, onClick, type = 'button', className }: ButtonProps) {
    const btnClass = `${styles.cardButton} ${className ? className : ''}`;
    if (to) {
        return (
            <Link to={to} className={btnClass}>
                {children}
            </Link>
        );
    }
    return (
        <button type={type} className={btnClass} onClick={onClick}>
            {children}
        </button>
    );
}
