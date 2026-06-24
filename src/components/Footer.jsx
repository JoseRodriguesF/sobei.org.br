import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__container">
          
          {/* About Column */}
          <div className="footer__about">
            <Image 
              src="/images/LOGO BRANCO.png" 
              alt="SOBEI Logo" 
              width={400} 
              height={114} 
              style={{ width: '100%', maxWidth: '400px', height: 'auto', objectFit: 'contain' }}
              className="footer__logo-img"
            />
            <p className="footer__description">
              A Sociedade Beneficente Equilíbrio de Interlagos (SOBEI) é uma organização social privada sem fins lucrativos fundada em 1984, dedicada a transformar vidas através da assistência social, educação e desenvolvimento profissional.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="footer__nav">
            <h3 className="footer__title">Navegação</h3>
            <ul className="footer__list">
              <li><Link href="/#sobre" className="footer__link">Sobre Nós</Link></li>
              <li><Link href="/projetos" className="footer__link">Nossos Projetos</Link></li>
              <li><Link href="/unidades" className="footer__link">Nossas Unidades</Link></li>
              <li><Link href="/vagas" className="footer__link">Trabalhe Conosco</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer__nav">
            <h3 className="footer__title">Contato</h3>
            <ul className="footer__list">
              <li className="footer__info-item">
                <span className="footer__info-label">Endereço:</span>
                <span className="footer__info-value">Av. Rubens Montanaro de Borba, 477 - Jardim Regis, São Paulo - SP, 04811-180</span>
              </li>
              <li className="footer__info-item">
                <span className="footer__info-label">E-mail:</span>
                <a href="mailto:sobei@sobei.org.br" className="footer__link">sobei@sobei.org.br</a>
              </li>
              <li className="footer__info-item">
                <span className="footer__info-label">Telefone:</span>
                <a href="tel:1156672785" className="footer__link">11 5667-2785</a>
              </li>
            </ul>
            
            {/* Social Icons */}
            <div className="footer__socials">
              <a href="https://www.facebook.com/sobeimatriz?locale=pt_BR" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/sobeimatriz/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} SOBEI - Sociedade Beneficente Equilíbrio de Interlagos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
