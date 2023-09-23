import React, { useContext } from "react";
import Header from "../../components/header/Header";
import Info from "../../components/info/Info";
import Menu from "../../components/menu/Menu";
import Reviews from "../../components/reseñas/Reviews";
import Galeria from "../../components/galeria/Galeria";
import { useState } from "react";
import { NavbarContext } from "../../context/NavbarContext";
import Bienvenida from "../../components/bienvenida/Bienvenida"

const PaginaPrincipal = () => {
const {theme} =useContext(NavbarContext)

  return (
    <>
      <Bienvenida/>
      <Menu theme={theme} />
      <Reviews theme={theme} />
      <Galeria theme={theme} />
    </>
  );
};

export default PaginaPrincipal;
