'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import VacantImage from '@/components/VacantImage';
import { unitsData } from '@/lib/data';

function UnitsContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');
  const activeId = (queryId && unitsData[queryId]) ? queryId : 'araucarias';

  const unit = unitsData[activeId] || unitsData['araucarias'];

  return (
    <div>
      {/* Main Content Layout */}
      <section className="container">
        <div className="details-layout">
          
          {/* Unit Details */}
          <main className="unit-detail fade-in" key={activeId}>
            <div className="unit-detail__header-grid">
              
              {/* Left Column: Photo */}
              <div className="unit-detail__image-wrapper">
                <VacantImage
                  src={unit.image}
                  alt={unit.name}
                  className="unit-detail__image"
                />
              </div>

              {/* Right Column: Details Info */}
              <div className="unit-detail__info-column">
                <h2 className="unit-detail__title">{unit.name}</h2>
                
                <div className="unit-detail__info-list">
                  <div className="unit-detail__info-item">
                    <span className="unit-detail__info-label">Endereço</span>
                    <span className="unit-detail__info-value">{unit.address}</span>
                  </div>
                  <div className="unit-detail__info-item">
                    <span className="unit-detail__info-label">Horário de Funcionamento</span>
                    <span className="unit-detail__info-value">Segunda a Sexta, das 08h às 17h</span>
                  </div>
                  <div className="unit-detail__info-item">
                    <span className="unit-detail__info-label">Contato</span>
                    <span className="unit-detail__info-value">{unit.phone}</span>
                  </div>
                  <div className="unit-detail__info-item">
                    <span className="unit-detail__info-label">Capacidade de Atendimento</span>
                    <span className="unit-detail__info-value">{unit.capacity}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Description Below */}
            <div className="unit-detail__description-section">
              <h3 className="unit-detail__section-title">Sobre a Unidade</h3>
              <p className="unit-detail__text">{unit.description}</p>
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
                  <label htmlFor="message" className="form-label">Mensagem (Intenção de Vaga)</label>
                  <textarea
                    id="message"
                    className="form-textarea"
                    placeholder="Escreva sua mensagem ou detalhes sobre a intenção de vaga..."
                    required
                  />
                </div>
                <button type="submit" className="form-submit-btn">
                  Registrar Intenção de Vaga
                </button>
              </form>
            </div>
          </main>

        </div>
      </section>
    </div>
  );
}

export default function UnitsPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Carregando unidades...</div>}>
      <UnitsContent />
    </Suspense>
  );
}
