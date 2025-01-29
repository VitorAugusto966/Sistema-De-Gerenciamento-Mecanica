import './viewOrdem.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../../header';
import MaterialCard from "./cards"; 
import FilterBar from './filterBar'; 
import { onSnapshot, collection, query, orderBy,doc, updateDoc} from 'firebase/firestore';
import { db } from '../../../firebaseConnection';
import { useEffect, useState } from 'react';

function ViewOS() {
  const [ordensServico, setOrdensServico] = useState([]);
  const [filteredOS, setFilteredOS] = useState([]);

  const handleFinalizarOS = async (id) => {
    try {
      const osDoc = doc(db, "ordens_servico", id);
      await updateDoc(osDoc, { status: "Finalizado" });
  
      setOrdensServico((prev) =>
        prev.map((os) => (os.id === id ? { ...os, status: "Finalizado" } : os))
      );
      setFilteredOS((prev) =>
        prev.map((os) => (os.id === id ? { ...os, status: "Finalizado" } : os))
      );
    } catch (error) {
      console.error("Erro ao finalizar a OS:", error);
    }
  };

  useEffect(() => {
    async function loadOrdensServico() {
      const osRef = collection(db, "ordens_servico");
      const q = query(osRef, orderBy("counter", "asc"));

      onSnapshot(q, (snapshot) => {
        let lista = [];

        snapshot.forEach((item) => {
          lista.push({
            id: item.id,
            counter: item.data().counter,
            nome: item.data().nome,
            mecanico: item.data().mecanico,
            valor: item.data().valor,
            duracao: item.data().duracao,
            servicos: item.data().servicos,
            created: item.data().created?.toDate(),
            status: item.data().status
          });
        });

        setOrdensServico(lista);
        setFilteredOS(lista); 
      });
    }

    loadOrdensServico();
  }, []);

  const handleFilterChange = (filter) => {
    if (filter === "Todos") {
      setFilteredOS(ordensServico);
    } else {
      setFilteredOS(ordensServico.filter((os) => os.status === filter));
    }
  };

  return (
    <>
      <Header />
      <FilterBar onFilterChange={handleFilterChange} />
      <div className='viewOS' style={{
        minHeight:"90vh"
      }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            padding: "20px",
          }}
        >
          {filteredOS.map((order) => (
           <MaterialCard
           counter={order.counter}
           id={order.id}
           mecanico={order.mecanico}
           valor={order.valor}
           nome={order.nome}
           duracao={order.duracao}
           servicos={order.servicos}
           created={order.created?.toLocaleDateString()}
           status={order.status}
           onFinalizar={handleFinalizarOS}
           
         />         
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewOS;
