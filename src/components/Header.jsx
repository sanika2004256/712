import React from 'react';
import { Sparkles, Shield, Globe2, HeartHandshake } from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  lang, 
  setLang,
  totalApplicationsCount = 0 
}) {
  const isMr = lang === 'mr';

  return (
    <header className="app-header sweet-header">
      <div className="header-container">
        {/* Brand Logo & Title */}
        <div 
          className="brand-wrapper" 
          onClick={() => setCurrentTab('apply')} 
          style={{ cursor: 'pointer' }}
        >
          <div className="brand-emblem-sweet">
            <span className="emblem-heart">🌸</span>
          </div>
          <div className="brand-info">
            <div className="brand-badge-sweet">
              <Sparkles size={11} className="inline mr-1 text-rose-200" />
              <span>{isMr ? 'महिला सक्षमीकरण अभियान' : 'Women Empowerment'}</span>
            </div>
            <h1 className="brand-title-sweet">
              {isMr ? 'अस्तित्व सॅनिटरी पॅड' : 'Astitva Sanitary Pads'}
              <span className="brand-tag-franchise">{isMr ? 'फ्रँचायझी' : 'Franchise'}</span>
            </h1>
            <p className="brand-subtitle-sweet hide-on-small-mobile">
              {isMr 
                ? 'गावोगावी सॅनिटरी पॅड पोहोचवणारे अधिकृत नेटवर्क' 
                : 'Official Sanitary Pad Franchise Network'}
            </p>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="header-actions">
          {/* Desktop Only Apply Button */}
          <button 
            type="button" 
            className={`sweet-nav-btn hide-on-mobile ${currentTab === 'apply' ? 'active' : ''}`}
            onClick={() => setCurrentTab('apply')}
          >
            <HeartHandshake size={15} />
            <span>{isMr ? 'फ्रँचायझी अर्ज' : 'Apply'}</span>
          </button>

          {/* Desktop Only Admin Panel Button */}
          <button 
            type="button" 
            className={`sweet-nav-btn admin-pill hide-on-mobile ${currentTab === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentTab('admin')}
          >
            <Shield size={15} />
            <span>{isMr ? 'ॲडमिन पॅनेल' : 'Admin'}</span>
            {totalApplicationsCount > 0 && (
              <span className="admin-count-badge">{totalApplicationsCount}</span>
            )}
          </button>

          {/* Language Toggle */}
          <button 
            type="button" 
            className="action-pill-btn lang-btn-sweet"
            onClick={() => setLang(isMr ? 'en' : 'mr')}
            title={isMr ? 'Switch to English' : 'मराठीमध्ये बदला'}
          >
            <Globe2 size={14} />
            <span>{isMr ? 'EN' : 'मराठी'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
