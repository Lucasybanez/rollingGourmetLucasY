import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsuariosContext } from "../../context/UserContext";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import i18n from "i18next";
import Form from "react-bootstrap/Form";
import { useTranslation, initReactI18next } from "react-i18next";
import { useEffect } from "react";
import { NavbarContext } from "../../context/NavbarContext";

const Header = () => {
  const { logout } = useContext(UsuariosContext);

  const { theme, handleSwitch } = useContext(NavbarContext);

  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }else{
    user = ""
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { t } = useTranslation();

  useEffect(() => {
    if (theme === "claro") {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    } else {
      document.body.style.backgroundColor = "#191919";
      document.body.style.color = "white";
    }
  }, [theme]);

  return (
    <>
      <Navbar fixed="top" expand="lg" className={theme}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center collapse-custom"
        >
          <Nav className="ml-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/" className="Nav.Link  m-2 botones">
              {t("inicio")}
            </Nav.Link>
            <Nav.Link as={Link} to="/nosotros" className=" m-2 botones">
              {t("nosotros")}
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto" className=" m-2 botones">
              {t("contacto")}
            </Nav.Link>
            <Nav.Link as={Link} to="/reservar" className=" m-2 boton-reserva text-center">
              {t("reserva")}
            </Nav.Link>
          </Nav>
          <Nav
            style={{ display: "block", position: "relative" }}
            className="botones-izquierda"
          >
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center collapse-custom"
        >
          <Nav className="ml-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/registrarse" className="Nav.Link  m-2 botones">
              {t("REGISTRARSE")}
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className=" m-2 botones">
              {t("INICIAR SESIÓN")}
            </Nav.Link>
          </Nav>
          <Nav
            style={{ display: "block", position: "relative" }}
            className="botones-izquierda"
          >
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
