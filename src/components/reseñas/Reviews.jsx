import React from "react";
import style from "./Reviews.module.css";
import { useTranslation } from "react-i18next";

const Reviews = () => {

  const { t } = useTranslation(); 


  return (
    <>
      <div className={style.componente}>
        <hr />
        <h1 className="titulo font-weight-bold my-4">{t('reseñas')}</h1>
        <div className={`${style.cuerpo}`}>
          <div className={`${style.contenedor}`}>
            <div className={`${style.carta}`}>
              <div className={`${style.imgBx}`}>
              <img src="public\donato2.jpg" height="260px" alt="" />
              </div>
              <div className={`${style.content}`}>
                <h3 className={`${style.nombre_cocinero}`}>Donato De Santis</h3>
                <p className={`${style.texto_reseña}`}>
                  {t('reseña1')}
                </p>
              </div>
            </div>
            <div className={`${style.carta}`}>
              <div className={`${style.imgBx}`}>
                <img src="public\GordonRamsay.jpg" alt="" />
              </div>
              <div className={`${style.content}`}>
                <h3 className={`${style.nombre_cocinero}`}>Gordon Ramsay</h3>
                <p className={`${style.texto_reseña}`}>
                {t('reseña2')}
                </p>
              </div>
            </div>
            <div className={`${style.carta}`}>
              <div className={`${style.imgBx}`}>
                <img src="public\Massimo-Bottura.jpg" alt="" />
              </div>
              <div className={`${style.content}`}>
                <h3 className={`${style.nombre_cocinero}`}>Massimo Bottura</h3>
                <p className={`${style.texto_reseña}`}>
                {t('reseña3')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
