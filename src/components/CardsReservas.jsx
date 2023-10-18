import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ModalEditar from "./ModalEditarReserva";
import Card from 'react-bootstrap/Card';
import BotonEliminar from "./BotonEliminar";
import ListGroup from 'react-bootstrap/ListGroup';

const CardsReservas = () =>{
    const [reservas, setReservas] = useState([]);
    const [reservas10, setReservas10] = useState([]);
    const [act, setAct] = useState(0);
    const [busqueda, setBusqueda] = useState("");

    const [conteo,setConteo] = useState(0);


    const URL= import.meta.env.VITE_API_RESERVAS;

    useEffect(()=>{
        const getReservas = async () =>{
            const respuesta = await axios.get(URL).then((res)=>{
                setReservas(res.data);
                cargarPagina();
            }).catch ((response)=>{
                switch (response.response.status) {
                    case 404:
                        Swal.fire('Página no encontrada de usuarios');
                        break;
                    case 500:
                        Swal.fire("Sistema caído de usuarios");
                        break;
                }
            })
        }
        getReservas();
    }, []);

    useEffect(()=>{
      cargarPagina();
      
  });

    const cargarPagina = () => {

      for(let i=0; i<10; i++){

        if(i==9){
          setAct(-1);
        }

          if(reservas.length > (conteo+i) && reservas[conteo+i].id>=0){
              reservas10[conteo+i]=reservas[conteo+i];
              if(i==9){
                setAct(-10);
            }
          }
      }
    }

    // Elimina la reserva

    const eliminar = async (id)=>{
    
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
            <h1 className="my-3 text-center text-light">Reservas</h1>
            <input type="text" 
                value={busqueda}
                onChange={(ev)=>{
                    setBusqueda(ev.target.value);
                }}
                placeholder="Buscar fecha"
                className="my-2"
            />
                    {
                      busqueda == "" ?
                        reservas.map((reserv)=>(
                            <Card className="w-100 my-3">
                            <Card.Body>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                              <ListGroup.Item>Fecha: {reserv.Fecha}</ListGroup.Item>
                              <ListGroup.Item>Cantidad de personas: {reserv.CantidadDePersonas}</ListGroup.Item>
                              <ListGroup.Item>Hora: {reserv.Hora}</ListGroup.Item>
                              <ListGroup.Item>A nombre de: {reserv.Responsable}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                            <ModalEditar reserva={reserv} url={URL}/>
                            <BotonEliminar url={URL} id={reserv._id}/>
                            </Card.Body>
                          </Card>
                        ))
                        :
                        reservas.map((reserv)=>{
                          if(busqueda==reserv.Fecha){
                            return(
                              <Card className="w-100 my-3">
                          <Card.Body>
                            <Card.Title>{reserv.Nombre}</Card.Title>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>Fecha: {reserv.Fecha}</ListGroup.Item>
                            <ListGroup.Item>Cantidad de personas: {reserv.CantidadDePersonas}</ListGroup.Item>
                            <ListGroup.Item>Hora: {reserv.Hora}</ListGroup.Item>
                            <ListGroup.Item>A nombre de: {reserv.Responsable}</ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                          <ModalEditar reserva={reserv} url={URL}/>
                          <BotonEliminar url={URL} id={reserv._id}/>
                          </Card.Body>
                        </Card>
                            );
                          } else {
                            return null; // No renderiza nada si reserv está vacío
                        }
                        })
                    }
                  <Button size="lg"
                    onClick={()=>{
                          setConteo(conteo+5);
                          setAct(act+1)
                    }}
                >Ver más</Button>
        </>
    )
}

export default CardsReservas