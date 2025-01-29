import { useState, useEffect } from "react";
import Header from "../../../header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection, onSnapshot, query,orderBy,limit,getDocs} from "firebase/firestore";
import { db } from "../../../firebaseConnection";
import "./cadOrdem.css";

function CadOS() {
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState(0);
    const [duracao, setDuracao] = useState(0);
    const [mecanicos, setMecanicos] = useState([]);
    const [mecanico, setMecanico] = useState("");
    const [servicosDisponiveis, setServicosDisponiveis] = useState([]);
    const [servicosAdicionados, setServicosAdicionados] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState("");
        
    async function handleCad(e) {
        e.preventDefault();
    
        if (nome !== "" && valor > 0 && duracao > 0 && servicosAdicionados.length > 0) {
            try {
                const ordensServicosRef = collection(db, "ordens_servico");
                const q = query(ordensServicosRef, orderBy("counter", "desc"), limit(1));
                const querySnapshot = await getDocs(q);
    
                let newOrderId = 1; 
    
                if (!querySnapshot.empty) {
                    const lastOrder = querySnapshot.docs[0];
                    newOrderId = lastOrder.data().counter + 1; 
                }
    
                await addDoc(ordensServicosRef, {
                    counter: newOrderId,
                    nome: nome,
                    valor: valor,
                    duracao: duracao,
                    mecanico: mecanico,
                    servicos: servicosAdicionados,
                    created: new Date(),
                    status: "Em andamento"
                });
    
                toast.success("Ordem de Serviço cadastrada com sucesso");
                setNome("");
                setValor(0);
                setDuracao(0);
                setMecanico("");
                setServicoSelecionado("");
                setServicosAdicionados([]);
            } catch (error) {
                toast.error("Erro ao cadastrar OS");
                console.error("Erro ao cadastrar OS:", error);
            }
        } else {
            toast.warn("Preencha todos os campos!");
        }
    }
   

    function addServico() {
        if (servicoSelecionado !== "") {
            const servico = servicosDisponiveis.find(
                (s) => s.id === servicoSelecionado
            );


            if (!servicosAdicionados.some((s) => s.id === servico.id)) {
                setServicosAdicionados((prev) => [...prev, servico]);
                const vp = parseFloat(servico.valor) + valor;
                const du = parseInt(servico.duracao) + duracao;
                setValor(vp);
                setDuracao(du);

            } else {
                toast.warn("Serviço já adicionado!");
            }
        }
    }

    function removeServico(id) {
        const servicoRemovido = servicosAdicionados.find((s) => s.id === id);
        const novaLista = servicosAdicionados.filter((s) => s.id !== id);

        if (servicoRemovido) {
            setValor(valor - parseFloat(servicoRemovido.valor));
            toast.info("Serviço removido!");
        }
        
        setServicosAdicionados(novaLista);
    }


    useEffect(() => {
        async function loadDados() {
            const mecanicoRef = collection(db, "mecanicos");
            const qMecanicos = query(mecanicoRef);
            onSnapshot(qMecanicos, (snapshot) => {
                let lista = [];
                snapshot.forEach((item) => {
                    lista.push({
                        id: item.id,
                        nome: item.data().nome,
                    });
                });
                setMecanicos(lista);
            });

            const servicoRef = collection(db, "servicos");
            const qServicos = query(servicoRef);
            onSnapshot(qServicos, (snapshot) => {
                let lista = [];
                snapshot.forEach((item) => {
                    lista.push({
                        id: item.id,
                        nome: item.data().nome,
                        valor: item.data().valor,
                        duracao: item.data().duracao,
                    });
                });
                setServicosDisponiveis(lista);
            });
        }

        loadDados();
    }, []);

    return (
        <>
            <Header />
            <ToastContainer autoClose={5000} position="top-right" />
            <div id="cadOS-container">
                <div id="cadOS">
                    <h1>Ordem de Serviço</h1>
                    <form id="form" onSubmit={handleCad}>
                        <label>Nome do cliente:</label>
                        <input
                            type="text"
                            value={nome}
                            placeholder="Digite o nome do cliente"
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <label>Valor:</label>
                        <input type="number" value={valor} disabled />
                        <label>Duração:</label>
                        <input
                            type="number"
                            value={duracao}
                            disabled 
                        />
                        <label>Mecânico:</label>
                        <select value={mecanico} onChange={(e) => setMecanico(e.target.value)}>
                            <option value="">Selecione um mecânico</option>
                            {mecanicos.map((mec) => (
                                <option key={mec.id} value={mec.nome}>
                                    {mec.nome}
                                </option>
                            ))}
                        </select>
                        <label>Selecione um serviço:</label>
                        <select
                            value={servicoSelecionado}
                            onChange={(e) => setServicoSelecionado(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            {servicosDisponiveis.map((servico) => (
                                <option key={servico.id} value={servico.id}>
                                    {servico.nome}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={addServico}>
                            Adicionar Serviço
                        </button>

                        <br/>
                        <button id="cadastrar" type="submit">Cadastrar OS</button>
                    </form>
                </div>

                <div id="cadOS">
                    <h1>Serviços Adicionados</h1>
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                                <th>Duração</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicosAdicionados.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center" }}>
                                        Nenhum serviço adicionado.
                                    </td>
                                </tr>
                            ) : (
                                servicosAdicionados.map((servico) => (
                                    <tr key={servico.id}>
                                        <td>{servico.nome}</td>
                                        <td>R$ {servico.valor}</td>
                                        <td>{servico.duracao}h</td>
                                        <td>
                                            <button
                                                className="btn-remove"
                                                onClick={() => removeServico(servico.id)}
                                            >
                                                Remover
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default CadOS;
