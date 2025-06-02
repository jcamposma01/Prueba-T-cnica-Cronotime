import React, { useState, useEffect } from 'react';
import './BannerMain.css';

import bannerDesktop from '../../../assets/images/banners/banner-desktop.webp';
import bannerMobile from '../../../assets/images/banners/banner-mobile.webp';

const BannerMain: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verificar inmediatamente al montar
    checkScreenSize();
    
    // Configurar listener para cambios
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <section className="banner-main">
      {/* Usamos picture para mejor rendimiento */}
      <picture>
        <source media="(max-width: 768px)" srcSet={bannerMobile} />
        <source media="(min-width: 769px)" srcSet={bannerDesktop} />
        <img
          src={bannerDesktop}
          alt="Colección de verano"
          className="banner-main__image"
          loading="eager" // Prioriza carga del banner
          onError={(e) => {
            (e.target as HTMLImageElement).src = bannerDesktop;
          }}
        />
      </picture>
      
      <div className="banner-main__content">
        <h1>Nueva Colección Verano</h1>
        <button className="banner-main__button">Ver colección</button>
      </div>
    </section>
  );
};

export default BannerMain;