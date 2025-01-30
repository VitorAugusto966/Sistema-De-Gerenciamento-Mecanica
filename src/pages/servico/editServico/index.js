import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConnection";
import "./editServico.css";

function EditServico() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServico() {
      try {
        const docRef = doc(db, "servicos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setNome(data.nome);
          setValor(data.valor);
          setDuracao(data.duracao);
        } else {
          toast.error("Serviço não encontrado.");
          navigate("/viewServico");
        }
      } catch (error) {
        toast.error("Erro ao carregar serviço.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadServico();
  }, [id, navigate]);

  async function handleUpdate(e) {
    e.preventDefault();

    if (nome !== "" && valor > 0 && duracao > 0) {
      try {
        const docRef = doc(db, "servicos", id);
        await updateDoc(docRef, {
          nome,
          valor,
          duracao,
        });

        toast.success("Serviço atualizado com sucesso!");
        navigate("/viewServico");
      } catch (error) {
        toast.error("Erro ao atualizar serviço.");
        console.log(error);
      }
    } else {
      toast.warn("Preencha todos os campos corretamente!");
    }
  }

  return (
    <>
      <Header />
      <ToastContainer autoClose={5000} position="top-right" />
      
      <div className="cadM">
        {loading ? (
          <h2>Carregando...</h2>
        ) : (
          <>
            <h1>Editar Serviço</h1>
            <form className="form" onSubmit={handleUpdate}>
              <label>Nome:</label>
              <input
                type="text"
                value={nome}
                placeholder="Digite o nome"
                onChange={(e) => setNome(e.target.value)}
              />

              <label>Valor:</label>
              <input
                type="number"
                value={valor}
                placeholder="Digite o valor"
                onChange={(e) => setValor(Number(e.target.value))}
              />

              <label>Duração:</label>
              <input
                type="number"
                value={duracao}
                placeholder="Digite a duração (em minutos)"
                onChange={(e) => setDuracao(Number(e.target.value))}
              />

              <button type="submit">Salvar Alterações</button>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default EditServico;
