import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type NavLinkProps = {
    href: string;
    className: string;
    activeClassName: string;
    children: React.ReactNode;
};

export default function NavLink({ href, className, activeClassName, children }: NavLinkProps) {
    const location = useLocation();
    const base = (import.meta.env.BASE_URL || '').replace(/\/$/, '');

    // Normalize paths to compare independent of basename and trailing slashes
    const normalize = (p: string) => p.replace(/\/$/, '') || '/';
    const current = normalize(location.pathname.replace(new RegExp(`^${base}`), '') || '/');
    const target = normalize(href.replace(new RegExp(`^${base}`), '') || '/');
    const isActive = current === target;
    const allClassNames = `${className} ${isActive ? activeClassName : ''}`;

    return (
        <Link to={href} className={allClassNames}>
            {children}
        </Link>
    );
}