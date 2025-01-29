import { useState } from "react";
import './cadMecanico.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addDoc, collection, } from 'firebase/firestore';
import { db } from '../../../firebaseConnection';
import Header from '../../../header.js';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CadMecanico() {

  const [nome, setNome] = useState("");
  const [salario, setSalario] = useState(0);
  const [dataC, setDataC] = useState();

  async function handleCad(e) {
    e.preventDefault();

    if (nome !== "" && salario > 0) {

      await addDoc(collection(db, "mecanicos"), {
        nome: nome,
        salario: salario,
        dataContratacao: dataC,
        created: new Date()

      })
        .then(() => {
          toast.success("Mecânico cadastrado com sucesso");
          setNome('');
          setSalario(0);
          setDataC('');
        })
        .catch((error) => {
          toast.error("Erro ao cadastrar mecânico");
        })

    }
    else {
      toast.warn("Preencha todos os campos");
    }
  }



  return (
    <>
      <Header />
      <ToastContainer
        autoClose={5000}
        position="top-right"
      />
      <div className="cadM">
        <h1>Cadastro de Mecânico</h1>

        <form className="form" onSubmit={handleCad}>
          <label>Nome:</label>
          <input type="text" value={nome}
            placeholder="Digite o nome"
            onChange={(e) => setNome(e.target.value)} />

          <label>Salario:</label>
          <input type="number" value={salario}
            placeholder="Digite o salário"
            onChange={(e) => setSalario(e.target.value)} />

          <label>Data de Contratação:</label>
          <input type="date" value={dataC}
            onChange={(e) => setDataC(e.target.value)} />


          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>

  );
}

export default CadMecanico;