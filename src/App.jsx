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
import PaginaPrincipal from "./pages/PaginaPrincipal/PaginaPrincipal"

function App() {

  return (
    <>
      <NavbarContexto>
        <UserContext>
           <Header/> 
          <PaginaPrincipal></PaginaPrincipal>
      <Footer/>
        </UserContext>
      </NavbarContexto>
    </>
  );
}

export default App;
