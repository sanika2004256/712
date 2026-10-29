import React, { useState } from 'react';
import InodayamLogo from './InodayamLogo';
import { Menu, X, Globe2, ArrowRight, Shield } from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  lang, 
  setLang,
  totalApplicationsCount = 0,
  onApplyClick,
  onAdminClick
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMr = lang === 'mr';

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (currentTab !== 'landing') {
      setCurrentTab('landing');
      setTimeout(() => {
        if (sectionId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
    } else {
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleApplyTab = () => {
    setMobileMenuOpen(false);
    if (onApplyClick) onApplyClick();
  };

  const handleAdminTab = () => {
    setMobileMenuOpen(false);
    if (onAdminClick) {
      onAdminClick();
    } else {
      setCurrentTab('admin');
      window.scrollTo({ top: 0, behavior: 'instant' });
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
            className={`nav-link-btn ${currentTab === 'landing' ? 'active-nav-link' : ''}`}
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
            className={`nav-link-btn ${currentTab === 'apply' ? 'active-nav-link' : ''}`}
            onClick={handleApplyTab}
          >
            {isMr ? 'नोंदणी अर्ज (Apply)' : 'Apply Form'}
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

          {/* Apply Now Primary CTA */}
          <button 
            type="button" 
            className="nav-primary-apply-btn"
            onClick={handleApplyTab}
          >
            <span>{isMr ? 'गाव प्रतिनिधी बना' : 'Become Representative'}</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
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
            className="mobile-nav-item highlight-apply-mobile"
            onClick={handleApplyTab}
          >
            {isMr ? '📝 नोंदणी अर्ज करा (Apply Now)' : '📝 Apply Now'}
          </button>

          {/* Admin Panel Option for Mobile */}
          <button 
            type="button" 
            className="mobile-nav-item mobile-admin-menu-item"
            onClick={handleAdminTab}
          >
            <div className="flex items-center gap-2">
              <Shield size={17} className="text-emerald-700" />
              <span>{isMr ? '🔐 ॲडमिन पॅनेल (Admin Panel)' : '🔐 Admin Panel'}</span>
            </div>
            {totalApplicationsCount > 0 && (
              <span className="mobile-admin-count-badge">{totalApplicationsCount}</span>
            )}
          </button>

          <div className="mobile-nav-footer-row">
            <button 
              type="button" 
              className="mobile-sub-btn"
              onClick={() => {
                setLang(isMr ? 'en' : 'mr');
                setMobileMenuOpen(false);
              }}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Globe2 size={16} />
              <span>{isMr ? 'Switch to English' : 'मराठीत पहा'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
