import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Search,
  Award,
  Building2,
  Sparkles,
  Users,
  Check,
  HeartHandshake
} from 'lucide-react';

const REPRESENTATIVE_ROLES = [
  {
    id: 'empowerment',
    titleMr: 'स्वावलंबी महिला प्रतिनिधी',
    titleEn: 'Self-Reliant Village Leader',
    badgeMr: 'महिला सबलीकरण',
    icon: '👩‍💼',
    descMr: 'गावातच राहून स्वतःचा स्वाभिमानी व्यवसाय सांभाळा व दरमहा ₹12,000 - ₹15,000+ नियमित उत्पन्न मिळवा.',
    color: '#059669',
    bgColor: '#ecfdf5',
    dutiesMr: [
      'गावात महिला स्वावलंबन केंद्र चालवणे',
      'महिलांना घरबसल्या सन्मानजनक उत्पन्न मिळवून देणे',
      'इनोदयमचे अधिकृत गाव प्रतिनिधी म्हणून काम करणे'
    ]
  },
  {
    id: 'health',
    titleMr: 'आरोग्य व सॅनिटरी सखी',
    titleEn: 'Health & Sanitary Sakhi',
    badgeMr: 'महिला आरोग्य',
    icon: '🌸',
    descMr: 'अस्तित्व सॅनिटरी पॅड्स व महिला आरोग्य उत्पादने गावातील प्रत्येक घरापर्यंत पोहोचवा.',
    color: '#0284c7',
    bgColor: '#eff6ff',
    dutiesMr: [
      'गावातील महिलांना सॅनिटरी पॅड्स उपलब्ध करून देणे',
      'आरोग्य आणि स्वच्छतेबाबत जनजागृती करणे',
      'नियमित उत्पादने वितरण व मासिक उत्पन्न'
    ]
  },
  {
    id: 'education',
    titleMr: 'शिक्षण समन्वयक',
    titleEn: 'Education Ambassador',
    badgeMr: 'डिजिटल शिक्षण',
    icon: '👩‍🏫',
    descMr: 'शाळा ERP व्यवस्थापन आणि CET / NEET ऑनलाईन क्लासेसचे गावातील विद्यार्थ्यांना मार्गदर्शन द्या.',
    color: '#4f46e5',
    bgColor: '#eef2ff',
    dutiesMr: [
      'गावातील शाळांसाठी ERP सॉफ्टवेअर सहाय्य',
      'विद्यार्थ्यांना ऑनलाईन कोचिंगची माहिती देणे',
      'गावात डिजिटल शिक्षणाचा पाया मजबूत करणे'
    ]
  },
  {
    id: 'realty',
    titleMr: 'डिजिटल सेवा व मालमत्ता सल्लागार',
    titleEn: 'Digital & Realty Advisor',
    badgeMr: 'स्थानिक सेवा',
    icon: '🏡',
    descMr: 'शेतजमीन, घरे खरेदी-विक्री नोंदणी व इतर शासकीय डिजिटल सेवांचे गावातील केंद्र चालवा.',
    color: '#0d9488',
    bgColor: '#f0fdfa',
    dutiesMr: [
      'शेतजमीन खरेदी-विक्री माहिती व नोंदणी',
      'डिजिटल शासकीय दाखले व कागदपत्रे सहाय्य',
      'गावातील नागरिकांना एकाच ठिकाणी सर्व सेवा'
    ]
  }
];

const POPULAR_DISTRICTS = [
  'पुणे (Pune)',
  'सातारा (Satara)',
  'कोल्हापूर (Kolhapur)',
  'सोलापूर (Solapur)',
  'अहिल्यानगर (Ahmednagar)',
  'नाशिक (Nashik)',
  'छत्रपती संभाजीनगर (Aurangabad)',
  'सांगली (Sangli)',
  'जळगाव (Jalgaon)',
  'ठाणे (Thane)'
];

