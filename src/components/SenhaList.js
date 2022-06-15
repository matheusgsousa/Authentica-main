import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import SenhaDataService from "../services/senhaservice";

import AddSenha from "./AddSenha";
import { GrRefresh } from "react-icons/gr"
import { BsPencil } from "react-icons/bs"
import { BsFillTrashFill } from "react-icons/bs"






import "./table.css"


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


            <div className="crud">

                <AddSenha id={senhaId} setSenhaId={setSenhaId}></AddSenha>


                <div className="tabela">


                    <Table class="table table-striped table-bordered" style={{ color: "white" }} id="tabelaboot">
                        <thead class="table-light">

                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Título</th>
                                <th scope="col">Usuário</th>
                                <th scope="col">Senha</th>
                                <th scope="col">Editar</th>
                                <th scope="col">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>

                            {senhas.map((doc, index) => {
                                return (
                                    <tr key={doc.id} >
                                        <td>{index + 1}</td>
                                        <td>{doc.title}</td>
                                        <td>{doc.usuario}</td>
                                        <td>{doc.pass}</td>



                                        <td>
                                            <BsPencil
                                                type="submit"
                                                variant="secondary"
                                                className="edit"
                                                onClick={(e) => getSenhaIdHandler(doc.id)}
                                            />
                                        </td>
                                        <td>

                                            <BsFillTrashFill

                                                type="submit"
                                                variant="danger"
                                                className="delete"
                                                onClick={(e) => deleteHandler(doc.id)}
                                            />

                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Button onClick={getSenhas} id="refresh">
                        <GrRefresh />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SenhasList;
