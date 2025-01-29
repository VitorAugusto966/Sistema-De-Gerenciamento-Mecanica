import Table from 'react-bootstrap/Table';
import { onSnapshot, collection, query, deleteDoc,doc } from 'firebase/firestore';
import { db } from '../../../firebaseConnection';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './viewServico.css';
import Header from '../../../header';


function ViewServico() {

    const [servicos, setServicos] = useState([]);

    async function deleteServico(id){
        const docRef = doc(db, "servicos", id);
        await deleteDoc(docRef).then(()=>{
            toast.success("Serviço excluido com sucesso");
        })

      
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
                        duracao: item.data().duracao
                    })


                })

                setServicos(lista);
                console.log(lista)

            })
        }

        loadServico();
       

    }, [])


    return (
        <>
        <Header/>
        <ToastContainer
                autoClose={5000}
                position="top-right"
            />

        <div className="viewM">
            <h1 id="titulo">Lista dos Serviços</h1>

            <Table striped bordered hover className='table'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Duração</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {servicos.map((item) => {
                        return(
                        <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>R$ {item.valor}</td>
                            <td>{item.duracao}</td>
                            <td><button id="btn-excluir" onClick={()=> deleteServico(item.id)}>Excluir</button></td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>

        </div>
        </>
    )
}

export default ViewServico;