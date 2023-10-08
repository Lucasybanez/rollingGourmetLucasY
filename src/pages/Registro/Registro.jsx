import { useState } from "react";
import style from "../Login/InicioSesion.module.css";
import ButtonDefault from "../../components/ButtonDefault";
import logo from "../../assets/logo.png";
import { Link, Navigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";

function Registro() {
  const url = import.meta.env.VITE_API_USUARIOS;

  //Expresiones para validar
  const soloLetras = /^[a-zA-Z ]+$/;
  const email =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const contraseña = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  //Esquema de Yup
  const esquemaRegistro = Yup.object().shape({
    Nombre: Yup.string()
      .required("El nombre es requerido")
      .matches(soloLetras, "El nombre solo debe incluir letras")
      .min(4, "El nombre debe de ser menor a 4 letras")
      .max(25, "El nombre debe de ser menor a 25 letras"),

    Email: Yup.string()
      .required("El email es requerido")
      .matches(email, "Ingrese un formato de email correcto")
      .min(16, "Ingrese un email mayor a 16 carácteres")
      .max(40, "Ingrese un email menor a 40 carácteres"),

    Contraseña: Yup.string()
      .required("La contraseña es requerida")
      .matches(
        contraseña,
        "La contraseña debe de contener entre 8 y 16 carácteres, al menos un dígito, al menos una minuscula y al menos una mayuscula"
      ),

    ConfirmarContraseña: Yup.string()
      .required("Debe ingresar la contraseña nuevamente")
      .oneOf([Yup.ref("Contraseña")], "Las contraseñas deben de coincidir"),
  });

  //Valores iniciales
  const valoresIniciales = {
    Nombre: "",
    Email: "",
    Contraseña: "",
    ConfirmarContraseña: "",
  };

  //Validacion con Formik
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaRegistro,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      try {
        const crear = async () => {
          const Usuario = {
            nombre: values.Nombre,
            Email: values.Email,
            Contrasena: values.Contraseña
          };
          const response = await axios.post(url, Usuario)
          .then(()=>{
              Swal.fire(
                "Usuario credo con exito",
                "Tus datos ya fueron ingresados exitosamente",
                "success"
              );
          }).catch(()=>{
            Swal.fire(
              "No se pudo crear el usuario",
              " ",
              "warning"
            );
          })
          //Agregar funcion para redirigirte a inicio
        }        
        crear();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className={style.page}>
      <Container className={`${style.ubicarCarta}`}>
        <div className={`${style.Carta} text-center`}>
          <h3 className="mt-3">¿No tienes cuenta?</h3>
          <h3 className={`${style.label_color}`}>¡Crea una!</h3>
          <img src="public/RollingGourmetIsotipo sin fondo.png" alt="Logo de la pagina" className={`${style.carta_logo}`} />
          <h3>Rolling Gourmet</h3>
          <div className="section mt-5">
            <Form onSubmit={formik.handleSubmit} noValidate>
              <Form.Group className={`${style.contenedorForm}`}>
                <Form.Label className={`${style.label_color}`}>Nombre</Form.Label>
                <div className="input-group">
                  <img
                    src="/src/assets/usuario.png"
                    alt="Imagen"
                    className={`${style.usuario_icono}`}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Ej: Lucas"
                    id="Nombre"
                    {...formik.getFieldProps("Nombre")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.Nombre && formik.errors.Nombre,
                      },
                      {
                        "is-valid":
                          formik.touched.Nombre && !formik.errors.Nombre,
                      }
                    )}
                  />
                </div>
                {formik.touched.Nombre && formik.errors.Nombre && (
                  
                    <span role="alert" className="text-danger">
                      {formik.errors.Nombre}
                    </span>
                  
                )}
              </Form.Group>
              <Form.Group className="contenedorForm">
                <Form.Label className={`${style.label_color} mt-4`}>
                  Correo Electrónico{" "}
                </Form.Label>
                <div className="input-group">
                  <img
                    src="/src/assets/iconoCorreo.png"
                    alt="Imagen"
                    className={`${style.correo_icono}`}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Ej: lucas@gmail.com"
                    id="Email"
                    {...formik.getFieldProps("Email")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.Email && formik.errors.Email,
                      },
                      {
                        "is-valid":
                          formik.touched.Email && !formik.errors.Email,
                      }
                    )}
                  />
                </div>
                {formik.touched.Email && formik.errors.Email && (
                  
                    <span role="alert" className="text-danger">
                      {formik.errors.Email}
                    </span>
                  
                )}
              </Form.Group>
              <Form.Group className={`${style.contenedorForm}`}>
                <Form.Label className={`${style.label_color} mt-4`}>Contraseña </Form.Label>
                <div className="input-group">
                  <img
                    src="/src/assets/contraseña.png"
                    alt="Imagen"
                    className={`${style.contraseña_icono}`}
                  />
                  <Form.Control
                    type="password"
                    placeholder="Ej: Lucas1234"
                    id="Contraseña"
                    {...formik.getFieldProps("Contraseña")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.Contraseña && formik.errors.Contraseña,
                      },
                      {
                        "is-valid":
                          formik.touched.Contraseña && formik.errors.Contraseña,
                      }
                    )}
                  />
                </div>
                {formik.touched.Contraseña && formik.errors.Contraseña && (
                  
                    <span role="alert" className="text-danger">
                      {formik.errors.Contraseña}
                    </span>
                  
                )}
              </Form.Group>
              <Form.Group className={`${style.contenedorForm}`}>
                <Form.Label className={`${style.label_color} mt-4`}>
                  Repite tu contraseña{" "}
                </Form.Label>
                <div className="input-group">
                  <img
                    src="/src/assets/contraseña.png"
                    alt="Imagen"
                    className={`${style.contraseña_icono}`}
                  />
                  <Form.Control
                    type="password"
                    placeholder="Ingresa nuevamente la contraseña"
                    id="ConfirmarContraseña"
                    {...formik.getFieldProps("ConfirmarContraseña")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.ConfirmarContraseña &&
                          formik.errors.ConfirmarContraseña,
                      },
                      {
                        "is-valid":
                          formik.touched.ConfirmarContraseña &&
                          !formik.errors.ConfirmarContraseña,
                      }
                    )}
                  />
                </div>
                {formik.touched.ConfirmarContraseña &&
                  formik.errors.ConfirmarContraseña && (
                    
                      <span role="alert" className="text-danger">
                        {formik.errors.ConfirmarContraseña}
                      </span>
                    
                  )}
              </Form.Group>

              <ButtonDefault namebtn="Crear cuenta"/>

              <div className=" text-center mb-3">
                <Link to={"/Login"} className="link ">
                  ¿Ya tienes una cuenta? ¡Inicia Sesion!
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Registro;
