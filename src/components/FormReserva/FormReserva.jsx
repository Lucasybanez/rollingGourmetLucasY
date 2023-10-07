import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from "./FormReserva.css"
import { useFormik } from 'formik';
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


const FormReserva = () =>{

    const url = import.meta.env.VITE_API_RESERVAS;

    const [fecha, setFecha] = useState("");
    const [cantPersonas, setCantPersonas] = useState(0);
    const [hora, setHora] = useState("");

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
          cantPersonas: 0,
          hora: ""
        },
        validationSchema: SingUpSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
          try{
            const crear = async () => {
                const Reserva = {
                    Fecha: fecha,
                    CantidadDePersonas: cantPersonas,
                    Hora: hora
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
            crear();      
            } catch (error) {
              console.log(error);
            }
        },

      });
      
    

    return(
        <div className='contenedor'>
            <h1>Crear reserva</h1>
            <Form onSubmit={formik.handleSubmit} noValidate>
            <Form.Group>
              <Form.Label className='mx-1'>Fecha:</Form.Label>
              <DatePicker
                name="fecha"
                id="fecha"
                {...formik.getFieldProps("fecha")}
                onChange={(date) => {
                  formik.setFieldValue("fecha",date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear());
                  setFecha(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear());
                }}
              />
              {formik.touched.fecha && formik.errors.fecha && (
                <div className="text-danger mt-1">
                  <span role="alert">{formik.errors.fecha}</span>
                </div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="text"
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
              />
              {formik.touched.hora && formik.errors.hora && (
                <div className="text-danger mt-1">
                  <span role="alert">{formik.errors.hora}</span>
                </div>
              )}
            </Form.Group>

                <Form.Group>
              <Form.Label>Cantidad de Personas</Form.Label>
              <Form.Control
                type="number"
                name="cantidadDePersonas"
                id="cantidadDePersonas"

                {...formik.getFieldProps("cantPersonas")}
                onChange={(ev) => {
                  formik.handleChange(ev);
                  setCantPersonas(ev.target.value);
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default FormReserva;