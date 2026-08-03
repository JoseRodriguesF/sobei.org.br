'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import VacantImage from '@/components/VacantImage';
import Link from 'next/link';
import { projectsData } from '@/lib/data';

function ProjectsContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');
  const activeId = (queryId && projectsData[queryId]) ? queryId : 'ccinter';

  const project = projectsData[activeId] || projectsData['ccinter'];

  return (
    <div>
      {/* Main Content Layout */}
      <section className="container">
        <div className="details-layout">
          
          {/* Project Details */}
          <main className="unit-detail fade-in" key={activeId}>
            <div className="unit-detail__header-grid">
              
              {/* Left Column: Photo */}
              <div className="unit-detail__image-wrapper">
                <VacantImage
                  src={project.image}
                  alt={project.title}
                  className="unit-detail__image"
                />
              </div>

              {/* Right Column: Details Info */}
              <div className="unit-detail__info-column">
                <h2 className="unit-detail__title">{project.title}</h2>
                
                <div className="unit-detail__info-list">
                  <div className="unit-detail__info-item">
                    <span className="unit-detail__info-label">Público-Alvo</span>
                    <span className="unit-detail__info-value">{project.ageGroup}</span>
                  </div>
                  
                  <div className="unit-detail__info-item">
                    <span className="unit-detail__info-label">O que o projeto oferece</span>
                    <ul className="detail-card__list" style={{ marginTop: '5px', marginBottom: '0' }}>
                      {project.benefits.map((benefit, index) => (
                        <li key={index} className="detail-card__list-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px' }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span style={{ fontSize: '13px', fontWeight: '500' }}>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* Description Below */}
            <div className="unit-detail__description-section">
              <h3 className="unit-detail__section-title">Sobre o Projeto</h3>
              <p className="unit-detail__text">{project.description}</p>
            </div>

            {/* Contact / Registration Form */}
            <div className="unit-detail__contact-section">
              <h3 className="unit-detail__section-title">Entre em contato</h3>
              <form className="unit-detail__contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">Nome Completo</label>
                  <input
                    type="text"
                    id="fullName"
                    className="form-input"
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="seu.email@exemplo.com"
                    required
                  />
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="phone" className="form-label">Número de Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-input"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="message" className="form-label">Mensagem</label>
                  <textarea
                    id="message"
                    className="form-textarea"
                    placeholder="Escreva sua mensagem..."
                    required
                  />
                </div>
                <button type="submit" className="form-submit-btn">
                  Enviar mensagem
                </button>
              </form>
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
