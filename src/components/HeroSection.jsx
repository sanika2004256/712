import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Search,
  Award,
  Building2
} from 'lucide-react';

const REPRESENTATIVE_ROLES = [
  {
    id: 'empowerment',
    titleMr: 'स्वावलंबी महिला प्रतिनिधी',
    titleEn: 'Self-Reliant Village Leader',
    badgeMr: 'महिला सबलीकरण',
    icon: '👩‍💼',
    descMr: 'गावातच राहून स्वतःचा स्वाभिमानी व्यवसाय सांभाळा व दरमहा ₹12,000 - ₹15,000+ नियमित उत्पन्न मिळवा.',
    color: '#2563eb'
  },
  {
    id: 'health',
    titleMr: 'आरोग्य व सॅनिटरी सखी',
    titleEn: 'Health & Sanitary Sakhi',
    badgeMr: 'महिला आरोग्य',
    icon: '🌸',
    descMr: 'अस्तित्व सॅनिटरी पॅड्स व महिला आरोग्य उत्पादने गावातील प्रत्येक घरापर्यंत पोहोचवा.',
    color: '#0284c7'
  },
  {
    id: 'education',
    titleMr: 'शिक्षण समन्वयक',
    titleEn: 'Education Ambassador',
    badgeMr: 'डिजिटल शिक्षण',
    icon: '👩‍🏫',
    descMr: 'शाळा ERP व्यवस्थापन आणि CET / NEET ऑनलाईन क्लासेसचे गावातील विद्यार्थ्यांना मार्गदर्शन द्या.',
    color: '#059669'
  },
  {
    id: 'realty',
    titleMr: 'डिजिटल सेवा व मालमत्ता सल्लागार',
    titleEn: 'Digital & Realty Advisor',
    badgeMr: 'स्थानिक सेवा',
    icon: '🏡',
    descMr: 'शेतजमीन, घरे खरेदी-विक्री नोंदणी व इतर शासकीय डिजिटल सेवांचे गावातील केंद्र चालवा.',
    color: '#4f46e5'
  }
];

