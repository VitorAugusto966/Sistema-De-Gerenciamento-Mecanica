import {Routes, Route}from 'react-router-dom';
import Home from '../pages/home';
import Registro from '../pages/registroUsuario'
import Private from './Private';
import Admin from '../pages/admin';
import CadMecanico from '../pages/mecanico/cadastroMecanico';
import ViewMecanico from '../pages/mecanico/viewMecanico';
import Error from './Error';
import CadServico from '../pages/servico/cadServico';
import ViewServico from '../pages/servico/viewServico';
import CadOS from '../pages/ordem_servico/cadOrdem_Servico'
import ViewOS from '../pages/ordem_servico/viewOrdem_Servico'
import DetalheOS from '../pages/ordem_servico/viewOrdem_Servico/detalheOrdem';
import Financeiro from '../pages/dashboard/financeiro'
import EditMecanico from '../pages/mecanico/editarMecanico';
import EditServico from '../pages/servico/editServico';

function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Registro/>}/>
            <Route path="/admin" element={<Private><Admin/></Private>}/>
            <Route path="/cadMecanico" element={<Private><CadMecanico/></Private>}/>
            <Route path="/editMecanico/:id" element={<Private><EditMecanico/></Private>}/>
            <Route path="/viewMecanico" element={<Private><ViewMecanico/></Private>}/>
            <Route path="/cadServico" element={<Private><CadServico/></Private>}/>
            <Route path="/viewServico" element={<Private><ViewServico/></Private>}/>
            <Route path="/editServico/:id" element={<Private><EditServico/></Private>}/>
            <Route path="/cadOS" element={<Private><CadOS/></Private>}/>
            <Route path="/viewOS" element={<Private><ViewOS/></Private>}/>
            <Route path="/financeiro" element={<Private><Financeiro/></Private>}/>
            <Route path="/detalheOS/:id" element={<Private><DetalheOS/></Private>}/>
            <Route path="*" element={<Private><Error/></Private>}/>

        </Routes>
    )
}

export default RoutesApp;