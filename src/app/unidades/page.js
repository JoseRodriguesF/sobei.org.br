'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { unitsData } from '@/lib/data';

function UnitsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeId, setActiveId] = useState('araucarias');

  // Sync state with query parameters
  useEffect(() => {
    const queryId = searchParams.get('id');
    if (queryId && unitsData[queryId]) {
      setActiveId(queryId);
    }
  }, [searchParams]);

  const handleUnitSelect = (id) => {
    setActiveId(id);
    // Update URL query parameters
    router.push(`/unidades?id=${id}`, { scroll: false });
  };

  const unit = unitsData[activeId] || unitsData['araucarias'];

  // Groups of units matching dropdown columns
  const unitGroups = [
    {
      title: 'Grupo A',
      items: [
        { id: 'araucarias', name: 'Araucárias' },
        { id: 'cedro', name: 'Cedro' },
        { id: 'oliveiras', name: 'Oliveiras' },
        { id: 'macaubas', name: 'Macaúbas' }
      ]
    },
    {
      title: 'Grupo B',
      items: [
        { id: 'montanaro', name: 'Montanaro' },
        { id: 'leblon', name: 'Leblon' },
        { id: 'imbuias', name: 'Imbuias' },
        { id: 'acacias', name: 'Acácias' }
      ]
    },
    {
      title: 'Grupo C',
      items: [
        { id: 'ipes', name: 'Ipês' },
        { id: 'bela-vista', name: 'Bela Vista' },
        { id: 'orquideas', name: 'Orquídeas' },
        { id: 'jacomo', name: 'Jacomo' }
      ]
    }
  ];

  return (
    <div>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Nossas Unidades</h1>
          <p className="page-hero__subtitle">
            A SOBEI está presente em diversos bairros da zona sul de São Paulo. Encontre a unidade mais próxima de você.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="container">
        <div className="details-layout">
          
          {/* Sidebar Menu */}
          <aside className="sidebar-menu">
            <h2 className="sidebar-menu__title">Unidades</h2>
            <div className="sidebar-menu__list" style={{ gap: '15px' }}>
              {unitGroups.map((group, groupIdx) => (
                <div key={groupIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleUnitSelect(item.id)}
                      className={`sidebar-menu__btn ${activeId === item.id ? 'sidebar-menu__btn--active' : ''}`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </aside>

          {/* Unit Details */}
          <main className="detail-card fade-in" key={activeId}>
            <div className="detail-card__image-wrapper">
              <Image
                src={unit.image}
                alt={unit.name}
                fill
                className="detail-card__image"
                priority
              />
            </div>
            
            <div className="detail-card__body">
              <h2 className="detail-card__title">{unit.name}</h2>
              <p className="detail-card__tagline">{unit.type}</p>
              
              <div className="detail-card__divider"></div>
              
              <p className="detail-card__text">{unit.description}</p>
              
              <div className="detail-card__divider"></div>

              {/* Contact Metadata */}
              <h3 className="detail-card__section-title" style={{ marginBottom: '1rem' }}>Informações de Contato</h3>
              <div className="metadata-grid">
                <div className="metadata-item">
                  <span className="metadata-item__label">Endereço</span>
                  <span className="metadata-item__value">{unit.address}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-item__label">Telefone</span>
                  <span className="metadata-item__value">{unit.phone}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-item__label">E-mail</span>
                  <span className="metadata-item__value">{unit.email}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-item__label">Capacidade de Atendimento</span>
                  <span className="metadata-item__value">{unit.capacity}</span>
                </div>
              </div>

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
