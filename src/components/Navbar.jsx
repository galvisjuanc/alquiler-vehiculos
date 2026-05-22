import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav style={{ display: 'flex', gap: '15px', padding: '10px', background: '#eee' }}>
            <Link to="/">Inicio</Link>
            <Link to="/vehiculos">Catálogo</Link>
            <Link to="/admin">Administración</Link>
        </nav>
    );
}