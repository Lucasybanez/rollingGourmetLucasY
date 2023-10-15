import { useState } from "react";
import style from "./InicioSesion.module.css";
import ButtonDefault from "../../components/ButtonDefault";
import logo from "../../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";
import ModalEditarUsuario from "../../components/ModalEditarUsuario";

function InicioSesion() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Url de un back de prueba para que la funcion de logueo quede guardada para cuando usemos el back
  const url = import.meta.env.VITE_API_USUARIOS;

  //UseState para mostrar un mensaje de que los datos ingresados no se encontraron
  const [UsuarioLogueadoError, setUsuarioLogueadoError] = useState(false);

  //Esquema de Yup
  const esquemaInicioSesion = Yup.object().shape({
    email: Yup.string().required("El email es requerido"),

    contrasenia: Yup.string().required("La contrasenia es requerida"),
  });

  //Valores Iniciales
  const valoresIniciales = {
    email: "",
    contrasenia: "",
  };

  //Validacion con formik
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaInicioSesion,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        // Guardo los valores de los inputs
        const usuarioLogueado = {
          Email: values.email,
          Contrasena: values.contrasenia,
        };
        const iniciarSesion = async () => {
          //const response = await axios.post(`${url}/login`, {params: {Email: usuarioLogueado.email, Contrasena: usuarioLogueado.contrasenia}})
          const response = await axios.post(`${url}/login`, usuarioLogueado)
          .then(response=>{
              Swal.fire(
                "Usuario logueado con exito",
                "Tus datos ya fueron ingresados exitosamente",
                "success"
              );
              setIsLoggedIn(true);
          
          }).catch(error=>{
            console.log(error)
            Swal.fire("Usuario no encontrado", " ", "warning");
            setUsuarioLogueadoError(true);
            console.error(error); // Muestra los detalles del error en la consola
          })
        }
        
        iniciarSesion();
      
      } catch (error) {
        // Si la petición falla
        Swal.fire("Algo falló en la autenticación de usuario", " ", "warning");

      }
    },
  });

  const MandarARegistro = () => {
    useNavigate("/Registro");
    console.log("Funciona mandar a registro");
  };

  return (
    <div className={style.page}>
      <Container className={`${style.ubicarCarta}`}>
        <div className={`${style.Carta} mt-3 mb-3 text-center`}>
          <h3 className="mt-5">¡Bienvenido!</h3>
          <img src="public/RollingGourmetIsotipo sin fondo.png" alt="Logo de la pagina" className={`${style.carta_logo} my-5`}/>
          {UsuarioLogueadoError === true && (
            <div className="d-flex justify-content-center">
              <span role="alert" className="text-danger">
                Los datos ingresadon no coinciden con ningun usuario
              </span>
            </div>
          )}
          <Form onSubmit={formik.handleSubmit} noValidate className="">
            <Form.Group classNameclassName={`${style.contenedorForm} my-5`}>
              <Form.Label className={`${style.label_color}`}>
                Ingresa tu correo electronico{" "}
              </Form.Label>
              <div className="input-group">
                <img
                  src="/src/assets/iconoCorreo.png"
                  alt="Imagen"
                  className={`${style.correo_icono}`}
                />
                <Form.Control
                  type="text"
                  placeholder="Ej: Lucas@gmail.com"
                  id="email"
                  {...formik.getFieldProps("email")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid": formik.touched.email && formik.errors.email,
                    },
                    {
                      "is-valud": formik.touched.email && !formik.errors.email,
                    }
                  )}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.email}
                  </span>
                </div>
              )}
            </Form.Group>
            <Form.Group className={`${style.contenedorForm}`}>
              <Form.Label className={`${style.label_color}`}>
                Ingresa tu contrasenia{" "}
              </Form.Label>
              <div className="input-group">
                <img
                  src="/src/assets/contraseña.png"
                  alt="Imagen"
                  className={`${style.contraseña_icono}`}
                />
                <Form.Control
                  type="password"
                  placeholder="Ej: Lucas1234"
                  id="contrasenia"
                  {...formik.getFieldProps("contrasenia")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid":
                        formik.touched.contrasenia && formik.errors.contrasenia,
                    },
                    {
                      "is-valid":
                        formik.touched.contrasenia && formik.errors.contrasenia,
                    }
                  )}
                />
              </div>
              {formik.touched.contrasenia && formik.errors.contrasenia && (
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.contrasenia}
                  </span>
                </div>
              )}
            </Form.Group>

            <ButtonDefault namebtn="ingresar" TipoBoton="sumbit" />
          </Form>
          <br />
          <ModalEditarUsuario usuario="" url={URL}/>
          {/* Botón link 'olvidaste tu contrasenia' */}
           <div className="mb-3 text-center">
            <ButtonDefault
              namebtn="registrarse"
              funcion={MandarARegistro}
              to={"/registro"}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default InicioSesion;
