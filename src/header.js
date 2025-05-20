import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConnection";
import { FiLogOut } from "react-icons/fi";
import "./header.css";

function Header() {
  const navigate = useNavigate();

  async function logout() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <Navbar expand="lg" className="custom-navbar shadow-sm">
      <Container>
        <Navbar.Brand href="/admin" className="fw-bold text-primary">
          ⚡ Inazuma
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="🔧 Mecânico" id="mecanico-dropdown">
              <NavDropdown.Item href="/cadMecanico">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="/viewMecanico">Visualizar</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="🛠️ Serviço" id="servico-dropdown">
              <NavDropdown.Item href="/cadServico">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="/viewServico">Visualizar</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="📑 Ordem de Serviço" id="os-dropdown">
              <NavDropdown.Item href="/cadOS">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="/viewOs">Visualizar</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="📊 Dashboard" id="dashboard-dropdown">
              <NavDropdown.Item href="/financeiro">Financeiro</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Button className="btn-logout" variant="danger" onClick={logout}>
            <FiLogOut size={18} className="logout-icon" /> Sair
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
