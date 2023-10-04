import { useState } from "react";
import "../../styles/InicioSesion.css";
import ButtonDefault from "../../components/ButtonDefault";
import logo from "../../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";

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
          email: values.email,
          contrasenia: values.contrasenia,
        };
        console.log("email", usuarioLogueado.email);
        console.log("contra", usuarioLogueado.contrasenia)
        const iniciarSesion = async () => {
          const response = await axios.get(url, {params: {Email: usuarioLogueado.email, Contrasena: usuarioLogueado.contrasenia}})
          .then(response=>{
            console.log(response.data)
            if(response.data.length>0){
              Swal.fire(
                "Usuario logueado con exito",
                "Tus datos ya fueron ingresados exitosamente",
                "success"
              );
              setIsLoogedIn(true);
            }
            else{
            Swal.fire("Usuario no encontrado", " ", "warning");
            }
          }).catch(error=>{
            console.log(response.data);
            Swal.fire("Usuario no encontrado", " ", "warning");
            setUsuarioLogueadoError(true);
            console.error(error.response); // Muestra los detalles del error en la consola
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
    <div className="background-image">
      <Container className="ubicarCarta">
        <div className="Carta mt-3 mb-3 text-center">
          <h3 className="mt-3">Bienvenido!</h3>
          <img src="public/RollingGourmetIsotipo sin fondo.png" alt="Logo de la pagina" className="carta_logo my-5" />
          {UsuarioLogueadoError === true && (
            <div className="d-flex justify-content-center">
              <span role="alert" className="text-danger">
                Los datos ingresadon no coinciden con ningun usuario
              </span>
            </div>
          )}
          <Form onSubmit={formik.handleSubmit} noValidate className="">
            <Form.Group className="contenedorForm">
              <Form.Label className="label-color">
                Ingresa tu correo electronico{" "}
              </Form.Label>
              <div className="input-group">
                <img
                  src="/src/assets/iconoCorreo.png"
                  alt="Imagen"
                  className="correo-icono"
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
            <Form.Group className="contenedorForm">
              <Form.Label className="label-color">
                Ingresa tu contrasenia{" "}
              </Form.Label>
              <div className="input-group">
                <img
                  src="/src/assets/contraseña.png"
                  alt="Imagen"
                  className="contraseña-icono"
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
