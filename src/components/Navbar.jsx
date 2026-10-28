import React, { useState } from 'react';
import InodayamLogo from './InodayamLogo';
import { Menu, X, Shield, Globe2, ArrowRight } from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  lang, 
  setLang,
  totalApplicationsCount = 0,
  onScrollToForm 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMr = lang === 'mr';

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (currentTab !== 'landing') {
      setCurrentTab('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="site-navbar">
      <div className="navbar-container">
        {/* Left: Brand Logo */}
        <div 
          className="navbar-brand-clickable" 
          onClick={() => {
            setCurrentTab('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="Inodayam Tech Private Limited"
        >
          <InodayamLogo variant="full" size={44} />
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="navbar-links-desktop">
          <button 
            type="button" 
            className="nav-link-btn"
            onClick={() => handleNavClick('hero')}
          >
            {isMr ? 'मुख्य पृष्ठ' : 'Home'}
          </button>
          <button 
            type="button" 
            className="nav-link-btn"
            onClick={() => handleNavClick('benefits')}
          >
            {isMr ? 'फायदे' : 'Benefits'}
          </button>
          <button 
            type="button" 
            className="nav-link-btn"
            onClick={() => handleNavClick('calculator')}
          >
            {isMr ? 'उत्पन्न कॅल्क्युलेटर' : 'Calculator'}
          </button>
          <button 
            type="button" 
            className="nav-link-btn"
            onClick={() => handleNavClick('services')}
          >
            {isMr ? 'प्रमुख सेवा' : 'Services'}
          </button>
          <button 
            type="button" 
            className="nav-link-btn"
            onClick={() => handleNavClick('register')}
          >
            {isMr ? 'नोंदणी अर्ज' : 'Apply'}
          </button>
        </div>

        {/* Right: Desktop Action Buttons */}
        <div className="navbar-actions-desktop">
          {/* Language Switcher */}
          <button 
            type="button" 
            className="nav-action-pill-btn lang-btn"
            onClick={() => setLang(isMr ? 'en' : 'mr')}
            title={isMr ? 'Switch to English' : 'मराठीत पहा'}
          >
            <Globe2 size={15} className="text-sky-600" />
            <span>{isMr ? 'English' : 'मराठी'}</span>
          </button>

          {/* Admin Switch */}
          <button 
            type="button" 
            className={`nav-action-pill-btn admin-btn ${currentTab === 'admin' ? 'active-admin' : ''}`}
            onClick={() => {
              setCurrentTab(currentTab === 'admin' ? 'landing' : 'admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="Admin Dashboard"
          >
            <Shield size={15} />
            <span>{isMr ? 'प्रशासक' : 'Admin'}</span>
            {totalApplicationsCount > 0 && (
              <span className="nav-admin-badge">{totalApplicationsCount}</span>
            )}
          </button>

          {/* Apply Now Primary CTA */}
          <button 
            type="button" 
            className="nav-primary-apply-btn"
            onClick={onScrollToForm}
          >
            <span>{isMr ? 'गाव प्रतिनिधी बना' : 'Become Representative'}</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle (strictly hidden on desktop > 960px) */}
        <button 
          type="button" 
          className="mobile-hamburger-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer (Only displays when hamburger clicked) */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer-menu">
          <button 
            type="button" 
            className="mobile-nav-item"
            onClick={() => handleNavClick('hero')}
          >
            {isMr ? 'मुख्य पृष्ठ (Home)' : 'Home'}
          </button>
          <button 
            type="button" 
            className="mobile-nav-item"
            onClick={() => handleNavClick('benefits')}
          >
            {isMr ? 'गाव प्रतिनिधीचे फायदे' : 'Benefits'}
          </button>
          <button 
            type="button" 
            className="mobile-nav-item"
            onClick={() => handleNavClick('calculator')}
          >
            {isMr ? 'उत्पन्न कॅल्क्युलेटर 📊' : 'Income Calculator 📊'}
          </button>
          <button 
            type="button" 
            className="mobile-nav-item"
            onClick={() => handleNavClick('services')}
          >
            {isMr ? 'आमच्या प्रमुख सेवा' : 'Our Services'}
          </button>
          <button 
            type="button" 
            className="mobile-nav-item"
            onClick={() => handleNavClick('register')}
          >
            {isMr ? 'नोंदणी अर्ज करा (Apply Now)' : 'Apply Now'}
          </button>

          <div className="mobile-nav-footer-row">
            <button 
              type="button" 
              className="mobile-sub-btn"
              onClick={() => {
                setLang(isMr ? 'en' : 'mr');
                setMobileMenuOpen(false);
              }}
            >
              <Globe2 size={16} />
              <span>{isMr ? 'Switch to English' : 'मराठीत पहा'}</span>
            </button>

            <button 
              type="button" 
              className="mobile-sub-btn admin-highlight"
              onClick={() => {
                setCurrentTab(currentTab === 'admin' ? 'landing' : 'admin');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Shield size={16} />
              <span>{isMr ? 'ॲडमिन' : 'Admin'} ({totalApplicationsCount})</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
