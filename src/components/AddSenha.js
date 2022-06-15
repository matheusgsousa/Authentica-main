import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup, Modal } from "react-bootstrap";
import SenhaDataService from "../services/senhaservice";
import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { FaUserAlt } from "react-icons/fa"
import Generat from "../components/generator"
import { TbWorld } from "react-icons/tb"



import "./add.css"


const AddSenha = ({ id, setSenhaId }) => {
    const [title, setTitle] = useState("");
    const [pass, setPass] = useState("");
    const [usuario, setUsuario] = useState("");
    const [show, setShow] = useState(false)
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (title === "" || pass === "") {
            setMessage({ error: true, msg: "Todos os campos precisam ser preenchidos" });
            return;
        }
        const newSenha = {
            title,
            pass,
            usuario

        };
        console.log(newSenha);

        try {
            if (id !== undefined && id !== "") {
                await SenhaDataService.updateSenha(id, newSenha);
                setSenhaId("");
                setMessage({ error: false, msg: "Atualizado!" });
            } else {
                await SenhaDataService.addSenhas(newSenha);
                setMessage({ error: false, msg: "Nova senha adicionada!" });
            }
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }

        setTitle("");
        setPass("");
        setUsuario("");
    };
    const handleClick = (e) => {
        e.preventDefault()
        setShow(!show);
    }

    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await SenhaDataService.getSenha(id);
            console.log("the record is :", docSnap.data());
            setTitle(docSnap.data().title);
            setPass(docSnap.data().pass);
            setUsuario(docSnap.data().usuario);
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }
    };

    useEffect(() => {
        console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
            editHandler();
        }
    }, [id]);
    return (
        <>
            <div className="add">
                <form onSubmit={handleSubmit} >

                    <div className="add-right">
                        <h1>Adicionar Senha</h1>
                        <div className="add-addInputEmail">
                            <TbWorld />
                            <input
                                type="text"
                                placeholder="Título"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="add-addInputUser">
                            <FaUserAlt />
                            <input
                                type="text"
                                placeholder="Usuário"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                        </div>
                        <div className="add-addInputPassword">
                            <MdLock />
                            <input
                                placeholder="Senha"
                                type={show ? "text" : "password"}
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                            <div className="add-eye">
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

                        <button type="submit"  >
                            Adicionar/Atualizar
                        </button>
                        <Button onClick={handleShow1} >
                            Gerador de Senha
                        </Button>


                    </div>
                </form>

            </div>

            <div className="p-4 box">
                {message?.msg && (
                    <Alert
                        variant={message?.error ? "danger" : "success"}
                        dismissible
                        onClose={() => setMessage("")}
                    >
                        {message?.msg}
                    </Alert>
                )}

            </div>
            <Modal show={show1} onHide={handleClose}>
                <Generat />


            </Modal>

        </>
    );
};

export default AddSenha;