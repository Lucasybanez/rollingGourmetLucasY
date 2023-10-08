import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import style from "./MisReservas.css"


const MisReservas = () =>{
    const [reservas, setReservas] = useState([]);

    const URL= import.meta.env.VITE_API_RESERVAS;

    useEffect(()=>{
        const getReservas = async () =>{
            const respuesta = await axios.get(URL).then((res)=>{
                setReservas(res.data);
                console.log(res.data);
            }).catch ((response)=>{
                switch (response.response.status) {
                    case 404:
                            Swal.fire("Página no encontrada de usuarios");
                        break;
                    case 500:
                            Swal.fire("Sistema caído de usuarios");
                        break;
                }
            })
        }
        getReservas();
    }, []);

    // Elimina la reserva

    const eliminar = async (id)=>{

        console.log(`${URL}/${id}`)
    
        try {
          const response = await axios.delete(
            `${URL}/${id}`
          );
          Swal.fire("Eliminado exitoso", '', 'success');
          handleClose();
        } catch (error) {
          console.error('Error al actualizar la reservación:', error);
        }
      }

    return(
        <>
            <h1 className="titulo text-center text-light">Reservas</h1>
                    <div className="contenedor">
                    {
                        reservas.map((reserv)=>{
                            if(reserv.Responsable=="lucas@lucas.com"){
                              return(
                                <>
                                  <Card className="caja">
                                    <Card.Img variant="top" src="https://media.gq.com.mx/photos/5c927b45c0e463f033a84935/16:9/w_2560%2Cc_limit/restaurante.jpg" />
                                    <Card.Body>
                                      <Card.Title>{reserv.Nombre}</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                      <ListGroup.Item className="textos"> <b>Fecha:</b> {reserv.Fecha}</ListGroup.Item>
                                      <ListGroup.Item className="textos"> <b>Cantidad de personas:</b> {reserv.CantidadDePersonas}</ListGroup.Item>
                                      <ListGroup.Item className="textos"> <b>Hora:</b> {reserv.Hora}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>
                                    <Button className="mx-2" onClick={() => eliminar(reserv.id)}>Eliminar</Button>
                                    </Card.Body>
                                  </Card>
                                </>
                              );
                            } 
                            })
                    }
                    </div>
        </>
    )
}

export default MisReservas