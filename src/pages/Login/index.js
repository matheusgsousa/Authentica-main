import React, { useState, useEffect } from 'react';
import { MdEmail, MdLock } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import '../../pages/Login/login.css';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/authContext";
import { AiFillGoogleCircle } from "react-icons/fc"
import { BsKey } from "react-icons/bs";
import { Alert } from "react-bootstrap";






function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser, loading] = useState({});
    const { logIn, googleSignIn } = useUserAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/Senha");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/Senha");
        } catch (error) {
            console.log(error.message);
        }
    };
    const botaog = {
        marginTop: 20
    }






    const [show, setShow] = useState(false)
    let navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault()
        setShow(!show);
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit} >

                <div className="login-right">
                    <h1><BsKey /></h1>
                    {error && <Alert variant="danger">{error}</Alert>}


                    <div className="login-loginInputEmail">
                        <MdEmail />
                        <input
                            type="email"
                            placeholder="Digite um email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="login-loginInputPassword">
                        <MdLock />
                        <input
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


                    <button type="submit" style={botaog} >
                        Entrar
                    </button>
                    <button type="submit" onClick={handleGoogleSignIn} >
                        <FcGoogle />
                    </button>

                    <button type="submit" onClick={() => {
                        navigate("/Celular");
                    }}>
                        Entrar com celular
                    </button>



                    <h4>Não possui conta?</h4>

                    <button type="submit" onClick={() => {
                        navigate("/Cadastro");
                    }}>
                        Cadastrar
                    </button>

                </div>
            </form>
        </div>
    )


}

export default LoginPage;