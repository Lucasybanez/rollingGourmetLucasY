import { Button } from "react-bootstrap";
import Swal from 'sweetalert2'
import axios from "axios";

const BotonEliminar = (props)=>{

     // Elimina el documento

 const eliminar = async () => {

    try {
      const response = await axios.delete(
        `${props.url}/${props.id}`
      );
      Swal.fire("Eliminado exitoso", '', 'success');
    } catch (error) {
        alert(error);
    }
  }

    return(
        <>
            <Button onClick={eliminar} className="mx-2">Eliminar</Button>
        </>
    );
}

export default BotonEliminar;