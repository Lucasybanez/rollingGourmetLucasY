import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from "./FormReserva.module.css"
import { useFormik } from 'formik';
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import jwt_decode from "jwt-decode"
import { tr } from 'date-fns/locale';


const FormReserva = () =>{

    const url = import.meta.env.VITE_API_RESERVAS;

    const [fecha, setFecha] = useState("");
    const [cantPersonas, setCantPersonas] = useState(1);
    const [hora, setHora] = useState("");
    const [decode, setDecode] = useState("");

    const consulta={
      Fecha: fecha,
      Hora: hora
    }

    useEffect(()=>{
      // obtener datos de inicio de sesión

      const token = localStorage.getItem("token");
      try{
        setDecode(jwt_decode(token));
      } catch (e){
      }
},[])

    // ESQUEMA

    const SingUpSchema = Yup.object().shape({
        fecha: Yup.string().required('Debe introducir la fecha').trim(),
        cantPersonas: Yup.string()
          .required('Debe introducir una cantidad')
          .min(1, 'Debe introducir al menos una persona')
          .trim(),
        hora: Yup.string().required('Debe introducir un horario').trim(),
      });

      const formik = useFormik({
        initialValues: {
          fecha: "",
          cantPersonas: 1,
          hora: ""
        },
        validationSchema: SingUpSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
          try{

                // consultar

                const consultar = async () =>{
                  
                  const consulta={
                    Fecha: fecha,
                    Hora: hora
                  }
                  
                  if(decode.Rol=="usuario" || decode.Rol=="administrador"){
                    const response = await axios.post(`${url}/ocupadas`, consulta)
                    .then(response => {
                        if(response.data.length <5){
                            guardar();
                        } else {
                            Swal.fire(
                                "No hay turnos disponibles en ese horario, elija otro",
                                " ",
                                "warning"
                              );
                        }
                    }).catch(error=>{
                      Swal.fire(
                        "Error: no se pudo realizar la reserva",
                        " ",
                        "warning"
                      );
                    });
                  } else {
                    Swal.fire(
                      "Debe iniciar sesión para hacer una reserva",
                      " ",
                      "warning"
                    );
                  }
                }

                // función desea guardar

                const guardar= () =>{
                    Swal.fire({
                        title: 'Hay turnos diponibles, ¿Desea realizar la reserva?',
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Reservar',
                        denyButtonText: `Cancelar`,
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                        crear();
                        } else if (result.isDenied) {
                        Swal.fire('Reserva no guardada', '', 'info')
                        }
                    })
                }

            const crear = async () => {
                const Reserva = {
                    Fecha: fecha,
                    CantidadDePersonas: cantPersonas,
                    Hora: hora,
                    Responsable: decode.Nombre
                };
                const response = await axios.post(url, Reserva)
                .then(()=>{
                    Swal.fire(
                      "Reserva creada con exito",
                      "Tus datos ya fueron ingresados exitosamente",
                      "success"
                    );
                }).catch(()=>{
                  Swal.fire(
                    "No se pudo guardar la reserva",
                    " ",
                    "warning"
                  );
                })
                //Agregar funcion para redirigirte a inicio
              }  

            consultar(); 

            } catch (error) {
              console.log(error);
            }
        },

      });
      


    return(
        <div className={`${style.contenedor}`}>
            <h1>Crear reserva</h1>
            <Form onSubmit={formik.handleSubmit} noValidate>
            <Form.Group className={`${style.contenedor_inputs} mt-4`}>
              <Form.Label className='mx-1'>Fecha:</Form.Label>
              <br />
              <DatePicker
                name="fecha"
                id="fecha"
                {...formik.getFieldProps("fecha")}
                onChange={(date) => {
                  const day = String(date.getDate()).padStart(2, '0'); // Formatear día con dos dígitos
                  const month = String(date.getMonth() + 1).padStart(2, '0'); // Formatear mes con dos dígitos
                  const year = date.getFullYear();
                  const formattedDate = `${day}/${month}/${year}`;
                  
                  formik.setFieldValue("fecha", formattedDate);
                  setFecha(formattedDate);
                }}
              />
              {formik.touched.fecha && formik.errors.fecha && (
                <div className="text-danger mt-1">
                  <span role="alert">{formik.errors.fecha}</span>
                </div>
              )}
            </Form.Group>

            <Form.Group className={`${style.contenedor_inputs} mt-4`}>
              <Form.Label>Hora</Form.Label>
              <Form.Select aria-label="Default select example"
                              name="hora"
                              id="hora"
                              {...formik.getFieldProps("hora")}
                              onChange={(ev) => {
                                formik.handleChange(ev);
                                setHora(ev.target.value);
                              }}
                              className={clsx(
                                'form-control',
                                {
                                  'is-invalid': formik.touched.hora && formik.errors.hora,
                                },
                                {
                                  'is-valid': formik.touched.hora && !formik.errors.hora,
                                }
                              )}
              >

                <option value="">Selecciona un horario</option>
                <option value="12:00">12:00</option>
                <option value="14:00">14:00</option>
                <option value="16:00">16:00</option>
                <option value="18:00">18:00</option>
                <option value="20:00">20:00</option>
                <option value="22:00">22:00</option>
                {formik.touched.hora && formik.errors.hora && (
                <div className="text-danger mt-1">
                  <span role="alert">{formik.errors.hora}</span>
                </div>
              )}
                </Form.Select>
            </Form.Group>

            <Form.Group className={`${style.contenedor_inputs} mt-4`}>
              <Form.Label>Cantidad de Personas</Form.Label>
              <Form.Control
                type="number"
                name="cantidadDePersonas"
                id="cantidadDePersonas"

                {...formik.getFieldProps("cantPersonas")}
                onChange={(ev) => {
                    if(ev.target.value<=0 || ev.target.value>6){
                        Swal.fire(
                            "Las reservas deben ser de mínimo 1 persona y máximo 6",
                            " ",
                            "warning"
                          );
                    } else {
                        formik.handleChange(ev);
                        setCantPersonas(ev.target.value);
                    }
                }}

                className={clsx(
                  'form-control',
                  {
                    'is-invalid': formik.touched.cantPersonas && formik.errors.cantPersonas,
                  },
                  {
                    'is-valid': formik.touched.cantPersonas && !formik.errors.cantPersonas,
                  }
                )}
              />
              {formik.touched.cantPersonas && formik.errors.cantPersonas && (
                <div className="text-danger mt-1">
                  <span role="alert">{formik.errors.cantPersonas}</span>
                </div>
              )}
            </Form.Group>

                <Button variant="primary" type="submit" className={`${style.contenedor_inputs} mt-5`}>
                    Consultar disponibilidad
                </Button>
            </Form>
        </div>
    );
}

export default FormReserva;