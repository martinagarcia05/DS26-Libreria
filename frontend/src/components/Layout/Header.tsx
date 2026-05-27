import '../../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <img src="/src/assets/libroIcono.png" alt="Logo" className="logo-icon" />
          <h1>Librería UTN</h1>
        </div>
        <nav>
          <a href="#" className="nav-link">Inicio</a>
          <a href="#" className="nav-link">Catálogo</a>
          <a href="#" className="nav-link">Nosotros</a>
          <button className="btn-login">Ingresar</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
