import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import SenhaDataService from "../services/senhaservice";
import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff } from "react-icons/hi"
import AddSenha from "./AddSenha";
import { GrRefresh } from "react-icons/gr"

const SenhasList = ({ getSenhaId }) => {
    const [senhaId, setSenhaId] = useState("");
    const [show, setShow] = useState(false)


    const handleClick = (e) => {
        e.preventDefault()
        setShow(!show);
    }


    const getSenhaIdHandler = (id) => {
        console.log("The ID of document to be edited: ", id);
        setSenhaId(id);
    };

    const [senhas, setSenhas] = useState([]);
    useEffect(() => {
        getSenhas();
    }, []);

    const getSenhas = async () => {
        const data = await SenhaDataService.getAllSenhas();
        console.log(data.docs);
        setSenhas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const deleteHandler = async (id) => {
        await SenhaDataService.deleteSenha(id);
        getSenhas();
    };
    return (
        <>

            <AddSenha id={senhaId} setSenhaId={setSenhaId}></AddSenha>
            <div className="mb-2">
                <Button variant="dark edit" onClick={getSenhas}>
                    <GrRefresh />
                </Button>
            </div>


            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Book Title</th>
                        <th>Book Author</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {senhas.map((doc, index) => {
                        return (
                            <tr key={doc.id}>
                                <td>{index + 1}</td>
                                <td>{doc.title}</td>
                                <td>{doc.pass}</td>
                                <td>{doc.usuario}</td>
                                <td>
                                    <Button
                                        variant="secondary"
                                        className="edit"
                                        onClick={(e) => getSenhaIdHandler(doc.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="delete"
                                        onClick={(e) => deleteHandler(doc.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default SenhasList;