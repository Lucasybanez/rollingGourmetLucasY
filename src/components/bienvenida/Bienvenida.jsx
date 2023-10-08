import style from "./Bienvenida.css"

const Bienvenida = () => {
    return(
        <>
            <div className="bienvenido" id="contenedor">
                <video muted autoPlay loop>
                    <source  src="public/video fondo.mp4" type="video/mp4"/>
                </video>
                <div className="info">
                    <img src="public/RollingGourmetIsotipo sin fondo.png" alt="" />
                    <p>Rolling Gourmet</p>
                </div>
            </div>
            <div className="capa"></div>
        </>
    )
}

export default Bienvenida;