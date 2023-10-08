import style from "./Portero.module.css"
import CardsReservasHoy from "../../components/CardsReservasHoy";

const Portero = () =>{

    return(
        <>
            
            <div className={style.contenedor}>
                <div className="cards">
                    <CardsReservasHoy/>
                </div>
            </div>
        </>
    )
}

export default Portero;