import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { getProducts } from '../../../services/productService';
import { useCartStore } from '../../../store/cartStore';
import { FiShoppingCart } from 'react-icons/fi';
import './ProductSlider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Importa imágenes de productos (ejemplo con 2 productos)
import product1 from '../../../assets/images/products/product1.jpg';
import product2 from '../../../assets/images/products/product2.jpg';

const ProductSlider: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Mapea los productos para usar imágenes importadas localmente
        const productsWithLocalImages = data.products.map((product: any, index: number) => ({
          ...product,
          // Alterna entre las imágenes importadas para el ejemplo
          image: index % 2 === 0 ? product1 : product2
        }));
        setProducts(productsWithLocalImages);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  if (loading) return <div className="product-slider__loading">Cargando productos...</div>;
  if (error) return <div className="product-slider__error">{error}</div>;

  return (
    <section className="product-slider" aria-label="Slider de productos destacados">
      <div className="product-slider__header">
        <h2 className="product-slider__title">Productos Destacados</h2>
      </div>

      <div className="product-slider__container">
        <Slider {...settings} className="product-slider__slider">
          {products.map((product) => (
            <div key={product.id} className="product-slider__item">
              <div className="product-slider__image-container">
                <img 
                  src={product.image} 
                  alt={`${product.title} - ${product.brand}`} 
                  className="product-slider__image"
                  loading="lazy"
                  width={300}
                  height={400}
                />
                {product.tags?.length > 0 && (
                  <div className="product-slider__tags">
                    {product.tags.map((tag: string) => (
                      <span 
                        key={tag} 
                        className={`product-slider__tag product-slider__tag--${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {product.discount && (
                  <span className="product-slider__discount">-{product.discount}%</span>
                )}
              </div>
              <div className="product-slider__info">
                <h3 className="product-slider__brand">{product.brand}</h3>
                <h4 className="product-slider__title">{product.title}</h4>
                <div className="product-slider__price-container">
                  {product.discount ? (
                    <>
                      <span className="product-slider__price product-slider__price--discounted">
                        ${(product.price * (1 - product.discount / 100)).toLocaleString('es-CO')}
                      </span>
                      <span className="product-slider__price product-slider__price--original">
                        ${product.price.toLocaleString('es-CO')}
                      </span>
                    </>
                  ) : (
                    <span className="product-slider__price">
                      ${product.price.toLocaleString('es-CO')}
                    </span>
                  )}
                </div>
                <button 
                  className="product-slider__add-to-cart"
                  onClick={() => addItem({
                    id: product.id,
                    title: product.title,
                    price: product.discount 
                      ? product.price * (1 - product.discount / 100)
                      : product.price,
                    image: product.image
                  })}
                  aria-label={`Añadir ${product.title} al carrito`}
                >
                  <FiShoppingCart aria-hidden="true" /> Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductSlider;