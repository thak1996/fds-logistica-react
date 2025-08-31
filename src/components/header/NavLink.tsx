import { Link, useLocation } from 'react-router-dom';

type NavLinkProps = {
    href: string;
    className: string;
    activeClassName: string;
    children: React.ReactNode;
};

export default function NavLink({ href, className, activeClassName, children }: NavLinkProps) {
    const location = useLocation();
    const normalize = (p: string) => p.replace(/\/$/, '') || '/';
    const current = normalize(location.pathname || '/');
    const target = normalize(href || '/');
    const isActive = current === target;
    const allClassNames = `${className} ${isActive ? activeClassName : ''}`;

    return (
        <Link to={href} className={allClassNames}>
            {children}
        </Link>
    );
}