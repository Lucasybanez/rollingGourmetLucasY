import { useState } from 'react'
import Navbar from './components/navbar'
import { ReservasProvider } from './context/contexto'
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./context/UserContext";
import "./i18n";
//import { useContext, useState } from "react";
import { NavbarContext, NavbarContexto } from "./context/NavbarContext.jsx";
import Administrador from "./pages/Administrador/Administrador"
import Portero from "./pages/Portero/Portero"

function App() {

  return (
    <>
      <NavbarContexto>
        <UserContext>
           <Header/> 
            <Administrador></Administrador>
           <Footer/>
        </UserContext>
      </NavbarContexto>
    </>
  );
}

export default App;
