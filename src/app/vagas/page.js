'use client';

import React, { useState, useMemo } from 'react';
import { jobsData, unitsData } from '@/lib/data';

export default function VagasPage() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  // Modal and Candidacy states
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  // Get unique departments, units for filters
  const departments = useMemo(() => {
    return [...new Set(jobsData.map(job => job.department))];
  }, []);

  const units = useMemo(() => {
    return Object.values(unitsData).map(unit => unit.name);
  }, []);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDept = !selectedDept || job.department === selectedDept;
      
      // Check if location string contains the selected unit name or matches
      const matchesUnit = !selectedUnit || job.location.includes(selectedUnit.split(' ')[1]);
      
      const matchesModel = !selectedModel || job.model === selectedModel;

      return matchesSearch && matchesDept && matchesUnit && matchesModel;
    });
  }, [searchQuery, selectedDept, selectedUnit, selectedModel]);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setSubmitSuccess(false);
    setErrors({});
    setSelectedFile(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setSelectedJob(null);
    }
  };

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

    // Simulate candidacy upload request
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  return (
    <div>
      {/* Page Hero */}
      <section className="page-hero page-hero--vagas">
        <div className="container">
          <span className="page-hero__pretitle">Venha fazer parte da</span>
          <h1 className="page-hero__maintitle">SOBEI</h1>
          <p className="page-hero__desc">
            Se você está procurando uma oportunidade de crescer conosco o lugar é aqui.
          </p>
        </div>
      </section>

      {/* Main Filter and Board Layout */}
      <section className="container">
        
        {/* Filters panel */}
        <div className="filter-bar">
          
          {/* Keyword Search */}
          <div className="filter-group">
            <label className="filter-group__label">Palavra-chave</label>
            <input 
              type="text" 
              placeholder="Buscar por cargo..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-group__input"
            />
          </div>

          {/* Department */}
          <div className="filter-group">
            <label className="filter-group__label">Área / Setor</label>
            <select 
              value={selectedDept} 
              onChange={(e) => setSelectedDept(e.target.value)}
              className="filter-group__select"
            >
              <option value="">Todas as áreas</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Unit / Location */}
          <div className="filter-group">
            <label className="filter-group__label">Unidade</label>
            <select 
              value={selectedUnit} 
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="filter-group__select"
            >
              <option value="">Todas as unidades</option>
              {units.map((unit, idx) => (
                <option key={idx} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          {/* Work Model */}
          <div className="filter-group">
            <label className="filter-group__label">Modelo de Trabalho</label>
            <select 
              value={selectedModel} 
              onChange={(e) => setSelectedModel(e.target.value)}
              className="filter-group__select"
            >
              <option value="">Todos os modelos</option>
              <option value="Presencial">Presencial</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Remoto">Remoto</option>
            </select>
          </div>

        </div>

        {/* Section title & divider */}
        <h2 className="vagas-title-sec">Vagas disponíveis</h2>
        <hr className="vagas-divider" />

        {/* Jobs list board */}
        <div className="jobs-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const unitName = job.location.split(' (')[0].replace('Unidade ', '');
              return (
                <div className="job-card fade-in" key={job.id}>
                  
                  {/* Job metadata and info */}
                  <div className="job-card__info">
                    <h3 className="job-card__title">{job.title}</h3>
                    <span className="job-card__meta">Unidade: {unitName}</span>
                    <span className="job-card__submeta">{job.department} • {job.model} ({job.type})</span>
                  </div>

                  {/* Apply button */}
                  <div className="job-card__action">
                    <button 
                      onClick={() => handleOpenModal(job)}
                      className="job-card__btn"
                    >
                      Ver detalhes
                    </button>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="jobs-empty">
              Nenhuma vaga encontrada para os filtros selecionados.
            </div>
          )}
        </div>

      </section>

      {/* --- Apply Modal Window --- */}
      {selectedJob && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">Detalhes da Vaga</h2>
              <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {!submitSuccess ? (
                <form onSubmit={handleSubmit}>
                  
                  {/* Job Details Card inside modal */}
                  <div className="modal-job-summary">
                    <h3 className="modal-job-summary__title">{selectedJob.title}</h3>
                    <div className="modal-job-summary__meta">
                      {selectedJob.department} • {selectedJob.location} • {selectedJob.model}
                    </div>
                    <div style={{ marginTop: '12px', fontSize: '14px', color: '#555' }}>
                      <p style={{ marginBottom: '8px' }}>{selectedJob.description}</p>
                      <strong style={{ display: 'block', margin: '12px 0 6px 0', color: 'var(--color-primary-light)' }}>Requisitos obrigatórios:</strong>
                      <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                        {selectedJob.requirements.map((req, i) => (
                          <li key={i} style={{ marginBottom: '4px' }}>{req}</li>
                        ))}
                      </ul>
                      <strong style={{ display: 'block', margin: '12px 0 6px 0', color: 'var(--color-primary-light)' }}>Benefícios:</strong>
                      <p>{selectedJob.benefits}</p>
                    </div>
                  </div>

                  <h3 className="detail-card__section-title" style={{ marginBottom: '1rem' }}>Formulário de Inscrição</h3>

                  {/* Name field */}
                  <div className="form-group">
                    <label className="form-group__label">Nome Completo *</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-group__input"
                      disabled={isSubmitting}
                    />
                    {errors.name && <span className="form-group__error">{errors.name}</span>}
                  </div>

                  {/* Email field */}
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

                  {/* Phone field */}
                  <div className="form-group">
                    <label className="form-group__label">Telefone *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-group__input"
                      placeholder="11 99999-9999"
                      disabled={isSubmitting}
                    />
                    {errors.phone && <span className="form-group__error">{errors.phone}</span>}
                  </div>

                  {/* CV File Upload field */}
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
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                      </div>
                      <div className="file-upload__text">
                        {selectedFile ? selectedFile.name : 'Selecione ou arraste seu arquivo de currículo'}
                      </div>
                      <div className="file-upload__subtext">
                        Tamanho máximo permitido: 5MB
                      </div>
                    </div>
                    {errors.file && <span className="form-group__error">{errors.file}</span>}
                  </div>

                  {/* Presentation Message field */}
                  <div className="form-group">
                    <label className="form-group__label">Mensagem de Apresentação (Opcional)</label>
                    <textarea 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-group__textarea"
                      placeholder="Fale um pouco sobre você e por que deseja trabalhar na SOBEI..."
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  {/* Actions buttons */}
                  <div className="modal-footer" style={{ borderTop: 'none', paddingRight: '0', paddingLeft: '0', paddingBottom: '0' }}>
                    <button 
                      type="button" 
                      onClick={handleCloseModal}
                      className="form-btn-cancel"
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="form-btn-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Candidatura'}
                    </button>
                  </div>

                </form>
              ) : (
                // Success candidacy state
                <div className="success-card">
                  <div className="success-card__icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="success-card__title">Candidatura Enviada!</h3>
                  <p className="success-card__text">
                    Sua inscrição para a vaga de <strong>{selectedJob.title}</strong> foi recebida com sucesso. 
                    Nossa equipe do setor de Recursos Humanos analisará seu currículo e entrará em contato em breve caso seu perfil atenda aos requisitos.
                  </p>
                  <button 
                    onClick={handleCloseModal} 
                    className="form-btn-submit"
                    style={{ marginTop: '1rem' }}
                  >
                    Fechar Janela
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
