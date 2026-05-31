import { NavLink } from 'react-router-dom';
import '../../assets/styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <img src="/src/assets/libroIcono.png" alt="Logo" className="logo-icon" />
          <h1>Librería UTN</h1>
        </div>
        <nav>
          <NavLink to="/" className="nav-link">Inicio</NavLink>
          <NavLink to="/catalogo" className="nav-link">Catálogo</NavLink>
          <NavLink to="/contacto" className="nav-link">Nosotros</NavLink>
          <button className="btn-login">Ingresar</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
