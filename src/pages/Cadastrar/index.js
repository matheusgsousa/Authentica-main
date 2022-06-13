import { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { useNavigate, useOutlet } from "react-router-dom";
import { useUserAuth } from "../../contexts/authContext";
import "react-phone-number-input/style.css";
import { Alert } from "react-bootstrap";
import '../../pages/Cadastrar/cadastrar.css'


function Cadastrar() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUserAuth();
    let navigate = useNavigate();
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false)





    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate("/Senha");
        } catch (err) {
            setError(err.message);

        }

    };

    const handleClick = (e) => {
        e.preventDefault()
        setShow(!show);
    }

    const botaog = {
        marginTop: 20
    }



    return (
        <div className="login">
            <form onSubmit={handleSubmit} >

                <div className="login-right">
                    <h1>Criar conta</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="login-loginInputEmail">
                        <MdEmail />
                        <input
                            required
                            type="email"
                            placeholder="Digite um email"
                            onChange={(e) => setEmail(e.target.value)}


                        />
                    </div>

                    <div className="login-loginInputPassword">
                        <MdLock />
                        <input
                            required
                            placeholder="Digite sua senha"
                            type={show ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}

                        />

                        <div className="login-eye">
                            {show ? (
                                <HiEye
                                    size={20}
                                    onClick={handleClick}
                                />
                            ) : (
                                <HiEyeOff
                                    size={20}
                                    onClick={handleClick}
                                />
                            )}
                        </div>
                    </div>



                    <button type="submit" onSubmit={handleSubmit} style={botaog}>
                        Cadastrar
                    </button>
                    <button type="submit" onClick={() => {
                        navigate("/Login");
                    }}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );


}

export default Cadastrar;