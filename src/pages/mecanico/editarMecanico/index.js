import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConnection";
import Header from "../../../header.js";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './editMecanico.css';

function EditMecanico() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [salario, setSalario] = useState(0);
  const [dataC, setDataC] = useState("");

  useEffect(() => {
    async function loadMecanico() {
      const docRef = doc(db, "mecanicos", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNome(data.nome);
        setSalario(data.salario);
        setDataC(data.dataContratacao);
      } else {
        toast.error("Mecânico não encontrado");
        navigate("/viewMecanico");
      }
    }
    loadMecanico();
  }, [id, navigate]);

  async function handleEdit(e) {
    e.preventDefault();

    if (nome !== "" && salario > 0) {
      const docRef = doc(db, "mecanicos", id);
      await updateDoc(docRef, {
        nome: nome,
        salario: salario,
        dataContratacao: dataC,
      })
        .then(() => {
          toast.success("Mecânico atualizado com sucesso");
          navigate("/viewMecanico");
        })
        .catch(() => {
          toast.error("Erro ao atualizar mecânico");
        });
    } else {
      toast.warn("Preencha todos os campos corretamente");
    }
  }

  return (
    <>
      <Header />
      <ToastContainer autoClose={5000} position="top-right" />
      <div className="editM">
        <h1>Editar Mecânico</h1>
        <form className="form" onSubmit={handleEdit}>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          <label>Salário:</label>
          <input type="number" value={salario} onChange={(e) => setSalario(e.target.value)} />
          <label>Data de Contratação:</label>
          <input type="date" value={dataC} onChange={(e) => setDataC(e.target.value)} />
          <button type="submit">Salvar Alterações</button>
        </form>
      </div>
    </>
  );
}

export default EditMecanico;
