import React, { useRef, useState } from "react";
import "./generat.css"

// Utility functions
import { generatePassword } from "./generatorutil";

export default function Generat() {
    const numberRef = useRef();
    const symbolsRef = useRef();
    const lengthRef = useRef();

    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let newPassword = generatePassword(
            numberRef.current.checked,
            symbolsRef.current.checked,
            lengthRef.current.value || 6
        );

        setPassword(newPassword);
    };

    return (
        <form className="formBase" onSubmit={handleSubmit}>

            <div className="form-right">
                <h1>Gerar uma senha forte</h1>
                <h4 >{password}</h4>
                <div className="form-formInputEmail">
                    <input
                        type="number"
                        placeholder="Número de caracteres"
                        max={72}
                        min={6}
                        name="password-length"

                        ref={lengthRef}
                    />
                </div>
                <div className="form-formInputPassword">
                    <label htmlFor="numbers">Incluir números?</label>
                    <input type="checkbox" name="numbers" ref={numberRef} />
                </div>
                <div className="form-formInputPassword">
                    <label htmlFor="symbols">Incluir símbolos?</label>
                    <input type="checkbox" name="symbols" ref={symbolsRef} />
                </div>
                <button className="btn">Gerar</button>
            </div>
        </form>
    );
}