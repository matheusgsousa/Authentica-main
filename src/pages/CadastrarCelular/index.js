import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../contexts/authContext";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "../Login/login.css"

const CadastrarCelular = () => {
    const [error, setError] = useState("");
    const { CadastrarCelular } = useUserAuth();
    const [number, setNumber] = useState("");
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const [result, setResult] = useState("");
    const { setUpRecaptha } = useUserAuth();
    let navigate = useNavigate();


    const getOtp = async (e) => {
        e.preventDefault();
        console.log(number);
        setError("");
        if (number === "" || number === undefined)
            return setError("Please enter a valid phone number!");
        try {
            const response = await setUpRecaptha(number);
            setResult(response);
            setFlag(true);
        } catch (err) {
            setError(err.message);
        }
    };
    const verifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (otp === "" || otp === null) return;
        try {
            await result.confirm(otp);
            navigate("/Senha");
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <>
            <div className="login">
                <form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }} >

                    <div className="login-right">
                        <h1>Criar conta</h1>

                        <div className="login-loginInputEmail" id="flag">
                            <PhoneInput
                                defaultCountry="BR"
                                value={number}
                                onChange={setNumber}
                                placeholder="(DDD)"
                            />

                        </div>
                        <div id="recaptcha-container"></div>





                        <button type="submit">
                            Enviar Código
                        </button>
                        <button type="submit" onClick={() => {
                            navigate("/Login");
                        }}>
                            Cancelar
                        </button>
                    </div>
                </form>
                <form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }} >

                    <div className="login-right">
                        <h1>Criar conta</h1>

                        <div className="login-loginInputEmail">
                            <input
                                type="otp"
                                placeholder="Enter OTP"
                                onChange={(e) => setOtp(e.target.value)}
                            />

                        </div>

                        <button type="submit">
                            Verificar
                        </button>
                        <button type="submit" onClick={() => {
                            navigate("/Login");
                        }}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CadastrarCelular;