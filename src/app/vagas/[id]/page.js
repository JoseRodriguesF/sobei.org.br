'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchVagaPublica, enviarCandidatura } from '@/lib/api';
import Link from 'next/link';
import { IconMapPin, IconBriefcase } from '@/components/Icons';

import { formatPhone, isValidEmail } from '@/lib/formatters';

const MODALIDADE_LABELS = {
  presencial: 'Presencial',
  hibrido: 'Híbrido',
  remoto: 'Remoto',
};

const CONTRATO_LABELS = {
  clt: 'CLT',
  estagio: 'Estágio',
  pj: 'PJ',
  temporario: 'Temporário',
};

export default function VagaDetalhePage() {
  const params = useParams();
  const id = params ? parseInt(params.id) : null;

  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    lgpdConsent: false
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    async function loadVaga() {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = await fetchVagaPublica(id);
      if (!data) {
        setNotFound(true);
      } else {
        setVaga(data);
      }
      setLoading(false);
    }
    loadVaga();
  }, [id]);

  if (loading) {
    return (
      <div className="vagas-not-found container" role="status" aria-live="polite">
        <p>Carregando informações da vaga...</p>
      </div>
    );
  }

  if (notFound || !vaga) {
    return (
      <div className="vagas-not-found container" role="alert">
        <h2>Vaga não encontrada</h2>
        <p>A vaga que você está procurando não existe ou já foi preenchida.</p>
        <Link href="/vagas" className="vaga-detail__back-link">
          Voltar para vagas
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = name === 'phone' ? formatPhone(value) : (type === 'checkbox' ? checked : value);
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'O arquivo não deve exceder 5MB' }));
        setSelectedFile(null);
      } else if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setErrors(prev => ({ ...prev, file: 'Apenas arquivos PDF, DOC ou DOCX são aceitos' }));
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
        setErrors(prev => ({ ...prev, file: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Nome completo é obrigatório';
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Insira um e-mail válido';
    }
    
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Telefone incompleto (informe o DDD e número)';
    }

    if (!selectedFile) {
      newErrors.file = 'Currículo em formato PDF/Word é obrigatório';
    }

    if (!formData.lgpdConsent) {
      newErrors.lgpdConsent = 'É necessário concordar com os termos da LGPD para enviar seu currículo';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    // Build FormData for multipart upload
    const multipartData = new FormData();
    multipartData.append('nomeCompleto', formData.name.trim());
    multipartData.append('email', formData.email.trim());
    multipartData.append('telefone', formData.phone.trim());
    if (formData.message.trim()) {
      multipartData.append('cartaApresentacao', formData.message.trim());
    }
    multipartData.append('curriculo', selectedFile);

    const result = await enviarCandidatura(vaga.id, multipartData);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitSuccess(true);
    } else {
      setSubmitError(result.message || 'Erro ao enviar candidatura. Tente novamente.');
    }
  };

  const jobPostingSchema = vaga ? {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": vaga.titulo,
    "description": vaga.descricao || vaga.titulo,
    "datePosted": vaga.createdAt ? new Date(vaga.createdAt).toISOString() : new Date().toISOString(),
    "employmentType": vaga.regime === 'clt' ? 'FULL_TIME' : vaga.regime === 'estagio' ? 'INTERN' : 'OTHER',
    "hiringOrganization": {
      "@type": "Organization",
      "name": "SOBEI - Sociedade Beneficente Equilíbrio de Interlagos",
      "sameAs": "https://sobei.org.br",
      "logo": "https://sobei.org.br/images/LOGO%20BRANCO.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": vaga.unidade || "Av. Rubens Montanaro de Borba, 477",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "addressCountry": "BR"
      }
    }
  } : null;

  return (
    <div className="vaga-detail-page">
      {jobPostingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
        />
      )}

      {/* Dynamic Hero Section */}
      <section className="vaga-hero">
        <div className="container">
          <Link href="/vagas" className="vaga-hero__back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Voltar para vagas
          </Link>
          <div className="vaga-hero__info">
            <h1 className="vaga-hero__title" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              {vaga.titulo}
              {vaga.status === 'em_selecao' && (
                <span className="vaga-badge vaga-badge--selecao" style={{ fontSize: '12px', padding: '4px 12px', margin: 0 }}>Em Seleção</span>
              )}
              {vaga.status === 'fechado' && (
                <span className="vaga-badge vaga-badge--fechado" style={{ fontSize: '12px', padding: '4px 12px', margin: 0 }}>Preenchida</span>
              )}
            </h1>
            <div className="vaga-hero__meta">
              <span><IconMapPin size={16} /> {vaga.unidade}</span>
              <span><IconBriefcase size={16} /> {MODALIDADE_LABELS[vaga.modalidade] || vaga.modalidade} ({CONTRATO_LABELS[vaga.tipoContrato] || vaga.tipoContrato})</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details and Form */}
      <section className="container vaga-detail-container">
        <div className="vaga-detail-grid">
          
          {/* Details Column */}
          <div className="vaga-info-col">
            <div className="vaga-card">
              <h2 className="vaga-card__title">Descrição da Vaga</h2>
              <p className="vaga-card__text" style={{ whiteSpace: 'pre-wrap' }}>{vaga.descricao}</p>
              
              <h3 className="vaga-card__subtitle">Requisitos e Qualificações</h3>
              <p className="vaga-card__text" style={{ whiteSpace: 'pre-wrap' }}>{vaga.requisitos}</p>

              {vaga.beneficios && (
                <>
                  <h3 className="vaga-card__subtitle">Benefícios oferecidos</h3>
                  <p className="vaga-card__text" style={{ whiteSpace: 'pre-wrap' }}>{vaga.beneficios}</p>
                </>
              )}
            </div>
          </div>

          {/* Form Column */}
          <div className="vaga-form-col">
            {vaga.status === 'ativo' ? (
              <div className="vaga-form-card">
                {!submitSuccess ? (
                  <>
                    <h2 className="vaga-form-card__title">Candidatar-se a esta vaga</h2>
                    <p className="vaga-form-card__subtitle">Preencha os dados abaixo e anexe seu currículo para iniciar o processo seletivo.</p>
                    
                    <form onSubmit={handleSubmit} className="vaga-form" noValidate>
                      {/* Name */}
                      <div className="form-group">
                        <label className="form-group__label">Nome Completo *</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-group__input"
                          placeholder="Seu nome completo"
                          disabled={isSubmitting}
                          autoComplete="name"
                        />
                        {errors.name && <span className="form-group__error">{errors.name}</span>}
                      </div>

                      {/* Email */}
                      <div className="form-group">
                        <label className="form-group__label">E-mail *</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-group__input"
                          placeholder="exemplo@email.com"
                          disabled={isSubmitting}
                          autoComplete="email"
                        />
                        {errors.email && <span className="form-group__error">{errors.email}</span>}
                      </div>

                      {/* Phone */}
                      <div className="form-group">
                        <label className="form-group__label">Telefone / WhatsApp *</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-group__input"
                          placeholder="(11) 99999-9999"
                          disabled={isSubmitting}
                          autoComplete="tel"
                        />
                        {errors.phone && <span className="form-group__error">{errors.phone}</span>}
                      </div>

                      {/* File CV */}
                      <div className="form-group">
                        <label className="form-group__label">Currículo (PDF, DOC ou DOCX) *</label>
                        <div className="file-upload">
                          <input 
                            type="file" 
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="file-upload__input"
                            disabled={isSubmitting}
                          />
                          <div className="file-upload__icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="17 8 12 3 7 8"/>
                              <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                          </div>
                          <div className="file-upload__text">
                            {selectedFile ? selectedFile.name : 'Anexe seu arquivo de currículo'}
                          </div>
                          <div className="file-upload__subtext">
                            PDF ou Word de até 5MB
                          </div>
                        </div>
                        {errors.file && <span className="form-group__error">{errors.file}</span>}
                      </div>

                      {/* Message */}
                      <div className="form-group">
                        <label className="form-group__label">Carta de Apresentação (Opcional)</label>
                        <textarea 
                          name="message" 
                          value={formData.message}
                          onChange={handleInputChange}
                          className="form-group__textarea"
                          placeholder="Conte um pouco sobre sua trajetória..."
                          disabled={isSubmitting}
                          rows={4}
                        ></textarea>
                      </div>

                      {/* LGPD Consent */}
                      <div className="form-group" style={{ marginTop: '4px' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12.5px', color: '#4b5563', cursor: 'pointer', lineHeight: '1.4' }}>
                          <input
                            type="checkbox"
                            name="lgpdConsent"
                            checked={formData.lgpdConsent}
                            onChange={handleInputChange}
                            style={{ marginTop: '2px', accentColor: '#1B1464' }}
                            disabled={isSubmitting}
                          />
                          <span>
                            Concordo com o tratamento dos meus dados pessoais pela SOBEI exclusivamente para fins deste processo seletivo, em conformidade com a <strong>LGPD (Lei Geral de Proteção de Dados)</strong>.
                          </span>
                        </label>
                        {errors.lgpdConsent && <span className="form-group__error">{errors.lgpdConsent}</span>}
                      </div>

                      {submitError && (
                        <div className="form-group__error" style={{ textAlign: 'center' }} role="alert" aria-live="assertive">
                          {submitError}
                        </div>
                      )}

                      {/* Submit */}
                      <button 
                        type="submit" 
                        className="vaga-form__submit-btn"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                      >
                        {isSubmitting ? 'Enviando candidatura...' : 'Enviar Candidatura'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="vaga-success-card" role="status" aria-live="polite">
                    <div className="vaga-success-card__icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="vaga-success-card__title">Inscrição Enviada!</h3>
                    <p className="vaga-success-card__text">
                      Sua candidatura para a vaga de <strong>{vaga.titulo}</strong> foi cadastrada com sucesso. 
                    </p>
                    <p className="vaga-success-card__subtext">
                      Nosso setor de Recursos Humanos revisará as informações enviadas. Fique atento ao seu e-mail e telefone para os próximos passos.
                    </p>
                    <Link href="/vagas" className="vaga-success-card__btn">
                      Ver outras vagas
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="vaga-status-notice-container" role="status">
                {vaga.status === 'em_selecao' ? (
                  <div className="vaga-status-notice vaga-status-notice--selecao">
                    <div className="vaga-status-notice__icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <h3 className="vaga-status-notice__title">Vaga em Seleção</h3>
                    <p className="vaga-status-notice__text">
                      Esta vaga está atualmente na etapa de <strong>Seleção e Análise Curricular</strong>.
                    </p>
                    <p className="vaga-status-notice__subtext">
                      Agradecemos a todos que enviaram seus currículos. No momento, o recebimento de novas candidaturas está suspenso para esta vaga.
                    </p>
                    <Link href="/vagas" className="vaga-status-notice__btn">
                      Ver outras vagas
                    </Link>
                  </div>
                ) : (
                  <div className="vaga-status-notice vaga-status-notice--fechado">
                    <div className="vaga-status-notice__icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="vaga-status-notice__title">Vaga Preenchida</h3>
                    <p className="vaga-status-notice__text">
                      Esta vaga foi <strong>preenchida com sucesso</strong> e o processo seletivo está encerrado.
                    </p>
                    <p className="vaga-status-notice__subtext">
                      Agradecemos a participação de todos os candidatos. Fique atento para novas oportunidades no futuro.
                    </p>
                    <Link href="/vagas" className="vaga-status-notice__btn">
                      Ver outras vagas
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
