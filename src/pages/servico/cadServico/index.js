import { useState } from "react";
import Header from "../../../header";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, } from 'firebase/firestore';
import { db } from '../../../firebaseConnection';
import './cadS.css';

function CadServico(){

    const [nome, setNome] = useState('');
    const [valor, setValor] = useState(0);
    const [duracao, setDuracao] = useState(0);

   async function handleCad(e){
        e.preventDefault();

        if(nome !== '' && valor > 0 && duracao >0){

            await addDoc(collection(db, "servicos"), {
                nome: nome,
                valor: valor,
                duracao: duracao,
                created: new Date()
        
            })
            .then(()=>{
                toast.success("Serviço cadastrado com sucesso");
                setNome('');
                setValor(0);
                setDuracao(0);
            })
            .catch((error)=>{
                toast.error("Erro ao cadastrar");
                console.log(error);
            })
        }

        else{
            toast.warn("Preencha todos os campos!");
        }

    }

    return(
        <>
        <Header/>
        <ToastContainer
        autoClose={5000}
        position="top-right"
      />
      
      <div className="cadM">
        <h1>Cadastro de Serviço</h1>

        <form className="form" onSubmit={handleCad}>
          <label>Nome:</label>
          <input type="text" value={nome}
            placeholder="Digite o nome"
            onChange={(e) => setNome(e.target.value)} />

          <label>Valor:</label>
          <input type="number" value={valor}
            placeholder="Digite o valor"
            onChange={(e) => setValor(e.target.value)} />

          <label>Duração:</label>
          <input type="number" value={duracao}
            onChange={(e) => setDuracao(e.target.value)} />


          <button type="submit">Cadastrar</button>
        </form>

        </div>
        </>
    );

}

export default CadServico;