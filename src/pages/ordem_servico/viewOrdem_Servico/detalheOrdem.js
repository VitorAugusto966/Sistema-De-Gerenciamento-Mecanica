import { useEffect, useState } from "react";
import Header from "../../../header";
import { useParams } from "react-router-dom"; 
import { doc, getDoc, updateDoc,getDocs,collection } from "firebase/firestore";
import { db } from "../../../firebaseConnection";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./detalheOs.css";


function DetalheOS() {
    const { id } = useParams();
    const [os, setOs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nome, setNome] = useState("");
    const [mecanico, setMecanico] = useState("");
    const [status, setStatus] = useState("");
    const [valor, setValor] = useState(0);
    const [duracao, setDuracao] = useState(0);
    const [servicosAdicionados, setServicosAdicionados] = useState([]);
    const [mecanicos, setMecanicos] = useState([]);
    const [servicosDisponiveis, setServicosDisponiveis] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState("");
    useEffect(() => {
        async function loadOS() {
            try {
                const osRef = doc(db, "ordens_servico", id);
                const osSnap = await getDoc(osRef);

                if (osSnap.exists()) {
                    const data = osSnap.data();
                    setOs(data);
                    setNome(data.nome);
                    setMecanico(data.mecanico);
                    setStatus(data.status);
                    setValor(data.valor);
                    setDuracao(data.duracao);
                    setServicosAdicionados(data.servicos || []);
                } else {
                    toast.error("Ordem de Serviço não encontrada.");
                }
            } catch (error) {
                console.error("Erro ao carregar OS:", error);
                toast.error("Erro ao carregar OS.");
            } finally {
                setLoading(false);
            }
        }

        async function loadMecanicos() {
            const querySnapshot = await getDocs(collection(db, "mecanicos"));
            setMecanicos(querySnapshot.docs.map(doc => ({ id: doc.id, nome: doc.data().nome })));
        }

        async function loadServicos() {
            const querySnapshot = await getDocs(collection(db, "servicos"));
            setServicosDisponiveis(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }

        loadOS();
        loadMecanicos();
        loadServicos();
    }, [id]);

    async function handleSave() {
        try {
            const osRef = doc(db, "ordens_servico", id);
            await updateDoc(osRef, {
                nome,
                mecanico,
                status,
                servicos: servicosAdicionados,
                valor,
                duracao
            });

            toast.success("Ordem de Serviço atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar OS:", error);
            toast.error("Erro ao atualizar a Ordem de Serviço.");
        }
    }

    function removeServico(servicoId) {
        const servicoRemovido = servicosAdicionados.find((s) => s.id === servicoId);
        const novaLista = servicosAdicionados.filter((s) => s.id !== servicoId);

        if (servicoRemovido) {
            setValor(valor - parseFloat(servicoRemovido.valor));
            setDuracao(duracao - parseInt(servicoRemovido.duracao));
            toast.info("Serviço removido!");
        }

        setServicosAdicionados(novaLista);
    }

    function addServico() {
        if (servicoSelecionado !== "") {
            const servico = servicosDisponiveis.find((s) => s.id === servicoSelecionado);

            if (servico && !servicosAdicionados.some((s) => s.id === servico.id)) {
                setServicosAdicionados((prev) => [...prev, servico]);
                setValor(valor + parseFloat(servico.valor));
                setDuracao(duracao + parseInt(servico.duracao));
                setServicoSelecionado("");
                toast.success("Serviço adicionado!");
            } else {
                toast.warn("Serviço já adicionado!");
            }
        }
    }

    if (loading) {
        return <div className="loading">Carregando detalhes da OS...</div>;
    }

    if (!os) {
        return <div className="error">Ordem de Serviço não encontrada.</div>;
    }

    return (
        <>
            <Header />
            <ToastContainer autoClose={5000} position="top-right" />
            <div id="cadOS-container">
                <div id="cadOS">
                    <h1>Detalhes da Ordem de Serviço</h1>
                    <form id="form" onSubmit={(e) => e.preventDefault()}>
                        <label>Nome do cliente:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <label>Valor Total:</label>
                        <input type="number" value={os.valor.toFixed(2)} disabled />

                        <label>Duração Total:</label>
                        <input type="number" value={os.duracao} disabled />

                        <label>Mecânico:</label>
                        <select value={mecanico} onChange={(e) => setMecanico(e.target.value)}>
                            <option value="">Selecione um mecânico</option>
                            {mecanicos.map((mec) => (
                                <option key={mec.id} value={mec.nome}>{mec.nome}</option>
                            ))}
                        </select>

                        <label>Selecione um serviço:</label>
                        <select value={servicoSelecionado} onChange={(e) => setServicoSelecionado(e.target.value)}>
                            <option value="">Selecione</option>
                            {servicosDisponiveis.map((servico) => (
                                <option key={servico.id} value={servico.id}>{servico.nome}</option>
                            ))}
                        </select>
                        <button type="button" onClick={addServico}>Adicionar Serviço</button>
                        
                        <button style={{marginTop:"10px"}} type="button" className="btn-save" onClick={handleSave}>
                            Salvar Alterações
                        </button>
                    </form>
                </div>

                <div id="cadOS">
                    <h2>Serviços Adicionados</h2>
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
                                        Nenhum serviço registrado.
                                    </td>
                                </tr>
                            ) : (
                                servicosAdicionados.map((servico, index) => (
                                    <tr key={index}>
                                        <td>{servico.nome}</td>
                                        <td>R$ {parseFloat(servico.valor).toFixed(2)}</td>
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

export default DetalheOS;
