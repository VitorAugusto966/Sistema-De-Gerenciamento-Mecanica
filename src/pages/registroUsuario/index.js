import { useState } from "react";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {auth} from '../../firebaseConnection';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import './index.css'



export default function Registro() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        if (email === "" && pass === "") {
            toast.warn("Preencha todos os campos");
        }
        else{
            await createUserWithEmailAndPassword(auth,email,pass)
            .then(()=>{
                toast.success("Usuário criado com sucesso!");
            })
            .catch((error)=>{
                toast.error("Erro ao criar usuário!");
            })
        }

    }

 
    return (
        <div className="home">
            <ToastContainer
                autoClose={5000}
                position="top-right"
            />
            <h1>Mecânica Inazuma</h1>

            <form className="form" onSubmit={handleRegister}>
                <input type="email" placeholder="Digite o e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <input type="password" placeholder="********"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)} />

                <button type="submit">Cadastrar</button>
            </form>
            <Link className="button-link" to="/">
                Já possui uma conta? Faça Login!
            </Link>
        </div>
    )
}