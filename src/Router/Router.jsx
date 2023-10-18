import { Routes, Route } from "react-router-dom"
import PaginaPrincipal from "../pages/PaginaPrincipal/PaginaPrincipal"
import Contacto from "../pages/Contacto/Contacto"
import ACercaDeNosotros from "../pages/a-cerca-de-nosotros/ACercaDeNosotros"
import InicioSesion from "../pages/Login/InicioSesion"
import Registro from "../pages/Registro/Registro"
import NuevaReserva from "../pages/NuevaReserva/NuevaReserva"
import MisReservas from "../pages/Mis Reservas/MisReservas"
import Admin from "../pages/Administrador/Administrador"
import Error404 from "../pages/Error404/Error404"

function Rutas() {
  return (
    <div className="Aplicacion">
      <Routes>
        <Route path="/" element={ <PaginaPrincipal /> } />
        <Route path="contacto" element={<Contacto/>} />
        <Route path="nosotros" element={<ACercaDeNosotros/>} />
        <Route path="login" element={<InicioSesion/>} />
        <Route path="registrarse" element={<Registro/>} />
        <Route path="reservar" element={<NuevaReserva/>} />
        <Route path="misreservas" element={<MisReservas/>} />
        <Route path="administrador" element={<Admin/>} />
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </div>
  )
}

export default Rutas