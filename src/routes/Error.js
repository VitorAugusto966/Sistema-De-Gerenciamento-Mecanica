import { useNavigate } from "react-router-dom";
import Header from "../header";
import { FaExclamationTriangle } from "react-icons/fa"; 
import "../../src/pages/home/home.css";

export default function Erro() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="erro-container">
        <FaExclamationTriangle className="erro-icon" />
        <h1>Página não encontrada.</h1>
        <p>A página que você procura pode ter sido removida ou não existe.</p>
        <button onClick={() => navigate("/admin")} className="btn-voltar">
          Voltar para a página inicial
        </button>
      </div>
    </>
  );
}
