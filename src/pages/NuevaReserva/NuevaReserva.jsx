import { Row, Col } from "react-bootstrap";
import FormReserva from "../../components/FormReserva/FormReserva"
import style from "./NuevaReserva.module.css"

const NuevaReserva = () =>{
    return(
        <div className={style.contenedor1}>
            <Row>
                <Col lg="8" className={`${style.contenedor1_caja1} p-0`}>
                    <FormReserva/>
                </Col>
                <Col lg="4" className="p-0">
                    <img src="https://live.staticflickr.com/65535/53267091845_125b22f232_w.jpg" alt="" className={`${style.contenedor1_img}`}/>
                </Col>
            </Row>
        </div>
    );
}

export default NuevaReserva;