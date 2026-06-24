'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { jobsData } from '@/lib/data';
import Link from 'next/link';

export default function VagaDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const id = params ? parseInt(params.id) : null;

  // Find job details
  const job = jobsData.find(j => j.id === id);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!job) {
    return (
      <div className="vagas-not-found container">
        <h2>Vaga não encontrada</h2>
        <p>A vaga que você está procurando não existe ou já foi preenchida.</p>
        <Link href="/vagas" className="vaga-detail__back-link">
          Voltar para vagas
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Nome completo é obrigatório';
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Insira um e-mail válido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Telefone inválido (Ex: 11 99999-9999)';
    }

    if (!selectedFile) {
      newErrors.file = 'Currículo em formato PDF/Word é obrigatório';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  const unitName = job.location.split(' (')[0].replace('Unidade ', '');

  return (
    <div className="vaga-detail-page">
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
            <span className="vaga-hero__dept">{job.department}</span>
            <h1 className="vaga-hero__title">{job.title}</h1>
            <div className="vaga-hero__meta">
              <span>📍 {unitName}</span>
              <span>💼 {job.model} ({job.type})</span>
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
              <p className="vaga-card__text">{job.description}</p>
              
              <h3 className="vaga-card__subtitle">Requisitos e Qualificações</h3>
              <ul className="vaga-card__list">
                {job.requirements.map((req, i) => (
                  <li key={i} className="vaga-card__list-item">{req}</li>
                ))}
              </ul>

              <h3 className="vaga-card__subtitle">Benefícios oferecidos</h3>
              <p className="vaga-card__text">{job.benefits}</p>
            </div>
          </div>

          {/* Form Column */}
          <div className="vaga-form-col">
            <div className="vaga-form-card">
              {!submitSuccess ? (
                <>
                  <h2 className="vaga-form-card__title">Candidatar-se a esta vaga</h2>
                  <p className="vaga-form-card__subtitle">Preencha os dados abaixo e anexe seu currículo para iniciar o processo seletivo.</p>
                  
                  <form onSubmit={handleSubmit} className="vaga-form">
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
                      />
                      {errors.email && <span className="form-group__error">{errors.email}</span>}
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                      <label className="form-group__label">Telefone *</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-group__input"
                        placeholder="(11) 99999-9999"
                        disabled={isSubmitting}
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

                    {/* Submit */}
                    <button 
                      type="submit" 
                      className="vaga-form__submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Candidatura'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="vaga-success-card">
                  <div className="vaga-success-card__icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="vaga-success-card__title">Inscrição Enviada!</h3>
                  <p className="vaga-success-card__text">
                    Sua candidatura para a vaga de <strong>{job.title}</strong> foi cadastrada com sucesso. 
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
          </div>

        </div>
      </section>
    </div>
  );
}
