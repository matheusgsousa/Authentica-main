import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import SenhaDataService from "../services/senhaservice";
import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff } from "react-icons/hi"
import AddSenha from "./AddSenha";
import { GrRefresh } from "react-icons/gr"
import { BsPencil } from "react-icons/bs"
import { BsFillTrashFill } from "react-icons/bs"
import MaterialTable from 'material-table'
import GetAppIcon from '@material-ui/icons/GetApp';
import AddIcon from '@material-ui/icons/Add';




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
                <div className="mb-2">
                    <Button variant="dark edit" onClick={getSenhas} id="refresh">
                        <GrRefresh />
                    </Button>
                </div>
                <div className="tabela">

                    <Table striped bordered hover variant="light" id="tabela1">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Título</th>
                                <th>Usuário</th>
                                <th>Senha</th>
                                <th>Hide</th>
                                <th>Editar</th>
                                <th>Deletar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {senhas.map((doc, index) => {
                                return (
                                    <tr key={doc.id}>
                                        <td>{index + 1}</td>
                                        <td>{doc.title}</td>
                                        <td>{doc.usuario}</td>
                                        <td>{doc.pass}</td>
                                        <td className="add-eye">
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
                                        </td>


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
                </div>
            </div>
        </>
    );
};

export default SenhasList;
