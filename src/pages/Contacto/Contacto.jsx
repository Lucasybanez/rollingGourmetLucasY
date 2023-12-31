import Mapa from "../../components/Mapa"
import style from "./Contacto.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from "../../components/FormContacto";
import { useTranslation } from "react-i18next";

const Contacto = () =>{

    const {t} = useTranslation();

    return(
        <>
            <div className={style.container}>


                <div className={`text-center ${style.banner}`}>
                    <p>{t('contacto')}</p>
                </div>

                <div className={style.container2}>
                    <div className={`p-5 ${style.formContacto}`}>
                        <Formulario/>
                    </div>

                    <div className={`p-5 ${style.mapa}`}>
                        <Mapa/>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Contacto