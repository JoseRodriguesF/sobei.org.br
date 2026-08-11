'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import VacantImage from '@/components/VacantImage';
import Link from 'next/link';
import { projectsData } from '@/lib/data';
import { enviarMensagemUnidade } from '@/lib/api';
import { IconCheckCircle, IconInfo } from '@/components/Icons';

function ProjectsContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');
  const activeId = (queryId && projectsData[queryId]) ? queryId : 'ccinter';

  const project = projectsData[activeId] || projectsData['ccinter'];

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
      unidade: project.title,
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
              
              {submitted ? (
                <div style={{ 
                  padding: '24px', 
                  textAlign: 'center',
                  color: '#166534'
                }}>
                  <IconCheckCircle size={36} style={{ color: '#166534' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Mensagem enviada com sucesso!</h4>
                  <p style={{ fontSize: '14px', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                    Sua mensagem foi registrada e direcionada à coordenação do projeto <strong>{project.title}</strong>.
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
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                fontSize: '13px',
                lineHeight: '1.5',
                color: '#000000'
              }}>
                <IconInfo size={20} style={{ color: '#dc2626', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#dc2626' }}>Atenção:</strong> Este formulário pode ser utilizado para comunicação com a equipe do projeto ou tirar dúvidas. <strong>Não utilize este formulário para candidatar-se a vagas de emprego</strong> — para enviar seu currículo profissional, acesse a nossa página de <Link href="/vagas" style={{ color: '#000000', fontWeight: 'bold', textDecoration: 'underline' }}>Trabalhe Conosco / Vagas</Link>.
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
