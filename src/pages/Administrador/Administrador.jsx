import TablaUsuarios from "../../components/TablaUsuarios";
import TablaReservas from "../../components/TablaReservas";
import CardsReservas from "../../components/CardsReservas";
import CardsUsuarios from "../../components/CardsUsuarios";
import style from "./Administrador.module.css";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { useEffect } from "react";


const Admin = () =>{

    useEffect(()=>{
        // obtener datos de inicio de sesión
        const token = localStorage.getItem("token");
        try{
            const decode = jwt_decode(token);
            console.log(decode.Rol);

            if(decode.Rol != "administrador"){
                Swal.fire(
                    "Debe ser administrador para acceder",
                    " ",
                    "warning"
                  );
                  window.location.href = "/login";
                }
        } catch (e){
            Swal.fire(
                "Debe ser administrador para acceder",
                " ",
                "warning"
              );
              window.location.href = "/login";
        }
  },[])

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