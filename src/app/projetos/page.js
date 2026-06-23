'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '@/lib/data';

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeId, setActiveId] = useState('ccinter');

  // Sync state with query parameters
  useEffect(() => {
    const queryId = searchParams.get('id');
    if (queryId && projectsData[queryId]) {
      setActiveId(queryId);
    }
  }, [searchParams]);

  const handleProjectSelect = (id) => {
    setActiveId(id);
    // Update URL search parameters without page reload
    router.push(`/projetos?id=${id}`, { scroll: false });
  };

  const project = projectsData[activeId] || projectsData['ccinter'];

  return (
    <div>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Nossos Projetos</h1>
          <p className="page-hero__subtitle">
            Conheça as iniciativas, cursos e programas de desenvolvimento social e capacitação promovidos pela SOBEI.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="container">
        <div className="details-layout">
          
          {/* Sidebar Menu */}
          <aside className="sidebar-menu">
            <h2 className="sidebar-menu__title">Projetos</h2>
            <div className="sidebar-menu__list">
              <button
                onClick={() => handleProjectSelect('ccinter')}
                className={`sidebar-menu__btn ${activeId === 'ccinter' ? 'sidebar-menu__btn--active' : ''}`}
              >
                CCINTER
              </button>
              <button
                onClick={() => handleProjectSelect('cedesp')}
                className={`sidebar-menu__btn ${activeId === 'cedesp' ? 'sidebar-menu__btn--active' : ''}`}
              >
                CEDESP
              </button>
              <button
                onClick={() => handleProjectSelect('nci-imbuias')}
                className={`sidebar-menu__btn ${activeId === 'nci-imbuias' ? 'sidebar-menu__btn--active' : ''}`}
              >
                NCI Imbuias
              </button>
              <button
                onClick={() => handleProjectSelect('telecentro')}
                className={`sidebar-menu__btn ${activeId === 'telecentro' ? 'sidebar-menu__btn--active' : ''}`}
              >
                Telecentro
              </button>
            </div>
          </aside>

          {/* Project Details */}
          <main className="detail-card fade-in" key={activeId}>
            <div className="detail-card__image-wrapper">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="detail-card__image"
                priority
              />
            </div>
            
            <div className="detail-card__body">
              <h2 className="detail-card__title">{project.title}</h2>
              <p className="detail-card__tagline">{project.tagline}</p>
              
              <div className="detail-card__divider"></div>
              
              <p className="detail-card__text">{project.description}</p>
              
              <h3 className="detail-card__section-title">O que o projeto oferece:</h3>
              <ul className="detail-card__list">
                {project.benefits.map((benefit, index) => (
                  <li key={index} className="detail-card__list-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
              
              <div className="detail-card__divider"></div>

              {/* Metadata */}
              <div className="metadata-grid">
                <div className="metadata-item">
                  <span className="metadata-item__label">Público-Alvo</span>
                  <span className="metadata-item__value">{project.ageGroup}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-item__label">Unidades executoras</span>
                  <div className="metadata-item__links">
                    {project.units.map((unitName, index) => {
                      const unitKey = unitName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
                      return (
                        <Link key={index} href={`/unidades?id=${unitKey}`} className="metadata-item__tag">
                          {unitName}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          </main>

        </div>
      </section>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Carregando projetos...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
