'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import VacantImage from '@/components/VacantImage';
import { unitsData } from '@/lib/data';
import { enviarMensagemUnidade } from '@/lib/api';
import { IconCheckCircle, IconInfo } from '@/components/Icons';

function UnitsContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');
  const activeId = (queryId && unitsData[queryId]) ? queryId : 'araucarias';

  const unit = unitsData[activeId] || unitsData['araucarias'];

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSending(true);

    const payload = {
      unidade: unit.name,
      nomeCompleto: fullName,
      email: email,
      telefone: phone,
      mensagem: message
    };

    const res = await enviarMensagemUnidade(payload);
    if (res.success) {
      setSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } else {
      setSubmitError(res.message || 'Erro ao enviar mensagem. Tente novamente.');
    }
    setSending(false);
  };

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
              
              {submitted ? (
                <div style={{ 
                  padding: '24px', 
                  textAlign: 'center',
                  color: '#166534'
                }}>
                  <IconCheckCircle size={36} style={{ color: '#166534' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Mensagem enviada com sucesso!</h4>
                  <p style={{ fontSize: '14px', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                    Sua mensagem foi registrada e direcionada à coordenação da unidade <strong>{unit.name}</strong>.
                  </p>
                  <button 
                    type="button" 
                    className="form-submit-btn" 
                    onClick={() => setSubmitted(false)}
                    style={{ maxWidth: '220px', margin: '0 auto' }}
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form className="unit-detail__contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">Nome Completo *</label>
                    <input
                      type="text"
                      id="fullName"
                      className="form-input"
                      placeholder="Digite seu nome completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">E-mail *</label>
                    <input
                      type="email"
                      id="email"
                      className="form-input"
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group form-group--full">
                    <label htmlFor="phone" className="form-label">Número de Telefone / WhatsApp *</label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-input"
                      placeholder="(11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group form-group--full">
                    <label htmlFor="message" className="form-label">Mensagem *</label>
                    <textarea
                      id="message"
                      className="form-textarea"
                      placeholder="Escreva sua mensagem..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>

                  {submitError && (
                    <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '12px' }}>{submitError}</p>
                  )}

                  <button type="submit" className="form-submit-btn" disabled={sending}>
                    {sending ? 'Enviando mensagem...' : 'Enviar mensagem'}
                  </button>
                </form>
              )}

              <div style={{
                marginTop: '20px',
                padding: '14px 16px',
                backgroundColor: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                fontSize: '13px',
                lineHeight: '1.5',
                color: '#0369a1'
              }}>
                <IconInfo size={20} style={{ color: '#0284c7', marginTop: '2px' }} />
                <div>
                  <strong>Atenção:</strong> Este formulário é destinado exclusivamente para comunicação direta com a escola sobre dúvidas ou assuntos diversos da unidade. <strong>Não utilize este formulário para se candidatar a vagas de emprego</strong> — para enviar seu currículo, acesse a nossa página de <Link href="/vagas" style={{ color: '#0284c7', fontWeight: 'bold', textDecoration: 'underline' }}>Trabalhe Conosco / Vagas</Link>.
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
