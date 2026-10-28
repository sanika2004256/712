import React, { useState, useMemo } from 'react';
import { Search, Home, Check, ArrowLeft, Loader2, Compass } from 'lucide-react';

export default function VillageSelector({ 
  district, 
  taluka, 
  villages, 
  isLoading, 
  selectedVillage, 
  onSelectVillage, 
  onChangeTaluka, 
  lang 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLetter, setActiveLetter] = useState('ALL');

  const isMr = lang === 'mr';

  // Compute available first letters for quick jumping
  const letters = useMemo(() => {
    if (!villages || villages.length === 0) return [];
    const set = new Set();
    villages.forEach(v => {
      const firstChar = v.trim().charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        set.add(firstChar);
      }
    });
    return Array.from(set).sort();
  }, [villages]);

  // Filtered villages
  const filteredVillages = useMemo(() => {
    if (!villages) return [];

    return villages.filter(v => {
      // First letter filter
      if (activeLetter !== 'ALL') {
        if (!v.trim().toUpperCase().startsWith(activeLetter)) {
          return false;
        }
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        return v.toLowerCase().includes(query);
      }

      return true;
    });
  }, [villages, activeLetter, searchTerm]);

  return (
    <div className="selector-card">
      {/* Active District & Taluka Banner */}
      <div className="active-selection-banner">
        <div className="banner-info">
          <div className="banner-icon-box">
            <Compass size={20} />
          </div>
          <div>
            <span className="banner-sublabel">
              {isMr ? 'निवडलेला जिल्हा व तालुका' : 'Selected District & Taluka'}
            </span>
            <h3 className="banner-title">
              {isMr ? district.mr : district.en} <span className="banner-separator">›</span> {isMr ? taluka.mr : taluka.en}
            </h3>
          </div>
        </div>

        <button 
          type="button" 
          className="change-selection-btn"
          onClick={onChangeTaluka}
          title={isMr ? 'दुसरा तालुका निवडा' : 'Change Taluka'}
        >
          <ArrowLeft size={14} className="inline mr-1" />
          {isMr ? 'तालुका बदला' : 'Change Taluka'}
        </button>
      </div>

      <div className="selector-header">
        <div className="header-titles">
          <div className="section-badge">
            <span className="badge-num">पायरी ३</span>
            <span className="badge-text">{isMr ? 'गाव निवड' : 'Village Selection'}</span>
          </div>
          <h2 className="section-title">
            {isMr ? 'गाव निवडा (Select Village)' : 'Select Village (गाव निवडा)'}
          </h2>
          <p className="section-desc">
            {isMr 
              ? `${taluka.mr} तालुक्यातील एकूण ${villages?.length || 0} महसूल गावांपैकी तुमचे गाव निवडा.` 
              : `Select your revenue village from ${villages?.length || 0} villages in ${taluka.en}.`}
          </p>
        </div>

        {/* Live Search Input */}
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder={isMr ? 'गावाचे नाव शोधा (उदा. आळंदी, लोणी, वाघोली...)' : 'Search village name...'}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (activeLetter !== 'ALL') setActiveLetter('ALL');
            }}
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

      {/* Alphabet Quick Jump Bar */}
      {letters.length > 0 && (
        <div className="alphabet-bar-wrapper">
          <span className="alphabet-label">{isMr ? 'अक्षरानुसार शोधा:' : 'Jump to:'}</span>
          <div className="alphabet-bar">
            <button
              type="button"
              className={`letter-btn ${activeLetter === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveLetter('ALL')}
            >
              {isMr ? 'सर्व' : 'ALL'}
            </button>
            {letters.map(letter => (
              <button
                key={letter}
                type="button"
                className={`letter-btn ${activeLetter === letter ? 'active' : ''}`}
                onClick={() => {
                  setActiveLetter(letter);
                  setSearchTerm('');
                }}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="results-meta">
        <span>
          {isMr 
            ? `उपलब्ध गावे: ${filteredVillages.length} / ${villages?.length || 0}` 
            : `Showing Villages: ${filteredVillages.length} of ${villages?.length || 0}`}
        </span>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="loading-box">
          <Loader2 className="spinner-icon" size={32} />
          <p>{isMr ? 'गावांची यादी लोड होत आहे...' : 'Loading village database...'}</p>
        </div>
      ) : (
        /* Villages Grid */
        <div className="villages-grid">
          {filteredVillages.map(villageName => {
            const isSelected = selectedVillage === villageName;

            return (
              <div
                key={villageName}
                className={`village-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectVillage(villageName)}
              >
                <div className="village-icon-box">
                  <Home size={16} />
                </div>
                <div className="village-name-box">
                  <span className="village-name">{villageName}</span>
                </div>
                {isSelected && (
                  <span className="selected-check">
                    <Check size={14} />
                  </span>
                )}
              </div>
            );
          })}

          {filteredVillages.length === 0 && (
            <div className="no-results-box">
              <p className="no-results-text">
                {isMr 
                  ? `"${searchTerm || activeLetter}" नुसार कोणतेही गाव आढळले नाही.` 
                  : `No village found matching your criteria.`}
              </p>
              <button 
                type="button" 
                className="reset-filter-btn"
                onClick={() => {
                  setSearchTerm('');
                  setActiveLetter('ALL');
                }}
              >
                {isMr ? 'सर्व गावे दाखवा' : 'Show All Villages'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