export default function HeroSection({ lang, onApplyClick }) {
  const isMr = lang === 'mr';
  const [activeRole, setActiveRole] = useState(0);

  return (
    <section className="hero-poster-style-section" id="hero">
      {/* Background Animated Ambient Glow Orbs */}
      <div className="hero-ambient-glow orb-blue" aria-hidden="true" />
      <div className="hero-ambient-glow orb-indigo" aria-hidden="true" />
      <div className="hero-ambient-glow orb-emerald" aria-hidden="true" />

      <div className="section-container relative-hero-content">
        {/* TOP ROW: Clean Professional Announcement Bar */}
        <div className="pro-hero-announcement-bar">
          <div className="pro-badge-official">
            <span className="pro-pulse-dot" />
            <span>{isMr ? 'इनोदयम टेक प्रा. लि. • अधिकृत गाव प्रतिनिधी मोहीम २०२६' : 'Inodayam Tech Pvt. Ltd. • Village Representative Drive 2026'}</span>
          </div>

          <div className="pro-badge-stat">
            <Building2 size={15} />
            <span>{isMr ? 'महाराष्ट्र: ४४,०००+ गावे' : 'Maharashtra: 44,000+ Villages'}</span>
          </div>
        </div>

        {/* 3 Clean Feature Pills */}
        <div className="poster-pillars-container">
          <div className="pro-pillar-pill">
            <CheckCircle2 size={14} className="pro-pillar-icon" />
            <span>{isMr ? '१ गाव १ प्रतिनिधी' : '1 Village 1 Rep'}</span>
          </div>
          <div className="pro-pillar-pill">
            <CheckCircle2 size={14} className="pro-pillar-icon" />
            <span>{isMr ? 'महिला स्वावलंबन' : 'Women Empowerment'}</span>
          </div>
          <div className="pro-pillar-pill">
            <CheckCircle2 size={14} className="pro-pillar-icon" />
            <span>{isMr ? '१००% मोफत प्रशिक्षण' : '100% Free Training'}</span>
          </div>
        </div>

        {/* MAIN HERO INTERACTIVE SHOWCASE */}
        <div className="poster-hero-main-grid">
          {/* Left Column: Headlines & Callout Cards */}
          <div className="poster-hero-left">
            <div className="pro-tag-badge">
              <Award size={15} />
              <span>{isMr ? 'अधिकृत गाव प्रतिनिधी नियुक्ती' : 'Official Village Representative'}</span>
            </div>

            {/* Clean Executive Heading */}
            <h1 className="poster-main-subheading">
              {isMr ? (
                <>
                  स्वतःचा व्यवसाय सुरू करा आणि <span className="text-pro-accent">आपल्या गावाचा विकास</span> साधा!
                </>
              ) : (
                'Start your own business and drive village development!'
              )}
            </h1>

            <p className="poster-subtext-para">
              {isMr 
                ? 'इनोदयम टेक (Inodayam Tech) सोबत आपल्या गावातच सुरू करा सॅनिटरी पॅड्स, डिजिटल सेवा, शाळा ERP आणि मालमत्ता सल्लागार केंद्र.' 
                : 'Empower your village with digital services, sanitary hygiene, education ERP, and real estate solutions with Inodayam Tech.'}
            </p>

            {/* Clean Professional Financial Offer Cards */}
            <div className="pro-offers-grid">
              {/* Card 1: Investment */}
              <div className="pro-offer-card pro-card-capital">
                <div className="pro-offer-header">
                  <div className="pro-offer-icon-wrap capital-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span className="pro-offer-label">{isMr ? 'किमान भांडवल' : 'Minimum Capital'}</span>
                    <div className="pro-offer-amount">
                      <span className="currency">₹</span>10,000
                    </div>
                  </div>
                </div>
                <p className="pro-offer-desc">
                  {isMr ? 'कमी गुंतवणुकीत खात्रीशीर सुरुवात' : 'Start with low investment'}
                </p>
              </div>

              {/* Card 2: Expected Monthly Income */}
              <div className="pro-offer-card pro-card-income">
                <div className="pro-offer-header">
                  <div className="pro-offer-icon-wrap income-icon">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <span className="pro-offer-label">{isMr ? 'अपेक्षित मासिक उत्पन्न' : 'Monthly Income'}</span>
                    <div className="pro-offer-amount text-emerald">
                      ₹12,000 – ₹15,000<span className="plus">+</span>
                    </div>
                  </div>
                </div>
                <p className="pro-offer-desc">
                  {isMr ? 'दरमहा थेट नियमित उत्पन्न' : 'Guaranteed regular monthly income'}
                </p>
              </div>
            </div>

            {/* Single Centered Animated Apply CTA Button */}
            <div className="hero-single-apply-wrapper">
              <button 
                type="button" 
                className="animated-hero-apply-btn"
                onClick={onApplyClick}
              >
                <span className="apply-btn-sparkle" aria-hidden="true">✨</span>
                <span className="apply-btn-text">Apply</span>
                <ArrowRight size={20} className="apply-btn-arrow" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Empowerment Hub */}
          <div className="poster-hero-right">
            <div className="interactive-empowerment-card">
              <div className="card-top-header">
                <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                  <div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#10b981'}} />
                  <span style={{fontSize:'0.78rem',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.05em',color:'#0f172a'}}>
                    {isMr ? '१ गाव • १ प्रतिनिधी' : '1 Village • 1 Representative'}
                  </span>
                </div>
                <span style={{fontSize:'0.75rem',background:'#f1f5f9',color:'#334155',fontWeight:'700',padding:'0.25rem 0.65rem',borderRadius:'9999px',border:'1px solid #e2e8f0'}}>
                  {isMr ? 'महिलांना प्राधान्य' : 'Women Priority'}
                </span>
              </div>

              <div className="roles-interactive-selector">
                <span style={{fontSize:'0.85rem',fontWeight:'600',color:'#475569',display:'block',marginBottom:'0.65rem'}}>
                  {isMr ? 'प्रतिनिधी म्हणून मिळणाऱ्या प्रमुख जबाबदाऱ्या:' : 'Key Responsibilities as Village Representative:'}
                </span>

                <div className="roles-tabs-grid">
                  {REPRESENTATIVE_ROLES.map((role, idx) => (
                    <button
                      key={role.id}
                      type="button"
                      className={`role-tab-btn ${activeRole === idx ? 'active-tab' : ''}`}
                      onClick={() => setActiveRole(idx)}
                    >
                      <span className="role-icon">{role.icon}</span>
                      <span className="role-name">{isMr ? role.titleMr : role.titleEn}</span>
                    </button>
                  ))}
                </div>

                {/* Active Role Detailed Card with smooth switch animation */}
                <div 
                  key={REPRESENTATIVE_ROLES[activeRole].id} 
                  className="active-role-display-box role-animate-in" 
                  style={{ borderLeftColor: REPRESENTATIVE_ROLES[activeRole].color }}
                >
                  <div className="role-display-head">
                    <span className="display-emoji">{REPRESENTATIVE_ROLES[activeRole].icon}</span>
                    <div>
                      <h4 className="display-title">
                        {isMr ? REPRESENTATIVE_ROLES[activeRole].titleMr : REPRESENTATIVE_ROLES[activeRole].titleEn}
                      </h4>
                      <span className="display-badge" style={{ backgroundColor: '#f1f5f9', color: '#1e293b' }}>
                        {isMr ? REPRESENTATIVE_ROLES[activeRole].badgeMr : 'Official Role'}
                      </span>
                    </div>
                  </div>
                  <p className="display-desc">
                    {isMr ? REPRESENTATIVE_ROLES[activeRole].descMr : REPRESENTATIVE_ROLES[activeRole].descMr}
                  </p>
                </div>
              </div>

              {/* Quick Village Vacancy Check Box */}
              <div className="quick-vacancy-box">
                <div className="vacancy-title-row">
                  <MapPin size={16} className="text-emerald-600" />
                  <strong>{isMr ? 'गावातील जागा रिक्त आहे का?' : 'Check Village Vacancy:'}</strong>
                </div>
                <p className="vacancy-note">
                  {isMr 
                    ? 'महाराष्ट्रातील ४४,००० गावांत प्रत्येकी फक्त १ प्रतिनिधी निवडला जाईल.' 
                    : 'Only 1 representative per village across Maharashtra.'}
                </p>
                <button 
                  type="button" 
                  className="vacancy-check-btn"
                  onClick={onApplyClick}
                >
                  <Search size={15} />
                  <span>{isMr ? 'गाव निवडून जागा तपासा ➔' : 'Check Village Status ➔'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
