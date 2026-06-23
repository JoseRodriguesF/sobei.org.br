'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'projects' | 'units' | null
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const pathname = usePathname();

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [lastActiveDropdown, setLastActiveDropdown] = useState(null);

  // Mantém memória do último menu ativo para que a linha encolha de volta para o mesmo item
  useEffect(() => {
    if (activeDropdown) {
      setLastActiveDropdown(activeDropdown);
    }
  }, [activeDropdown]);

  const handleDropdownToggle = (type) => {
    if (activeDropdown === type) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(type);
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="header__container">
        
        {/* Logo */}
        <Link href="/" className="header__logo">
          <Image 
            src="/images/LOGO TRIANGULO TRANSPARENTE.png" 
            alt="SOBEI Logo" 
            width={60} 
            height={60} 
            className="header__logo-img"
            priority
          />
        </Link>

        {/* Navigation Menu */}
        <nav className={`header__nav ${activeDropdown ? 'header__nav--dropdown-active' : ''} ${lastActiveDropdown ? `header__nav--origin-${lastActiveDropdown}` : ''}`}>
          <ul className="header__nav-list">
            
            {/* Sobre a Sobei Link */}
            <li className="header__nav-item">
              <Link href="/#sobre" className="header__nav-link">
                Sobre a Sobei
              </Link>
            </li>

            {/* Nossos Projetos Dropdown Tab */}
            <li 
              className={`header__nav-item ${activeDropdown === 'projects' ? 'header__nav-item--active' : ''}`}
            >
              <button 
                onClick={() => handleDropdownToggle('projects')} 
                className={`header__nav-link ${activeDropdown === 'projects' ? 'header__nav-link--active' : ''}`}
                aria-expanded={activeDropdown === 'projects'}
              >
                Nossos projetos
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </li>

            {/* Nossas Unidades Dropdown Tab */}
            <li 
              className={`header__nav-item ${activeDropdown === 'units' ? 'header__nav-item--active' : ''}`}
            >
              <button 
                onClick={() => handleDropdownToggle('units')} 
                className={`header__nav-link ${activeDropdown === 'units' ? 'header__nav-link--active' : ''}`}
                aria-expanded={activeDropdown === 'units'}
              >
                Nossas unidades
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </li>

          </ul>
        </nav>

        {/* Action Button */}
        <div className="header__cta">
          <Link href="/vagas" className="header__btn">
            Trabalhe conosco
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button 
          className="header__toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className="header__toggle-bar"></span>
          <span className="header__toggle-bar"></span>
          <span className="header__toggle-bar"></span>
        </button>

      </div>

      {/* --- Projects Dropdown --- */}
      <div className={`header__dropdown ${activeDropdown === 'projects' ? 'header__dropdown--active' : ''}`}>
        <div className="header__dropdown-container">
          <ul className="header__projects-list">
            <li>
              <Link href="/projetos?id=ccinter" className="header__projects-link">CCINTER</Link>
            </li>
            <li>
              <Link href="/projetos?id=cedesp" className="header__projects-link">CEDESP</Link>
            </li>
            <li>
              <Link href="/projetos?id=nci-imbuias" className="header__projects-link">NCI IMBUIAS</Link>
            </li>
            <li>
              <Link href="/projetos?id=telecentro" className="header__projects-link">Telecentro</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* --- Units Dropdown --- */}
      <div className={`header__dropdown ${activeDropdown === 'units' ? 'header__dropdown--active' : ''}`}>
        <div className="header__dropdown-container">
          <div className="header__units-grid">
            {/* Col 1 */}
            <div className="header__units-column">
              <Link href="/unidades?id=araucarias" className="header__units-link">Araucárias</Link>
              <Link href="/unidades?id=cedro" className="header__units-link">Cedro</Link>
              <Link href="/unidades?id=oliveiras" className="header__units-link">Oliveiras</Link>
              <Link href="/unidades?id=macaubas" className="header__units-link">Macaúbas</Link>
            </div>
            {/* Col 2 */}
            <div className="header__units-column">
              <Link href="/unidades?id=montanaro" className="header__units-link">Montanaro</Link>
              <Link href="/unidades?id=leblon" className="header__units-link">Leblon</Link>
              <Link href="/unidades?id=imbuias" className="header__units-link">Imbuias</Link>
              <Link href="/unidades?id=acacias" className="header__units-link">Acácias</Link>
            </div>
            {/* Col 3 */}
            <div className="header__units-column">
              <Link href="/unidades?id=ipes" className="header__units-link">Ipês</Link>
              <Link href="/unidades?id=bela-vista" className="header__units-link">Bela Vista</Link>
              <Link href="/unidades?id=orquideas" className="header__units-link">Orquídeas</Link>
              <Link href="/unidades?id=jacomo" className="header__units-link">Jacomo</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
