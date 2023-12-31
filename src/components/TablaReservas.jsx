import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button, Alert } from "react-bootstrap";
import ModalEditar from "./ModalEditarReserva";
import BotonEliminar from "./BotonEliminar";

const TablaReservas = () =>{
    const [reservas, setReservas] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [conteo,setConteo] = useState(0);
    const [reservas10, setReservas10] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [habBoton, setHabBoton]= useState(true);

    const [act, setAct] = useState(0);

    const URL= import.meta.env.VITE_API_RESERVAS;

    useEffect(()=>{
        const getReservas = async () =>{
            const respuesta = await axios.get(URL).then((res)=>{
                setReservas(res.data);
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

    useEffect(()=>{
        cargarPagina();
        
    });

    const cargarPagina = () => {

        for(let i=0; i<10; i++){
            if(i==9){
                setAct(-1);
            }

            if(reservas.length > (conteo+i) ){
                reservas10[i]=reservas[conteo+i];
                if(i==9){
                    setAct(-10);
                }
            } else{
                reservas10[i]=[null];
            }
        }
        
    }

    // Elimina la reserva

    const eliminar = async (id)=>{
    
        try {
          const response = await axios.delete(
            `${URL}/${id}`
          );
          Swal.fire("Eliminado exitoso", '', 'success')
          handleClose();
        } catch (error) {
          console.error('Error al actualizar la reservación:', error);
        }
      }

    return(
        <>
            <h2 className="my-3 text-center">Reservas</h2>
            <p style={{ color: '#B08D59' }}>{act}</p>
            <input type="text" 
                value={busqueda}
                onChange={(ev)=>{
                    setBusqueda(ev.target.value);
                }}
                placeholder="Buscar fecha"
                className="my-2"
            />
            <Table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Personas</th>
                        <th>Hora</th>
                        <th>Email</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {
                    busqueda == "" ?
                    reservas.map((reserv) => {
                        if (reserv.id!='') {
                            return (
                                <tr key={reserv.id}>
                                    <td>{reserv.Fecha}</td>
                                    <td>{reserv.CantidadDePersonas}</td>
                                    <td>{reserv.Hora}</td>
                                    <td>{reserv.Responsable}</td>
                                    <td>
                                        <ModalEditar reserva={reserv} url={URL}/>
                                        <BotonEliminar url={URL} id={reserv._id}/>
                                    </td>
                                </tr>
                            );
                        }
                        else {
                            return null; // No renderiza nada si reserv está vacío
                        }
                    })
                    : 
                    reservas.map((reserv) => {
                        if (busqueda==reserv.Fecha) {
                            return (
                                <tr>
                                    <td>{reserv.Fecha}</td>
                                    <td>{reserv.CantidadDePersonas}</td>
                                    <td>{reserv.Hora}</td>
                                    <td>{reserv.Responsable}</td>
                                    <td>
                                        <ModalEditar reserva={reserv} url={URL}/>
                                        <BotonEliminar url={URL} id={reserv._id}/>
                                    </td>
                                </tr>
                            );
                        }
                        else {
                            return null; // No renderiza nada si reserv está vacío
                        }
                    })
                    }
                </tbody>

            </Table>
            
        </>
    )
}

export default TablaReservas