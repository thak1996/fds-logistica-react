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
    const isActive = location.pathname === href;
    const allClassNames = `${className} ${isActive ? activeClassName : ''}`;

    return (
        <Link to={href} className={allClassNames}>
            {children}
        </Link>
    );
}