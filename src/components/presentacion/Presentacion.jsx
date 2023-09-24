import style from "./Presentacion.css"

const Presentacion = () => {
    return (
        <>
            <div className="presentacion_contenedor">
                <img src="public/ilustracion1.jpg" alt="" />
                <div>
                    <h3 className="titulo-custom">ACERCA DE NOSOTROS</h3>
                    <p>
                        Bienvenido a nuestro sofisticado rincón italiano en el corazón de Puerto Madero, Buenos Aires. En nuestro restaurante, deleitarás tus sentidos con una auténtica experiencia gastronómica italiana. Descubre la diversidad de sabores que ofrecemos, desde exquisitas pastas y pizzas artesanales hasta selectos vinos y deliciosos postres. Nuestro acogedor ambiente moderno te invita a disfrutar de momentos inolvidables con tus seres queridos. ¡Sumérgete en la cultura culinaria de Italia y déjate cautivar por nuestro sabor único y distinguido
                    </p>
                    <div className="info-custom">
                        <div className={`cartel-customoscuro`}>
                        <h3 className={`text-center mt-3 color-infooscuro`}>INFORMACIÓN</h3>
                        <hr />
                        <p className="d-inline-block info-negra ms-2">Horarios</p>
                        <p className="d-inline-block info-dorado ms-2">11:30 am - 12:00 pm</p>
                        <hr />
                        <p className="d-inline-block info-negra ms-2">Whatsapp</p>
                        <p className="d-inline-block info-dorado ms-2">+54 381 5401253</p>
                        <hr />
                        <p className="d-inline-block info-negra ms-2">Email</p>
                        <p className="d-inline-block info-dorado ms-2">
                            donluigi@rollinggourmet.com
                        </p>
                        <hr />
                        <div></div>
                        <p className="d-inline-block info-negra ms-2">Dirección</p>
                        <p className="d-inline-block info-dorado ms-2 text-end">
                            Olga Cossettini 750, CABA, Buenos Aires.
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Presentacion;