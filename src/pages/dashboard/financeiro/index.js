import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConnection";
import Chart from "react-apexcharts";
import Header from "../../../header";
import "./financeiro.css";

function DashboardFinanceiro() {
    const [faturamentoMensal, setFaturamentoMensal] = useState([]);
    const [servicosMaisLucrativos, setServicosMaisLucrativos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const ordensRef = collection(db, "ordens_servico");
            const snapshot = await getDocs(ordensRef);

            let faturamentoPorMes = {};
            let servicosTotais = {};
            let salariosPorMes = {};

            snapshot.forEach((doc) => {
                const data = doc.data();
                const mes = new Date(data.created.seconds * 1000).toLocaleString("pt-BR", { month: "short" });

                const valor = parseFloat(data.valor) || 0;
                faturamentoPorMes[mes] = (faturamentoPorMes[mes] || 0) + valor;

                if (data.mecanicos) {
                    data.mecanicos.forEach((mecanico) => {
                        const salario = parseFloat(mecanico.salario) || 0;
                        salariosPorMes[mes] = (salariosPorMes[mes] || 0) + salario;
                    });
                }

                if (data.servicos) {
                    data.servicos.forEach((servico) => {
                        const servicoValor = parseFloat(servico.valor) || 0;
                        servicosTotais[servico.nome] = (servicosTotais[servico.nome] || 0) + servicoValor;
                    });
                }
            });

            Object.keys(faturamentoPorMes).forEach((mes) => {
                faturamentoPorMes[mes] -= (salariosPorMes[mes] || 0);
            });
            const mesesOrdenados = Object.entries(faturamentoPorMes).sort(
                (a, b) => new Date(`01 ${a[0]} 2000`) - new Date(`01 ${b[0]} 2000`)
            );
            setFaturamentoMensal(mesesOrdenados.map(([mes, valor]) => ({ mes, valor })));
            const servicosOrdenados = Object.entries(servicosTotais).sort((a, b) => b[1] - a[1]);
            setServicosMaisLucrativos(servicosOrdenados.map(([servico, valor]) => ({ servico, valor })));
        }

        fetchData();
    }, []);


    return (
        <>
            <Header />
            <div className="finan">
                <h2>Dashboard Financeiro</h2>

                <div className="grafico-container">
                    <div className="grafico">
                        <h3>Faturamento Mensal</h3>
                        <Chart
                            type="bar"
                            series={[{ name: "Faturamento", data: faturamentoMensal.map((item) => item.valor) }]}
                            options={{
                                chart: { id: "faturamento-mensal", animations: { easing: "easeout", speed: 800 } },
                                xaxis: { categories: faturamentoMensal.map((item) => item.mes), labels: { style: { colors: "#fff" } } },
                                colors: ["#1E90FF"],
                                plotOptions: {
                                    bar: { horizontal: false, borderRadius: 8, distributed: true }
                                },
                                grid: { borderColor: "#555" },
                                tooltip: { theme: "dark" }
                            }}
                            height={300}
                        />
                    </div>

                    <div className="grafico">
                        <h3>Serviços Mais Lucrativos</h3>
                        <Chart
                            type="bar"
                            series={[{ name: "Receita", data: servicosMaisLucrativos.map((item) => item.valor) }]}
                            options={{
                                chart: { id: "servicos-lucrativos", animations: { easing: "easeout", speed: 800 } },
                                xaxis: { categories: servicosMaisLucrativos.map((item) => item.servico), labels: { style: { colors: "#fff" } } },
                                colors: ["#48ff00"],
                                plotOptions: {
                                    bar: { horizontal: false, borderRadius: 8, distributed: true }
                                },
                                grid: { borderColor: "#555" },
                                tooltip: { theme: "dark" }
                            }}
                            height={300}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardFinanceiro;
