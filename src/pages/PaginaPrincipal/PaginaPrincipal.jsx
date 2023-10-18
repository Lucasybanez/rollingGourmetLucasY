import React, { useContext } from "react";
import Menu from "../../components/menu/Menu";
import Reviews from "../../components/reseñas/Reviews";
import Galeria from "../../components/galeria/Galeria";
import { useState } from "react";
import { NavbarContext } from "../../context/NavbarContext";
import Bienvenida from "../../components/bienvenida/Bienvenida"
import Presentacion from "../../components/presentacion/Presentacion";
import style from "./PaginaPrincipal.module.css"

const PaginaPrincipal = () => {
const {theme} =useContext(NavbarContext)

  return (
    <>
      <div className={style.page}>
        <Bienvenida/>
        <Presentacion/>
        <Menu/>
        <Reviews/>
        <div className="my-4">
          <Galeria/>
        </div>
      </div>
    </>
  );
};

export default PaginaPrincipal;
