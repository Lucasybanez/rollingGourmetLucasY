import { Row, Col } from "react-bootstrap";
import FormReserva from "../../components/FormReserva/FormReserva"
import style from "./NuevaReserva.css"

const NuevaReserva = () =>{
    return(
        <div className="contenedor1">
            <Row>
                <Col lg="8" className="contenedor1_caja1 p-0">
                    <FormReserva/>
                </Col>
                <Col lg="4" className="p-0">
                    <img src="public/ilustracion1.jpg" alt="" className="contenedor1_img"/>
                </Col>
            </Row>
        </div>
    );
}

export default NuevaReserva;