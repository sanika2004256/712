import React, { useState, useMemo } from 'react';
import { Search, MapPin, ChevronRight, Layers, Check } from 'lucide-react';

const DIVISIONS = [
  { id: 'all', en: 'All Divisions', mr: 'सर्व विभाग' },
  { id: 'Pune', en: 'Pune', mr: 'पुणे विभाग' },
  { id: 'Konkan', en: 'Konkan', mr: 'कोकण विभाग' },
  { id: 'Nashik', en: 'Nashik', mr: 'नाशिक विभाग' },
  { id: 'Chhatrapati Sambhajinagar', en: 'Chh. Sambhajinagar', mr: 'छ. संभाजीनगर' },
  { id: 'Amravati', en: 'Amravati', mr: 'अमरावती विभाग' },
  { id: 'Nagpur', en: 'Nagpur', mr: 'नागपूर विभाग' },
];

export default function DistrictSelector({ 
  districts, 
  selectedDistrict, 
  onSelectDistrict, 
  lang 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('all');

  const isMr = lang === 'mr';

  const filteredDistricts = useMemo(() => {
    return districts.filter(d => {
      // Division filter
      if (selectedDivision !== 'all') {
        if (d.division.en !== selectedDivision && d.division.mr !== selectedDivision) {
          return false;
        }
      }

      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchEn = d.en.toLowerCase().includes(query);
        const matchMr = d.mr.includes(query);
        const matchDivEn = d.division.en.toLowerCase().includes(query);
        const matchDivMr = d.division.mr.includes(query);
        return matchEn || matchMr || matchDivEn || matchDivMr;
      }

      return true;
    });
  }, [districts, selectedDivision, searchTerm]);

  return (
    <div className="selector-card">
      <div className="selector-header">
        <div className="header-titles">
          <div className="section-badge">
            <span className="badge-num">पायरी १</span>
            <span className="badge-text">{isMr ? 'महाराष्ट्र राज्य' : 'Maharashtra State'}</span>
          </div>
          <h2 className="section-title">
            {isMr ? 'जिल्हा निवडा (Select District)' : 'Select District (जिल्हा निवडा)'}
          </h2>
          <p className="section-desc">
            {isMr 
              ? 'महाराष्ट्रातील ३६ महसूल जिल्ह्यांपैकी तुमचा जिल्हा निवडा.' 
              : 'Choose your district from all 36 revenue districts of Maharashtra.'}
          </p>
        </div>

        {/* Live Search Input */}
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder={isMr ? 'जिल्ह्याचे नाव शोधा (उदा. पुणे, सातारा, नाशिक...)' : 'Search district (e.g. Pune, Satara, Nashik...)'}
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

      {/* Division Filter Pills */}
      <div className="division-filters">
        <div className="division-filters-scroll">
          {DIVISIONS.map(div => {
            const isActive = selectedDivision === div.id;
            return (
              <button
                key={div.id}
                type="button"
                className={`division-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedDivision(div.id)}
              >
                <Layers size={13} className="mr-1 inline" />
                {isMr ? div.mr : div.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="results-meta">
        <span>
          {isMr 
            ? `एकूण उपलब्ध जिल्हे: ${filteredDistricts.length}` 
            : `Available Districts: ${filteredDistricts.length}`}
        </span>
      </div>

      {/* Districts Grid */}
      <div className="districts-grid">
        {filteredDistricts.map(dist => {
          const isSelected = selectedDistrict?.id === dist.id;

          return (
            <div
              key={dist.id}
              className={`district-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectDistrict(dist)}
            >
              <div className="card-top">
                <div className="district-pin-icon">
                  <MapPin size={18} />
                </div>
                <span className="division-tag">
                  {isMr ? dist.division.mr : dist.division.en}
                </span>
                {isSelected && (
                  <span className="selected-check">
                    <Check size={14} />
                  </span>
                )}
              </div>

              <div className="card-body">
                <h3 className="district-name-mr">{dist.mr}</h3>
                <span className="district-name-en">{dist.en}</span>
              </div>

              <div className="card-footer">
                <span className="meta-badge">
                  {dist.talukaCount} {isMr ? 'तालुके' : 'Talukas'}
                </span>
                <span className="meta-badge villages-badge">
                  {dist.villageCount.toLocaleString('en-IN')} {isMr ? 'गावे' : 'Villages'}
                </span>
                <ChevronRight size={16} className="card-arrow" />
              </div>
            </div>
          );
        })}

        {filteredDistricts.length === 0 && (
          <div className="no-results-box">
            <p className="no-results-text">
              {isMr 
                ? `"${searchTerm}" नावाचा कोणताही जिल्हा आढळला नाही.` 
                : `No district found matching "${searchTerm}".`}
            </p>
            <button 
              type="button" 
              className="reset-filter-btn"
              onClick={() => {
                setSearchTerm('');
                setSelectedDivision('all');
              }}
            >
              {isMr ? 'सर्व जिल्हे दाखवा' : 'Show All Districts'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
