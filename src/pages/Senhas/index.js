import React, { useState, useEffect } from "react";
import SenhaDataService from "../../services/senhaservice";
import SenhasList from "../../components/SenhaList";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../contexts/authContext";
import { Link } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi"
import { BsKey } from "react-icons/bs"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../components/add.css"
import "./senhas.css"

import { Table, Button, Navbar, Nav, Container, NavDropdown, Alert } from "react-bootstrap";

const Senhas = ({ id, setSenhaId }) => {
    const [title, setTitle] = useState("");
    const [pass, setPass] = useState("");
    const [usuario, setUsuario] = useState("");
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });
    const { logOut, user } = useUserAuth();
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };
    const styleIcon = {
        height: 60,
        width: 60,
        margin: 10,
        color: "#e1e1e6"

    }
    const styleIcon2 = {
        height: 35,
        width: 40,
        color: "#e1e1e6"

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (title === "" || pass === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            return;
        }
        const newSenha = {
            title,
            pass,
            usuario,
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

            <Navbar collapseOnSelect expand="lg" variant="dark" id="bootstrap-overrides">
                <Container>
                    <Navbar.Brand href="/Senha"  ><BsKey style={styleIcon} />Key Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Nav.Link classname="icons" eventKey={2} >
                                <BiLogOut style={styleIcon2} onClick={handleLogout} />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>




            <SenhasList ></SenhasList>
            <div >
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


        </>
    );
};

export default Senhas;