export default function HeroSection({ lang, onApplyClick }) {
  const isMr = lang === 'mr';
  const [activeRole, setActiveRole] = useState(0);
  
  // Interactive Village Vacancy Checker state
  const [selectedDistrict, setSelectedDistrict] = useState('पुणे (Pune)');
  const [villageSearchName, setVillageSearchName] = useState('');
  const [checkedVillageResult, setCheckedVillageResult] = useState(null);

  const handleCheckVacancy = (e) => {
    e.preventDefault();
    const vName = villageSearchName.trim() || (isMr ? 'तुमच्या गावात' : 'your village');
    setCheckedVillageResult({
      village: vName,
      district: selectedDistrict,
      status: 'AVAILABLE',
      messageMr: `🎉 अभिनंदन! ${vName} (${selectedDistrict.split(' ')[0]}) येथे प्रतिनिधी जागा रिक्त आहे!`,
      messageEn: `🎉 Congratulations! 1 Representative vacancy is available in ${vName}!`
    });
  };

  return (
    <section className="hero-poster-style-section" id="hero">
      {/* Background Fresh Ambient Glow Orbs */}
      <div className="hero-ambient-glow fresh-orb-mint" aria-hidden="true" />
      <div className="hero-ambient-glow fresh-orb-sky" aria-hidden="true" />
      <div className="hero-ambient-glow fresh-orb-amber" aria-hidden="true" />

      <div className="section-container relative-hero-content">
        {/* TOP ROW: Fresh & Crisp Announcement Pill (No clipping on mobile!) */}
        <div className="fresh-hero-announcement-bar">
          <div className="fresh-badge-official">
            <span className="fresh-pulse-dot" />
            <span className="fresh-badge-text">
              {isMr ? 'अधिकृत गाव प्रतिनिधी मोहीम २०२६' : 'Official Village Representative Drive 2026'}
            </span>
          </div>

          <div className="fresh-badge-stat">
            <Building2 size={14} className="fresh-stat-icon" />
            <span>{isMr ? '४४,०००+ गावे (महाराष्ट्र)' : '44,000+ Villages (MH)'}</span>
          </div>
        </div>

        {/* 4 Fresh Feature Pillars */}
        <div className="poster-pillars-container">
          <div className="fresh-pillar-pill">
            <CheckCircle2 size={14} className="fresh-pillar-icon" />
            <span>{isMr ? '१ गाव १ प्रतिनिधी' : '1 Village 1 Rep'}</span>
          </div>
          <div className="fresh-pillar-pill">
            <HeartHandshake size={14} className="fresh-pillar-icon text-pink" />
            <span>{isMr ? 'महिला स्वावलंबन' : 'Women Empowerment'}</span>
          </div>
          <div className="fresh-pillar-pill">
            <Sparkles size={14} className="fresh-pillar-icon text-amber" />
            <span>{isMr ? '१००% मोफत प्रशिक्षण' : '100% Free Training'}</span>
          </div>
          <div className="fresh-pillar-pill">
            <CheckCircle2 size={14} className="fresh-pillar-icon" />
            <span>{isMr ? 'थेट बँक खात्यात कमिशन' : 'Direct Bank Payouts'}</span>
          </div>
        </div>

        {/* MAIN HERO INTERACTIVE SHOWCASE */}
        <div className="poster-hero-main-grid">
          {/* Left Column: Headlines & Callout Cards */}
          <div className="poster-hero-left">
            <div className="fresh-tag-badge">
              <Award size={15} />
              <span>{isMr ? 'इनोदयम टेक प्रा. लि. अधिकृत नियुक्ती' : 'Inodayam Tech Official Drive'}</span>
            </div>

            {/* Fresh Lively Heading */}
            <h1 className="poster-main-subheading">
              {isMr ? (
                <>
                  स्वतःचा व्यवसाय सुरू करा, <span className="fresh-gradient-text">आपल्या गावाचा विकास</span> साधा!
                </>
              ) : (
                <>
                  Start your own business and <span className="fresh-gradient-text">drive village growth</span>!
                </>
              )}
            </h1>

            <p className="poster-subtext-para">
              {isMr 
                ? 'इनोदयम टेक (Inodayam Tech) सोबत आपल्या गावातच सुरू करा सॅनिटरी पॅड्स, डिजिटल सेवा, शाळा ERP आणि मालमत्ता सल्लागार केंद्र.' 
                : 'Empower your village with sanitary hygiene, digital government services, school ERP, and property solutions with Inodayam Tech.'}
            </p>

            {/* Fresh Soft Glowing Financial Offer Cards */}
            <div className="fresh-offers-grid">
              {/* Card 1: Investment */}
              <div className="fresh-offer-card fresh-card-capital">
                <div className="fresh-offer-top">
                  <div className="fresh-icon-wrap fresh-icon-mint">
                    <ShieldCheck size={22} />
                  </div>
                  <span className="fresh-card-tag mint-tag">
                    {isMr ? '१००% सुरक्षित' : '100% Safe'}
                  </span>
                </div>
                <div className="fresh-offer-body">
                  <span className="fresh-offer-label">{isMr ? 'किमान भांडवल' : 'Minimum Capital'}</span>
                  <div className="fresh-offer-amount text-mint">
                    <span className="currency">₹</span>10,000
                  </div>
                  <p className="fresh-offer-desc">
                    {isMr ? 'कमी गुंतवणुकीत खात्रीशीर सुरुवात' : 'Start with minimal investment'}
                  </p>
                </div>
              </div>

              {/* Card 2: Expected Monthly Income */}
              <div className="fresh-offer-card fresh-card-income">
                <div className="fresh-offer-top">
                  <div className="fresh-icon-wrap fresh-icon-sky">
                    <TrendingUp size={22} />
                  </div>
                  <span className="fresh-card-tag sky-tag">
                    {isMr ? 'दरमहा थेट' : 'Every Month'}
                  </span>
                </div>
                <div className="fresh-offer-body">
                  <span className="fresh-offer-label">{isMr ? 'अपेक्षित मासिक उत्पन्न' : 'Monthly Income'}</span>
                  <div className="fresh-offer-amount text-sky">
                    ₹12,000 – ₹15,000<span className="plus">+</span>
                  </div>
                  <p className="fresh-offer-desc">
                    {isMr ? 'दरमहा थेट नियमित उत्पन्न' : 'Guaranteed regular income'}
                  </p>
                </div>
              </div>
            </div>

            {/* Single Centered Animated Apply CTA Button */}
            <div className="hero-single-apply-wrapper">
              <button 
                type="button" 
                className="animated-hero-apply-btn"
                onClick={onApplyClick}
                aria-label="Apply for Village Representative"
              >
                <span className="apply-btn-sparkle" aria-hidden="true">✨</span>
                <span className="apply-btn-text">Apply</span>
                <ArrowRight size={20} className="apply-btn-arrow" />
              </button>
              <div className="apply-trust-subtext">
                <Check size={13} className="text-emerald" />
                <span>{isMr ? '१००% सुरक्षित नोंदणी • अवघ्या २ मिनिटांत अर्ज • मोफत माहिती' : '100% Secure • 2-Min Application • Free Guidance'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Empowerment Hub & Village Checker */}
          <div className="poster-hero-right">
            <div className="interactive-empowerment-card fresh-glass-card">
              <div className="card-top-header">
                <div className="header-status-indicator">
                  <span className="fresh-live-dot" />
                  <span className="header-status-title">
                    {isMr ? '१ गाव • १ प्रतिनिधी' : '1 Village • 1 Representative'}
                  </span>
                </div>
                <span className="header-women-priority-pill">
                  {isMr ? '👩 महिलांना प्राधान्य' : '👩 Women Priority'}
                </span>
              </div>

              {/* Interactive Role Selector Tabs */}
              <div className="roles-interactive-selector">
                <div className="roles-selector-title-row">
                  <Users size={16} className="text-emerald" />
                  <span className="roles-selector-title">
                    {isMr ? '४ प्रमुख प्रतिनिधी भूमिका (निवडून माहिती पहा):' : 'Explore Representative Roles (Tap to view):'}
                  </span>
                </div>

                <div className="roles-tabs-grid">
                  {REPRESENTATIVE_ROLES.map((role, idx) => (
                    <button
                      key={role.id}
                      type="button"
                      className={`fresh-role-tab-btn ${activeRole === idx ? 'fresh-active-tab' : ''}`}
                      onClick={() => setActiveRole(idx)}
                      style={{
                        borderColor: activeRole === idx ? role.color : undefined
                      }}
                    >
                      <span className="role-icon">{role.icon}</span>
                      <span className="role-name">{isMr ? role.titleMr : role.titleEn}</span>
                    </button>
                  ))}
                </div>

                {/* Active Role Detailed Card with smooth animation */}
                <div 
                  key={REPRESENTATIVE_ROLES[activeRole].id} 
                  className="fresh-active-role-card role-animate-in" 
                  style={{ 
                    borderLeftColor: REPRESENTATIVE_ROLES[activeRole].color,
                    background: `linear-gradient(135deg, #ffffff 0%, ${REPRESENTATIVE_ROLES[activeRole].bgColor} 100%)`
                  }}
                >
                  <div className="role-display-head">
                    <span className="display-emoji">{REPRESENTATIVE_ROLES[activeRole].icon}</span>
                    <div>
                      <h4 className="display-title">
                        {isMr ? REPRESENTATIVE_ROLES[activeRole].titleMr : REPRESENTATIVE_ROLES[activeRole].titleEn}
                      </h4>
                      <span 
                        className="display-badge" 
                        style={{ 
                          backgroundColor: '#ffffff', 
                          color: REPRESENTATIVE_ROLES[activeRole].color,
                          border: `1px solid ${REPRESENTATIVE_ROLES[activeRole].color}33`
                        }}
                      >
                        {isMr ? REPRESENTATIVE_ROLES[activeRole].badgeMr : 'Official Role'}
                      </span>
                    </div>
                  </div>

                  <p className="display-desc">
                    {REPRESENTATIVE_ROLES[activeRole].descMr}
                  </p>

                  {/* Checklist of duties */}
                  <div className="role-duties-list">
                    {REPRESENTATIVE_ROLES[activeRole].dutiesMr.map((duty, dIdx) => (
                      <div key={dIdx} className="role-duty-item">
                        <Check size={14} className="text-emerald" />
                        <span>{duty}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick role apply button */}
                  <button 
                    type="button" 
                    className="role-apply-shortcut-btn"
                    onClick={onApplyClick}
                  >
                    <span>{isMr ? `या भूमिकेसाठी अर्ज करा` : 'Apply for this Role'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Interactive Village Vacancy Checker */}
              <div className="fresh-quick-vacancy-box">
                <div className="vacancy-title-row">
                  <MapPin size={17} className="text-emerald" />
                  <strong>{isMr ? 'तुमच्या गावातील जागा तपासा:' : 'Check Village Vacancy:'}</strong>
                </div>

                <form onSubmit={handleCheckVacancy} className="vacancy-search-form">
                  <div className="vacancy-input-group">
                    <select 
                      className="vacancy-district-select"
                      value={selectedDistrict}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setCheckedVillageResult(null);
                      }}
                    >
                      {POPULAR_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>

                    <input 
                      type="text" 
                      className="vacancy-village-input"
                      placeholder={isMr ? 'गावाचे नाव टाका (उदा. शिरूर)' : 'Enter village name'}
                      value={villageSearchName}
                      onChange={(e) => {
                        setVillageSearchName(e.target.value);
                        setCheckedVillageResult(null);
                      }}
                    />
                  </div>

                  <button type="submit" className="fresh-vacancy-check-btn">
                    <Search size={15} />
                    <span>{isMr ? 'जागा तपासा' : 'Check Vacancy'}</span>
                  </button>
                </form>

                {/* Instant Vacancy Result Alert */}
                {checkedVillageResult && (
                  <div className="vacancy-result-badge vacancy-animate-in">
                    <div className="vacancy-result-header">
                      <span className="vacancy-green-dot" />
                      <strong>{checkedVillageResult.messageMr}</strong>
                    </div>
                    <p className="vacancy-result-sub">
                      {isMr 
                        ? 'फक्त १ जागा शिल्लक आहे. आधी अर्ज करणाऱ्यास प्राधान्य दिले जाईल.' 
                        : 'Only 1 spot available. First come, first priority.'}
                    </p>
                    <button 
                      type="button" 
                      className="vacancy-result-apply-link"
                      onClick={onApplyClick}
                    >
                      <span>{isMr ? 'त्वरित अर्ज पूर्ण करा ➔' : 'Complete Application Now ➔'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
