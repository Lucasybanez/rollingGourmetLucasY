import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ModalEditarUsuario from "./ModalEditarUsuario";
import BotonEliminar from "./BotonEliminar";

const TablaUsuarios = () =>{
    const [usuarios, setUsuarios] = useState([]);
    const [usuarios10, setReservas10] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [conteo,setConteo] = useState(0);
    const [busqueda, setBusqueda] = useState("");
    const [habBoton, setHabBoton]= useState(true);

    const [act, setAct] = useState(0);


    const URL= import.meta.env.VITE_API_USUARIOS;

    useEffect(()=>{
        const getUsuarios = async () =>{
            const respuesta = await axios.get(URL).then((res)=>{
                setUsuarios(res.data);
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
            if(usuarios.length > (conteo+i) ){
                usuarios10[i]=usuarios[conteo+i];
                if(i==9){
                    setAct(-10);
                }

            } else{
                usuarios10[i]=[null];
            }
        }
        
    }

    return(
        <div className="componente">
            <p style={{ color: '#B08D59' }}>{act}</p>
            <h2 className="my-3 text-center">Usuarios</h2>
            <input type="text" 
                value={busqueda}
                onChange={(ev)=>{
                    setBusqueda(ev.target.value);
                }}
                placeholder="Buscar por Nombre o Email"
                className="my-2"
            />
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        busqueda == "" ? 
                        usuarios.map((user)=>{
                            if (user.id != 0){
                                return(
                                    <tr>
                                    <td>{user._id}</td>
                                    <td>{user.Nombre}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.Rol}</td>
                                    <td>
                                        <ModalEditarUsuario usuario={user} url={URL}/>
                                        <BotonEliminar url={URL} id={user._id}/>
                                    </td>
                                </tr>
                                );}
                                
                                else {
                                    return null;
                                }
                            
                        }) :
                        usuarios.map((user)=>{
                            if (user.Nombre == busqueda || user.Email == busqueda || user._id == busqueda){
                                return(
                                    <tr>
                                    <td>{user._id}</td>
                                    <td>{user.Nombre}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.Rol}</td>
                                    <td>
                                        <ModalEditarUsuario usuario={user} url={URL}/>
                                        <BotonEliminar url={URL} id={user._id}/>
                                    </td>
                                </tr>
                                );
                            }
                            else {
                                return null;
                            }
                        })
                    } 

                </tbody>
            </Table>
            
        </div>
    )
}

export default TablaUsuarios