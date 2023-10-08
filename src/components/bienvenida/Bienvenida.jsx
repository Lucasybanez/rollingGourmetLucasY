import style from "./Bienvenida.module.css"

const Bienvenida = () => {
    return(
        <>
            <div className={style.contenedor}>
                <video muted autoPlay loop>
                    <source  src="public/video fondo.mp4" type="video/mp4"/>
                </video>
                <div className={style.info}>
                    <img src="public/RollingGourmetIsotipo sin fondo.png" alt="" />
                    <p>Rolling Gourmet</p>
                </div>
            </div>
            <div className={style.capa}></div>
        </>
    )
}

export default Bienvenida;