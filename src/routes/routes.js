import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { Home } from "../pages/Home";
import Senhas from "../pages/Senhas";
import Cadastrar from "../pages/Cadastrar";
import { useState, useEffect } from "react";
import LoginPage from "../pages/Login/index"
import { auth } from "../services/FirebaseConfig"
import CadastrarCelular from "../pages/CadastrarCelular";

export const AppRoutes = () => {
  const [senhaId, setSenhaId] = useState("");

  const getSenhaIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setSenhaId(id);
  };

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Celular" element={<CadastrarCelular />} />
          <Route path="/Senha" element={<Senhas />} />
          <Route path="/Cadastro" element={<Cadastrar />} />
          <Route path="/Home" element={<ProtectedRoute />}>
            <Route path="/Home" element={<Home />} />


          </Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
