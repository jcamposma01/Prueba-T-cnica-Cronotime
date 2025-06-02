import React, { useState } from 'react';
import { getFooterData } from '../../../services/footerService';
import './Footer.css';

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  React.useEffect(() => {
    const fetchFooterData = async () => {
      const data = await getFooterData();
      setFooterData(data);
      // Inicializar todos los acordeones como cerrados
      const initialExpanded: Record<string, boolean> = {};
      data?.sections.forEach((section: any) => {
        initialExpanded[section.title] = false;
      });
      setExpandedSections(initialExpanded);
    };
    fetchFooterData();
  }, []);

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) {
      alert('Debes aceptar los términos para suscribirte');
      return;
    }
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        {footerData?.sections.map((section: any) => (
          <div key={section.title} className="footer__section">
            <button 
              className="footer__section-title" 
              onClick={() => toggleSection(section.title)}
            >
              {section.title}
              <span className={`footer__arrow ${expandedSections[section.title] ? 'footer__arrow--up' : ''}`}>
                ▼
              </span>
            </button>
            <ul className={`footer__list ${expandedSections[section.title] ? 'footer__list--open' : ''}`}>
              {section.items.map((item: string) => (
                <li key={item} className="footer__list-item">
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer__section footer__newsletter">
          <h3 className="footer__section-title">Newsletter</h3>
          {isSubscribed ? (
            <p className="footer__subscribed">¡Gracias por suscribirte!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="footer__newsletter-form">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="footer__checkbox-container">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  required
                />
                <label htmlFor="terms">Acepto los términos y condiciones</label>
              </div>
              <button type="submit" className="footer__subscribe-button">
                Suscribirse
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__copyright">
          © {new Date().getFullYear()} Malva. Todos los derechos reservados.
        </div>
        <div className="footer__legal">
          {footerData?.legal.map((item: string) => (
            <a key={item} href="#" className="footer__legal-link">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;