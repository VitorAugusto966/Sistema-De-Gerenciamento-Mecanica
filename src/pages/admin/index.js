import './admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../header';

function Admin() {

  return (
    <>
      <Header />
      <div className="admin" style={{background:"black"}}>
        <div className="logo-container">
          <img title="Inazuma Japan Logo" src={require('../../assets/logo3.png')} alt="Logo da Empresa" className="company-logo" />
          <h2>Bem Vindo ao Sistema</h2>
        </div>
      </div>
    </>
  );
}

export default Admin;
