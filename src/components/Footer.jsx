import React from 'react';
import InodayamLogo from './InodayamLogo';
import { Heart, Phone, Mail, MapPin, Sparkles, Shield, ArrowUp, CheckCircle2 } from 'lucide-react';

export default function Footer({ lang, onAdminClick, onApplyClick, onHomeClick }) {
  const isMr = lang === 'mr';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (sectionId) => {
    if (onHomeClick) {
      onHomeClick(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer">
      {/* EXACT POSTER BOTTOM WAVE BANNER */}
      <div className="poster-bottom-wave-banner">
        <div className="section-container wave-banner-content">
          {/* Left Emblem & Slogan */}
          <div className="wave-left-slogan">
            <div className="sprout-icon-circle">
              <span className="text-xl">🌱</span>
            </div>
            <h3 className="wave-slogan-text">
              {isMr ? 'महिला सक्षम... तर गाव सक्षम !' : 'Empowered Women... Empowered Village!'}
            </h3>
          </div>

          {/* Right Inodayam Tech Private Limited with tagline */}
          <div className="wave-right-brand">
            <span className="wave-company-title">Inodayam Tech Private Limited</span>
            <span className="wave-company-tagline">
              🌱 {isMr ? 'डिजिटल माध्यमातून समृद्धीच्या दिशेने...' : 'Towards Prosperity Through Digital Platforms...'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="footer-main-body">
        <div className="section-container footer-grid">
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <InodayamLogo variant="white" size={48} />
            <p className="footer-desc-text mt-4">
              {isMr 
                ? 'महाराष्ट्रातील गावांमध्ये डिजिटल सेवा व सॅनिटरी पॅड वितरणाद्वारे महिला स्वावलंबन आणि स्थानिक रोजगारास चालना देणारे व्यासपीठ.' 
                : 'Empowering Maharashtra villages through localized entrepreneurship and women self-reliance.'}
            </p>
            <div className="footer-badge-tag mt-3">
              Digital Platform for a Better Tomorrow
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5 className="footer-col-title">{isMr ? 'महत्त्वाचे दुवे' : 'Quick Links'}</h5>
            <ul className="footer-links-list">
              <li>
                <button type="button" className="footer-nav-btn-link" onClick={() => handleLink('hero')}>
                  {isMr ? 'मुख्य पृष्ठ' : 'Home'}
                </button>
              </li>
              <li>
                <button type="button" className="footer-nav-btn-link" onClick={() => handleLink('benefits')}>
                  {isMr ? 'गाव प्रतिनिधीचे फायदे' : 'Benefits'}
                </button>
              </li>
              <li>
                <button type="button" className="footer-nav-btn-link" onClick={onApplyClick}>
                  {isMr ? 'नोंदणी अर्ज (Apply)' : 'Register Online'}
                </button>
              </li>
              <li>
                <button type="button" className="footer-admin-link" onClick={onAdminClick}>
                  <Shield size={13} className="inline mr-1 text-blue-400" />
                  <span>{isMr ? 'प्रशासक पॅनेल (Admin Panel)' : 'Admin Panel'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="footer-col">
            <h5 className="footer-col-title">{isMr ? 'प्रमुख सेवा' : 'Core Services'}</h5>
            <ul className="footer-links-list">
              <li><CheckCircle2 size={13} className="inline mr-1 text-blue-400" /> {isMr ? 'शाळा ERP व्यवस्थापन' : 'School ERP'}</li>
              <li><CheckCircle2 size={13} className="inline mr-1 text-blue-400" /> {isMr ? 'CET / JEE / NEET क्लासेस' : 'Online Coaching'}</li>
              <li><CheckCircle2 size={13} className="inline mr-1 text-blue-400" /> {isMr ? 'अस्तित्व रियल्टी (Property App)' : 'Astitva Realty'}</li>
              <li><CheckCircle2 size={13} className="inline mr-1 text-blue-400" /> {isMr ? 'फिल्मी अड्डा (Film Production App)' : 'Filmy Adda'}</li>
              <li><CheckCircle2 size={13} className="inline mr-1 text-blue-400" /> {isMr ? 'अस्तित्व मार्ट (Online Shopping & Pads)' : 'Astitva Mart'}</li>
              <li><CheckCircle2 size={13} className="inline mr-1 text-blue-400" /> {isMr ? 'इतर शासकीय डिजिटल सेवा' : 'Digital Services'}</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h5 className="footer-col-title">{isMr ? 'कंपनी संपर्क' : 'Contact Us'}</h5>
            <div className="footer-contact-info">
              <div className="contact-item">
                <MapPin size={16} className="text-pink-400 flex-shrink-0" />
                <span>Inodayam Tech Private Limited, महाराष्ट्र, भारत</span>
              </div>
              <div className="contact-item">
                <Phone size={16} className="text-emerald-400 flex-shrink-0" />
                <span>+91 98220 12345 / 88888 12345</span>
              </div>
              <div className="contact-item">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                <span>support@inodayamtech.com</span>
              </div>
            </div>
            <div className="footer-hours-box mt-3">
              <span className="text-xs text-slate-300">
                {isMr ? 'सपोर्ट वेळ: सकाळी ९ ते रात्री ८ (सोम - शनि)' : 'Support Hours: 9 AM - 8 PM (Mon - Sat)'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="section-container footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} Inodayam Tech Private Limited. All Rights Reserved.
          </p>
          <button 
            type="button" 
            className="scroll-to-top-btn"
            onClick={scrollToTop}
            title="Scroll to top"
          >
            <span>{isMr ? 'वर जा' : 'Back to Top'}</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
