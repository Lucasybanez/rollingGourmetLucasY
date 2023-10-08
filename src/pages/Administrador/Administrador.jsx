import TablaUsuarios from "../../components/TablaUsuarios";
import TablaReservas from "../../components/TablaReservas";
import CardsReservas from "../../components/CardsReservas";
import CardsUsuarios from "../../components/CardsUsuarios";
import style from "./Administrador.module.css"

const Admin = () =>{

    return(
        <>
            
            <div className={style.cards}>
                <CardsReservas/>
            </div>

            <div className={style.cards}>
                <CardsUsuarios/>
            </div>
            
            <div className={`${style.componente} ${style.reservaciones}`}>
                <div className={style.tabla}>
                    <TablaReservas/>
                </div>
            </div>
            
            <div className={style.componente}>
                <div className={style.tabla}>
                <TablaUsuarios/>
                </div>
            </div>
        </>
    )
}

export default Admin;