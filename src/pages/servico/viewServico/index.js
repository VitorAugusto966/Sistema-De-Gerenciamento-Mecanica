import Table from "react-bootstrap/Table";
import { onSnapshot, collection, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseConnection";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./viewServico.css";
import Header from "../../../header";

function ViewServico() {
  const [servicos, setServicos] = useState([]);
  const navigate = useNavigate();

  async function deleteServico(id) {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        const docRef = doc(db, "servicos", id);
        await deleteDoc(docRef);
        toast.success("Serviço excluído com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir serviço.");
        console.error(error);
      }
    }
  }

  useEffect(() => {
    async function loadServico() {
      const servicoRef = collection(db, "servicos");
      const q = query(servicoRef);
      onSnapshot(q, (snapshot) => {
        let lista = [];
        snapshot.forEach((item) => {
          lista.push({
            id: item.id,
            nome: item.data().nome,
            valor: item.data().valor,
            duracao: item.data().duracao,
          });
        });

        setServicos(lista);
      });
    }

    loadServico();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer autoClose={5000} position="top-right" />

      <div className="viewM">
        <h1 id="titulo">Lista de Serviços</h1>

        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>Duração</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>R$ {item.valor}</td>
                <td>{item.duracao} min</td>
                <td className="action-buttons">
                  <button className="btn-edit" onClick={() => navigate(`/editServico/${item.id}`)}>
                    Editar
                  </button>
                  <button className="btn-delete" onClick={() => deleteServico(item.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ViewServico;
