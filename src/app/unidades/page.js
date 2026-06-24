'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { unitsData } from '@/lib/data';

function UnitsContent() {
  const searchParams = useSearchParams();
  const [activeId, setActiveId] = useState('araucarias');

  // Sync state with query parameters
  useEffect(() => {
    const queryId = searchParams.get('id');
    if (queryId && unitsData[queryId]) {
      setActiveId(queryId);
    }
  }, [searchParams]);

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
                <Image
                  src={unit.image}
                  alt={unit.name}
                  fill
                  className="unit-detail__image"
                  priority
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
