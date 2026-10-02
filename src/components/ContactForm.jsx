'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { enviarMensagemUnidade } from '@/lib/api';
import { formatPhone, isValidEmail } from '@/lib/formatters';
import { IconCheckCircle, IconInfo } from '@/components/Icons';

export default function ContactForm({ unitTitle = 'SOBEI' }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handlePhoneChange = (e) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!isValidEmail(email)) {
      setSubmitError('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setSubmitError('Por favor, informe um número de telefone com DDD válido (pelo menos 10 dígitos).');
      return;
    }

    setSending(true);

    const payload = {
      unidade: unitTitle,
      nomeCompleto: fullName.trim(),
      email: email.trim(),
      telefone: phone.trim(),
      mensagem: message.trim()
    };

    const res = await enviarMensagemUnidade(payload);
    if (res.success) {
      setSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } else {
      setSubmitError(res.message || 'Erro ao enviar mensagem. Tente novamente em instantes.');
    }
    setSending(false);
  };

  return (
    <div className="unit-detail__contact-section">
      <h3 className="unit-detail__section-title">Entre em contato</h3>

      {submitted ? (
        <div 
          style={{ 
            padding: '24px', 
            textAlign: 'center',
            color: '#166534'
          }}
          role="status"
          aria-live="polite"
        >
          <IconCheckCircle size={36} style={{ color: '#166534' }} />
          <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Mensagem enviada com sucesso!</h4>
          <p style={{ fontSize: '14px', lineHeight: '1.5', margin: '0 0 16px 0' }}>
            Sua mensagem foi registrada e direcionada à coordenação de <strong>{unitTitle}</strong>.
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
        <form className="unit-detail__contact-form" onSubmit={handleSubmit} noValidate>
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
              disabled={sending}
              autoComplete="name"
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
              disabled={sending}
              autoComplete="email"
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
              onChange={handlePhoneChange}
              required
              disabled={sending}
              autoComplete="tel"
            />
          </div>
          <div className="form-group form-group--full">
            <label htmlFor="message" className="form-label">Mensagem *</label>
            <textarea
              id="message"
              className="form-textarea"
              placeholder="Escreva sua mensagem ou dúvida..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={sending}
              rows={4}
            />
          </div>

          {submitError && (
            <div 
              style={{ color: '#ef4444', fontSize: '14px', marginBottom: '12px' }}
              role="alert"
              aria-live="assertive"
            >
              {submitError}
            </div>
          )}

          <button 
            type="submit" 
            className="form-submit-btn" 
            disabled={sending}
            aria-busy={sending}
          >
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
          <strong style={{ color: '#dc2626' }}>Atenção:</strong> Este formulário pode ser utilizado para comunicação com a equipe da unidade ou tirar dúvidas. <strong>Não utilize este formulário para candidatar-se a vagas de emprego</strong> — para enviar seu currículo profissional, acesse a nossa página de <Link href="/vagas" style={{ color: '#000000', fontWeight: 'bold', textDecoration: 'underline' }}>Trabalhe Conosco / Vagas</Link>.
        </div>
      </div>
    </div>
  );
}
