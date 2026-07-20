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

  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const [lastActiveDropdown, setLastActiveDropdown] = useState(null);

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
        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--mobile-open' : ''} ${activeDropdown ? 'header__nav--dropdown-active' : ''} ${lastActiveDropdown ? `header__nav--origin-${lastActiveDropdown}` : ''}`}>
          <ul className="header__nav-list">

            {/* Mobile CTA inside nav */}
            <li className="header__nav-item header__nav-item--mobile-cta">
              <Link href="/vagas" className="header__btn" onClick={() => setIsMobileMenuOpen(false)}>
                Trabalhe conosco
              </Link>
            </li>

            {/* Sobre a Sobei Link */}
            <li className="header__nav-item">
              <Link href="/#sobre" className="header__nav-link" onClick={() => setIsMobileMenuOpen(false)}>
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
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {/* Mobile inline dropdown for projects */}
              {activeDropdown === 'projects' && (
                <ul className="header__mobile-dropdown">
                  <li><Link href="/projetos?id=ccinter" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>CCINTER</Link></li>
                  <li><Link href="/projetos?id=cedesp" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>CEDESP</Link></li>
                  <li><Link href="/projetos?id=nci-imbuias" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>NCI</Link></li>
                  <li><Link href="/projetos?id=orquestra" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Orquestra Jovem</Link></li>
                  <li><Link href="/projetos?id=telecentro" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Telecentro</Link></li>
                </ul>
              )}
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
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {/* Mobile inline dropdown for units */}
              {activeDropdown === 'units' && (
                <ul className="header__mobile-dropdown">
                  <li><Link href="/unidades?id=araucarias" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Araucárias</Link></li>
                  <li><Link href="/unidades?id=cedro" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Cedro</Link></li>
                  <li><Link href="/unidades?id=oliveiras" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Oliveiras</Link></li>
                  <li><Link href="/unidades?id=macaubas" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Macaúbas</Link></li>
                  <li><Link href="/unidades?id=montanaro" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Montanaro</Link></li>
                  <li><Link href="/unidades?id=leblon" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Leblon</Link></li>
                  <li><Link href="/unidades?id=imbuias" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Imbuias</Link></li>
                  <li><Link href="/unidades?id=acacias" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Acácias</Link></li>
                  <li><Link href="/unidades?id=ipes" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Ipês</Link></li>
                  <li><Link href="/unidades?id=bela-vista" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Bela Vista</Link></li>
                  <li><Link href="/unidades?id=sabias" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Sabiás</Link></li>
                  <li><Link href="/unidades?id=orquideas" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Orquídeas</Link></li>
                  <li><Link href="/unidades?id=jacomo" className="header__mobile-dropdown-link" onClick={() => setIsMobileMenuOpen(false)}>Cerejeiras/Jacomo Tatto</Link></li>
                </ul>
              )}
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
          className={`header__toggle ${isMobileMenuOpen ? 'header__toggle--active' : ''}`}
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            if (isMobileMenuOpen) {
              setActiveDropdown(null);
            }
          }}
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
              <Link href="/projetos?id=nci-imbuias" className="header__projects-link">NCI</Link>
            </li>
            <li>
              <Link href="/projetos?id=orquestra" className="header__projects-link">Orquestra Jovem</Link>
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
            </div>
            {/* Col 3 */}
            <div className="header__units-column">
              <Link href="/unidades?id=acacias" className="header__units-link">Acácias</Link>
              <Link href="/unidades?id=ipes" className="header__units-link">Ipês</Link>
              <Link href="/unidades?id=bela-vista" className="header__units-link">Bela Vista</Link>
            </div>
            {/* Col 4 */}
            <div className="header__units-column">
              <Link href="/unidades?id=sabias" className="header__units-link">Sabiás</Link>
              <Link href="/unidades?id=orquideas" className="header__units-link">Orquídeas</Link>
              <Link href="/unidades?id=jacomo" className="header__units-link">Cerejeiras/Jacomo Tatto</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
