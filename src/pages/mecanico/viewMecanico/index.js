import Table from 'react-bootstrap/Table';
import { onSnapshot, collection, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConnection';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './viewMecanico.css';
import Header from '../../../header';

function ViewMecanico() {
    const [mecanicos, setMecanicos] = useState([]);
    const navigate = useNavigate();

    async function deleteMecanico(id) {
        const docRef = doc(db, "mecanicos", id);
        await deleteDoc(docRef).then(() => {
            toast.success("Mecânico excluído com sucesso");
        });
    }

    useEffect(() => {
        async function loadMecanico() {
            const mecanicoRef = collection(db, "mecanicos");
            const q = query(mecanicoRef);
            onSnapshot(q, (snapshot) => {
                let lista = [];
                snapshot.forEach((item) => {
                    lista.push({
                        id: item.id,
                        nome: item.data().nome,
                        dataContratacao: item.data().dataContratacao,
                        salario: item.data().salario
                    });
                });
                setMecanicos(lista);
            });
        }

        loadMecanico();
    }, []);

    return (
        <>
            <Header />
            <ToastContainer autoClose={5000} position="top-right" />

            <div className="viewM">
                <h1>Lista dos Mecânicos</h1>

                <Table striped bordered hover className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Salário</th>
                            <th>Data da Contratação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mecanicos.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.nome}</td>
                                    <td>R${item.salario}</td>
                                    <td>{new Date(item.dataContratacao).toLocaleDateString('pt-br')}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => navigate(`/editMecanico/${item.id}`)}>Editar</button>
                                        <button className="delete-btn" onClick={() => deleteMecanico(item.id)}>Excluir</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ViewMecanico;
