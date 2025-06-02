import React from 'react';
import bannerDesktop from '../../../assets/images/banners/banner-desktop.jpg';
import './BannerMain.css';

const BannerMain: React.FC = () => {
  return (
    <section className="banner-main" aria-label="Banner principal de Malva">
      {/* Solo usamos la imagen desktop directamente */}
      <img 
        src={bannerDesktop} 
        alt="Colección de verano Malva" 
        className="banner-main__image"
        loading="eager" // Cambiado a eager para carga inmediata
        width={1440}
        height={600}
      />
      
      <div className="banner-main__content">
        <h1 className="banner-main__title">Nueva Colección Verano</h1>
        <p className="banner-main__text">Descubre las últimas tendencias para esta temporada</p>
        <button 
          className="banner-main__button"
          aria-label="Ver colección de verano"
        >
          Ver colección
        </button>
      </div>
    </section>
  );
};

export default BannerMain;