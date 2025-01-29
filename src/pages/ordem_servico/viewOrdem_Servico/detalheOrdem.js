import { useEffect, useState } from "react";
import Header from "../../../header";
import { useParams } from "react-router-dom"; // Para capturar o ID da OS da URL
import { doc, getDoc, updateDoc } from "firebase/firestore";
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
    const [servicosAdicionados, setServicosAdicionados] = useState([]);

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

        loadOS();
    }, [id]);

    async function handleSave() {
        try {
            const osRef = doc(db, "ordens_servico", id);
            await updateDoc(osRef, {
                nome: nome,
                mecanico: mecanico,
                status: status,
                servicos: servicosAdicionados,
            });

            toast.success("Ordem de Serviço atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar OS:", error);
            toast.error("Erro ao atualizar a Ordem de Serviço.");
        }
    }

    function removeServico(id) {
        const novaLista = servicosAdicionados.filter((servico) => servico.id !== id);
        setServicosAdicionados(novaLista);
        toast.info("Serviço removido!");
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
                        <input
                            type="text"
                            value={mecanico}
                            onChange={(e) => setMecanico(e.target.value)}
                        />

                        <label>Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>

                        <button type="button" className="btn-save" onClick={handleSave}>
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
