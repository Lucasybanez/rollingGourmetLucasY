import React from "react";
import { Route, Routes } from "react-router";
import PaginaPrincipal from "../pages/PaginaPrincipal/PaginaPrincipal";
import ACercaDeNosotros from "../pages/a-cerca-de-nosotros/ACercaDeNosotros"
import Contacto from "../pages/Contacto/Contacto"
import Reservas from "../pages/Reservas/Reservas"
import Galeria from "../components/galeria/Galeria";
import InicioSesion from "../pages/Login/InicioSesion";
import Registro from "../pages/Registro/Registro"
import Error404 from "../pages/Error404/Error404";
import Bandeja from "../components/bandeja/Bandeja";



const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/acercadenosotros" element={<ACercaDeNosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path='*' element={<Error404 />} />
        <Route path='/bandeja' element={<Bandeja />} />
      </Routes>
    </>
  );
};

export default Rutas;
