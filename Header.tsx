import React, { useState, useEffect } from 'react';
import { getMenuData } from '../../../services/menuService';
import { FiMenu, FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import logo from '../../../assets/images/logo.png';
import { useCartStore } from '../../../store/cartStore';
import './Header.css';

const Header: React.FC = () => {
  const [menuData, setMenuData] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const cartItemsCount = useCartStore((state) => state.totalItems());

  useEffect(() => {
    const fetchMenuData = async () => {
      const data = await getMenuData();
      setMenuData(data);
    };
    fetchMenuData();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY && currentScrollY > 100); // Solo se fija después de 100px
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${isScrollingUp ? 'header--fixed' : ''}`}>
      {/* Banner cinta */}
      <div className="header__ribbon">
        <p>Envíos gratis en compras superiores a $100.000</p>
      </div>

      {/* Menú principal */}
      <div className="header__main">
        <button
          className="header__hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menú hamburguesa"
          aria-expanded={isMenuOpen}
        >
          <FiMenu size={24} />
        </button>

        <div className="header__logo">
          <img
            src={logo}
            alt="Logo de Malva"
            width={120}
            height={40}
          />
        </div>


        {/* Overlay para móvil (solo aparece cuando el menú está abierto) */}
        {isMenuOpen && (
          <div
            className="header__overlay"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          {menuData?.categories.map((category: any) => (
            <div key={category.name} className="header__nav-item">
              <button className="header__nav-category">
                {category.name}
              </button>
              <div className="header__submenu">
                {category.subcategories.map((subcategory: any) => (
                  <div key={subcategory.name} className="header__submenu-column">
                    <h4>{subcategory.name}</h4>
                    <ul>
                      {subcategory.items.map((item: string) => (
                        <li key={item}>
                          <button
                            className="submenu-item"
                            onClick={() => console.log('Navegar a:', item)}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="header__icons">
          <button className="header__icon" aria-label="Buscar">
            <FiSearch size={20} />
          </button>
          <button className="header__icon" aria-label="Mi cuenta">
            <FiUser size={20} />
          </button>
          {/* Actualiza el icono del carrito:*/}
          <button className="header__icon header__cart" aria-label="Carrito de compras">
            <FiShoppingCart size={20} />
            {cartItemsCount > 0 && (
              <span className="header__cart-count">{cartItemsCount}</span>
            )}
          </button>

        </div>
      </div>

    </header>
  );
};

export default Header;