import style from "./Presentacion.module.css"

const Presentacion = () => {
    return (
        <>
            <div className={`${style.container} ${style.presentacion_contenedor}`}>
                <div className="row">
                <img src="https://live.staticflickr.com/65535/53267091845_125b22f232_w.jpg" alt="" className="col-lg-4 col-sm-12 p-2"/>
                <div className="col-lg-8 col-sm-12 p-4">
                    <h3 className={`${style.titulo_custom}`}>ACERCA DE NOSOTROS</h3>
                    <p>
                        Bienvenido a nuestro sofisticado rincón italiano en el corazón de Puerto Madero, Buenos Aires. En nuestro restaurante, deleitarás tus sentidos con una auténtica experiencia gastronómica italiana. Descubre la diversidad de sabores que ofrecemos, desde exquisitas pastas y pizzas artesanales hasta selectos vinos y deliciosos postres. Nuestro acogedor ambiente moderno te invita a disfrutar de momentos inolvidables con tus seres queridos. ¡Sumérgete en la cultura culinaria de Italia y déjate cautivar por nuestro sabor único y distinguido
                    </p>
                    <div className="info-custom mt-2">
                        <div className={`cartel-customoscuro`}>
                        <h3  className={`text-center mt-3 info-dorado`}>INFORMACIÓN</h3>
                        <hr />
                        <p className={`d-inline-block ${style.info_negra} ms-2`}>Horarios</p>
                        <p className={`d-inline-block ${style.info_dorado} ms-2`}>11:30 am - 12:00 pm</p>
                        <hr />
                        <p className={`d-inline-block ${style.info_negra} ms-2`}>Whatsapp</p>
                        <p className={`d-inline-block ${style.info_dorado} ms-2`}>+54 381 5401253</p>
                        <hr />
                        <p className={`d-inline-block ${style.info_negra} ms-2`}>Email</p>
                        <p className={`d-inline-block ${style.info_dorado} ms-2`}>
                            donluigi@rollinggourmet.com
                        </p>
                        <hr />
                        <div></div>
                        <p className={`d-inline-block ${style.info_negra} ms-2`}>Dirección</p>
                        <p className={`d-inline-block ${style.info_dorado} ms-2`}>
                            Olga Cossettini 750, CABA, Buenos Aires.
                        </p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Presentacion;