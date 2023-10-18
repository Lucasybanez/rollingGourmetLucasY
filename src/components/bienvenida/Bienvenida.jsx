import style from "./Bienvenida.module.css"

const Bienvenida = () => {
    return(
        <>
            <div className={style.contenedor}>
                <video muted autoPlay loop>
                    <source  src="https://live.staticflickr.com/video/53266903328/38b59a4799/1080p.mp4?s=eyJpIjo1MzI2NjkwMzMyOCwiZSI6MTY5NzYxMzUwOCwicyI6IjliZTEyZTk5OWNhODEwMzM4OTg3YjViYjlkNTFiNDVmNDY1ZjI3YTYiLCJ2IjoxfQ" type="video/mp4"/>
                </video>
                <div className={style.info}>
                    <img src="https://live.staticflickr.com/65535/53266903398_ce1f95ec47_w.jpg" alt="" />
                    <p>Rolling Gourmet</p>
                </div>
            </div>
            <div className={style.capa}></div>
        </>
    )
}

export default Bienvenida;