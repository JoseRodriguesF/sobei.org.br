'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { unitsData } from '@/lib/data';
import { fetchVagasPublicas } from '@/lib/api';
import Link from 'next/link';

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

export default function VagasPage() {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');

  useEffect(() => {
    async function loadVagas() {
      setLoading(true);
      const data = await fetchVagasPublicas();
      setVagas(data);
      setLoading(false);
    }
    loadVagas();
  }, []);

  // Get unique departments, units for filters
  const departments = useMemo(() => {
    return [...new Set(vagas.map(vaga => vaga.departamento).filter(Boolean))];
  }, [vagas]);

  const units = useMemo(() => {
    return Object.values(unitsData).map(unit => unit.name);
  }, []);

  // Filter logic
  const filteredVagas = useMemo(() => {
    return vagas.filter(vaga => {
      const matchesSearch = 
        (vaga.titulo || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (vaga.descricao || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDept = !selectedDept || vaga.departamento === selectedDept;
      
      const matchesUnit = !selectedUnit || (vaga.unidade || '').includes(selectedUnit.split(' ')[1] || selectedUnit);

      return matchesSearch && matchesDept && matchesUnit;
    });
  }, [vagas, searchQuery, selectedDept, selectedUnit]);

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
          <a href="#vagas-disponiveis" className="page-hero__btn">
            Confira nossas oportunidades
          </a>
        </div>
      </section>

      {/* Main Filter and Board Layout */}
      <section className="container" id="vagas-disponiveis">
        
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

        </div>

        {/* Section title & divider */}
        <h2 className="vagas-title-sec">Vagas disponíveis</h2>
        <hr className="vagas-divider" />

        {/* Jobs list board */}
        {loading ? (
          <div className="jobs-empty">Carregando vagas...</div>
        ) : (
          <div className="jobs-list">
            {filteredVagas.length > 0 ? (
              filteredVagas.map((vaga) => (
                <div className="job-card fade-in" key={vaga.id}>
                  
                  {/* Job metadata and info */}
                  <div className="job-card__info">
                    <h3 className="job-card__title">{vaga.titulo}</h3>
                    <span className="job-card__meta">Unidade: {vaga.unidade}</span>
                    <span className="job-card__submeta">
                      {vaga.departamento} • {MODALIDADE_LABELS[vaga.modalidade] || vaga.modalidade} ({CONTRATO_LABELS[vaga.tipoContrato] || vaga.tipoContrato})
                    </span>
                  </div>

                  {/* Apply button */}
                  <div className="job-card__action">
                    <Link 
                      href={`/vagas/${vaga.id}`}
                      className="job-card__btn"
                    >
                      Ver detalhes
                    </Link>
                  </div>

                </div>
              ))
            ) : (
              <div className="jobs-empty">
                Nenhuma vaga encontrada para os filtros selecionados.
              </div>
            )}
          </div>
        )}

      </section>
    </div>
  );
}
