import React, { useState, useMemo } from 'react';
import { Search, Navigation, ChevronRight, Check, ArrowLeft, Building2 } from 'lucide-react';

export default function TalukaSelector({ 
  district, 
  talukas, 
  selectedTaluka, 
  onSelectTaluka, 
  onChangeDistrict, 
  lang 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const isMr = lang === 'mr';

  const filteredTalukas = useMemo(() => {
    if (!talukas) return [];
    if (!searchTerm.trim()) return talukas;

    const query = searchTerm.toLowerCase().trim();
    return talukas.filter(t => {
      const matchEn = t.en.toLowerCase().includes(query);
      const matchMr = t.mr.includes(query);
      return matchEn || matchMr;
    });
  }, [talukas, searchTerm]);

  return (
    <div className="selector-card">
      {/* Active District Banner */}
      <div className="active-selection-banner">
        <div className="banner-info">
          <div className="banner-icon-box">
            <Building2 size={20} />
          </div>
          <div>
            <span className="banner-sublabel">{isMr ? 'निवडलेला जिल्हा' : 'Selected District'}</span>
            <h3 className="banner-title">
              {isMr ? district.mr : district.en}
              <span className="banner-secondary-text">({isMr ? district.en : district.mr})</span>
            </h3>
          </div>
        </div>

        <button 
          type="button" 
          className="change-selection-btn"
          onClick={onChangeDistrict}
          title={isMr ? 'दुसरा जिल्हा निवडा' : 'Change District'}
        >
          <ArrowLeft size={14} className="inline mr-1" />
          {isMr ? 'जिल्हा बदला' : 'Change District'}
        </button>
      </div>

      <div className="selector-header">
        <div className="header-titles">
          <div className="section-badge">
            <span className="badge-num">पायरी २</span>
            <span className="badge-text">{isMr ? 'तालुका निवड' : 'Taluka Selection'}</span>
          </div>
          <h2 className="section-title">
            {isMr ? 'तालुका निवडा (Select Taluka)' : 'Select Taluka (तालुका निवडा)'}
          </h2>
          <p className="section-desc">
            {isMr 
              ? `${district.mr} जिल्ह्यातील एकूण ${talukas?.length || 0} तालुक्यांपैकी तुमचा तालुका निवडा.` 
              : `Choose your taluka from ${talukas?.length || 0} talukas in ${district.en}.`}
          </p>
        </div>

        {/* Live Search Input */}
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder={isMr ? 'तालुक्याचे नाव शोधा (उदा. हवेली, बारामती, कराड...)' : 'Search taluka (e.g. Haveli, Baramati...)'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              type="button" 
              className="clear-search-btn" 
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="results-meta">
        <span>
          {isMr 
            ? `उपलब्ध तालुके: ${filteredTalukas.length}` 
            : `Available Talukas: ${filteredTalukas.length}`}
        </span>
      </div>

      {/* Talukas Grid */}
      <div className="talukas-grid">
        {filteredTalukas.map(taluka => {
          const isSelected = selectedTaluka?.id === taluka.id;

          return (
            <div
              key={taluka.id}
              className={`taluka-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectTaluka(taluka)}
            >
              <div className="taluka-card-icon">
                <Navigation size={18} />
              </div>

              <div className="taluka-card-content">
                <h4 className="taluka-name-mr">{taluka.mr}</h4>
                <span className="taluka-name-en">{taluka.en}</span>
              </div>

              <div className="taluka-card-meta">
                <span className="villages-count-tag">
                  {taluka.villageCount} {isMr ? 'गावे' : 'Villages'}
                </span>
                {isSelected ? (
                  <span className="selected-check">
                    <Check size={14} />
                  </span>
                ) : (
                  <ChevronRight size={16} className="card-arrow" />
                )}
              </div>
            </div>
          );
        })}

        {filteredTalukas.length === 0 && (
          <div className="no-results-box">
            <p className="no-results-text">
              {isMr 
                ? `"${searchTerm}" नावाचा कोणताही तालुका आढळला नाही.` 
                : `No taluka found matching "${searchTerm}".`}
            </p>
            <button 
              type="button" 
              className="reset-filter-btn"
              onClick={() => setSearchTerm('')}
            >
              {isMr ? 'सर्व तालुके दाखवा' : 'Show All Talukas'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
