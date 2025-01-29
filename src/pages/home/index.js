import { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebaseConnection";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Home() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        if (email === "" || pass === "") {
            toast.warn("Preencha todos os campos");
            return;
        }

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            toast.success("Login válido");
            navigate("/admin", { replace: true });
        } catch (error) {
            toast.error("Login inválido!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="home">
            <ToastContainer autoClose={5000} position="top-right" />
            <h1>Mecânica Inazuma</h1>

            <form className="form" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Digite o e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="********"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />

                <button type="submit" id="btn-login" disabled={loading}>
                    {loading ? "Carregando..." : "Acessar"}
                </button>
            </form>
            <Link className="button-link" to="/register">
                Não possui uma conta? Cadastre-se!
            </Link>
        </div>
    );
}
