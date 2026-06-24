'use client';

import React, { useState, useMemo } from 'react';
import { jobsData, unitsData } from '@/lib/data';
import Link from 'next/link';

export default function VagasPage() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');

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

      return matchesSearch && matchesDept && matchesUnit;
    });
  }, [searchQuery, selectedDept, selectedUnit]);

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
                    <Link 
                      href={`/vagas/${job.id}`}
                      className="job-card__btn"
                    >
                      Ver detalhes
                    </Link>
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
    </div>
  );
}
