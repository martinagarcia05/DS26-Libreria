import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../../assets/styles/Header.css';

function Header() {
  return (
    <Navbar expand="lg" className="custom-header">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <img src="/src/assets/libroIcono.png" alt="Logo" width="32" height="32" />
          <span className="fw-bold brand-text">Librería UTN</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-2">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/catalogo">Catálogo</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Nosotros</Nav.Link>
            <button className="btn-login ms-lg-3 mt-2 mt-lg-0">Ingresar</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
