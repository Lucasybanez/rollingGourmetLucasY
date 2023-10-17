import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ModalEditarUsuario from "./ModalEditarUsuario";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import BotonEliminar from "./BotonEliminar";


const CardsUsuarios = () =>{
    const [usuarios, setUsuarios] = useState([]);
    const [usuarios10, setusuarios10] = useState([]);
    const [act, setAct] = useState(0);
    const [busqueda, setBusqueda] = useState("");

    const [conteo,setConteo] = useState(0);

    const URL= import.meta.env.VITE_API_USUARIOS;

    useEffect(()=>{
        const getUsuarios = async () =>{
            const respuesta = await axios.get(URL).then((res)=>{
                setUsuarios(res.data);
                cargarPagina();

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
        getUsuarios();
    }, []);

    useEffect(()=>{
        cargarPagina();
        
    });

    const cargarPagina = () => {

        for(let i=0; i<10; i++){
  
          if(i==9){
            setAct(-1);
          }
  
            if(usuarios.length > (conteo+i) && usuarios[conteo+i].id>=0){
                usuarios10[conteo+i]=usuarios[conteo+i];
                if(i==9){
                  setAct(-10);
              }
            }
        }
      }

    return(
        <>
            <h1 className="my-3 text-center text-light">Usuarios</h1>
            <input type="text" 
                value={busqueda}
                onChange={(ev)=>{
                    setBusqueda(ev.target.value);
                }}
                placeholder="Buscar por Nombre, Email o ID"
                className="my-2"
            />
                    {
                      busqueda == "" ?
                        usuarios.map((user)=>(
                            <>
                                <Card className="w-100 my-3">
                            <Card.Body>
                              <Card.Title>{user.Rol}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                              <ListGroup.Item>Id: {user._id}</ListGroup.Item>
                              <ListGroup.Item>Nombre: {user.Nombre}</ListGroup.Item>
                              <ListGroup.Item>Email: {user.Email}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <ModalEditarUsuario usuario={user} url={URL}/>
                                <BotonEliminar url={URL} id={user._id}/>
                            </Card.Body>
                          </Card>
                            </>
                        ))
                        :
                        usuarios.map((user)=>{
                          if(user.Nombre == busqueda || user.Email == busqueda || user._id == busqueda){
                            return(
                              <>
                              <Card className="w-100 my-3">
                          <Card.Body>
                            <Card.Title>{user.Rol}</Card.Title>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>Id: {user._id}</ListGroup.Item>
                            <ListGroup.Item>Nombre: {user.Nombre}</ListGroup.Item>
                            <ListGroup.Item>Email: {user.Email}</ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                              <ModalEditarUsuario usuario={user} url={URL}/>
                              <BotonEliminar url={URL} id={user._id}/>
                          </Card.Body>
                        </Card>
                          </>
                            );
                          } else {
                            return null;
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

export default CardsUsuarios