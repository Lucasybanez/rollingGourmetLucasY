
import Navbar from './components/navbar'
import { ReservasProvider } from './context/contexto'
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./context/UserContext";
import "./i18n";
import { NavbarContext, NavbarContexto } from "./context/NavbarContext.jsx";
import Registro from "./pages/Registro/Registro"
import InicioSesion from "./pages/Login/InicioSesion"


function App() {

  return (
    <>
      <NavbarContexto>
        <UserContext>
           <Header/> 
            <InicioSesion/>
           <Footer/>
        </UserContext>
      </NavbarContexto>
    </>
  );
}

export default App;
