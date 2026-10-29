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
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Package,
  BadgePercent,
  Wallet
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
    ],
    expectedEarning: '₹12,000 - ₹15,000+'
  },
  {
    id: 'health',
    titleMr: 'आरोग्य व सॅनिटरी सखी',
    titleEn: 'Health & Sanitary Sakhi',
    badgeMr: 'महिला आरोग्य',
    icon: '🌸',
    descMr: 'अस्तित्व सॅनिटरी पॅड्स व महिला आरोग्य उत्पादने गावातील प्रत्येक घरापर्यंत पोहोचवा.',
    color: '#e11d48',
    bgColor: '#fff1f2',
    dutiesMr: [
      'गावातील महिलांना सॅनिटरी पॅड्स उपलब्ध करून देणे',
      'आरोग्य आणि स्वच्छतेबाबत जनजागृती करणे',
      'नियमित उत्पादने वितरण व मासिक नफा'
    ],
    expectedEarning: '₹10,000 - ₹14,000+'
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
    ],
    expectedEarning: '₹12,000 - ₹16,000+'
  },
  {
    id: 'realty',
    titleMr: 'डिजिटल सेवा व मालमत्ता सल्लागार',
    titleEn: 'Digital & Realty Advisor',
    badgeMr: 'स्थानिक सेवा',
    icon: '🏡',
    descMr: 'शेतजमीन, घरे खरेदी-विक्री नोंदणी व इतर शासकीय डिजिटल सेवांचे गावातील केंद्र चालवा.',
    color: '#0284c7',
    bgColor: '#eff6ff',
    dutiesMr: [
      'शेतजमीन खरेदी-विक्री माहिती व नोंदणी',
      'डिजिटल शासकीय दाखले व कागदपत्रे सहाय्य',
      'गावातील नागरिकांना एकाच ठिकाणी सर्व सेवा'
    ],
    expectedEarning: '₹15,000 - ₹18,000+'
  }
];

const PILL_INFO = [
  {
    id: 0,
    titleMr: '१ गाव १ प्रतिनिधी',
    descMr: 'एका गावात फक्त १ अधिकृत प्रतिनिधी नेमला जाईल. संपूर्ण गावात तुमचाच अधिकृत व्यवसाय असेल!'
  },
  {
    id: 1,
    titleMr: 'महिला स्वावलंबन',
    descMr: 'स्थानिक महिलांना घरबसल्या स्वाभिमानाने काम करण्याची संधी आणि कंपनीकडून विशेष प्राधान्य.'
  },
  {
    id: 2,
    titleMr: '१००% मोफत प्रशिक्षण',
    descMr: 'मोबाईल ॲप चालवणे, सेवा देणे आणि व्यवसाय वाढवण्याचे मराठीत पूर्ण मोफत प्रशिक्षण.'
  },
  {
    id: 3,
    titleMr: 'थेट बँक खात्यात कमिशन',
    descMr: 'तुमचे दरमहा कमिशन आणि नफा थेट तुमच्या बँक खात्यात पारदर्शकपणे जमा केला जातो.'
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
  const [activePillIndex, setActivePillIndex] = useState(null);
  const [expandedCard, setExpandedCard] = useState('capital'); // default show capital breakdown
  
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

  const togglePill = (idx) => {
    setActivePillIndex(prev => (prev === idx ? null : idx));
  };

  const toggleCard = (cardType) => {
    setExpandedCard(prev => (prev === cardType ? null : cardType));
  };

  return (
    <section className="hero-poster-style-section" id="hero">
      {/* Background Fresh Ambient Glow Orbs */}
      <div className="hero-ambient-glow fresh-orb-mint" aria-hidden="true" />
      <div className="hero-ambient-glow fresh-orb-sky" aria-hidden="true" />
      <div className="hero-ambient-glow fresh-orb-amber" aria-hidden="true" />

      <div className="section-container relative-hero-content">
        {/* TOP ROW: Fresh & Crisp Announcement Pill */}
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

        {/* 4 Interactive Feature Pillars (Tap to view details!) */}
        <div className="poster-pillars-container">
          <button 
            type="button" 
            className={`fresh-pillar-pill ${activePillIndex === 0 ? 'pill-active' : ''}`}
            onClick={() => togglePill(0)}
          >
            <CheckCircle2 size={14} className="fresh-pillar-icon" />
            <span>{isMr ? '१ गाव १ प्रतिनिधी' : '1 Village 1 Rep'}</span>
            <span className="pill-tap-hint">👆</span>
          </button>

          <button 
            type="button" 
            className={`fresh-pillar-pill ${activePillIndex === 1 ? 'pill-active' : ''}`}
            onClick={() => togglePill(1)}
          >
            <HeartHandshake size={14} className="fresh-pillar-icon text-pink" />
            <span>{isMr ? 'महिला स्वावलंबन' : 'Women Empowerment'}</span>
            <span className="pill-tap-hint">👆</span>
          </button>

          <button 
            type="button" 
            className={`fresh-pillar-pill ${activePillIndex === 2 ? 'pill-active' : ''}`}
            onClick={() => togglePill(2)}
          >
            <Sparkles size={14} className="fresh-pillar-icon text-amber" />
            <span>{isMr ? '१००% मोफत प्रशिक्षण' : '100% Free Training'}</span>
            <span className="pill-tap-hint">👆</span>
          </button>

          <button 
            type="button" 
            className={`fresh-pillar-pill ${activePillIndex === 3 ? 'pill-active' : ''}`}
            onClick={() => togglePill(3)}
          >
            <CheckCircle2 size={14} className="fresh-pillar-icon" />
            <span>{isMr ? 'थेट बँक खात्यात कमिशन' : 'Direct Bank Payouts'}</span>
            <span className="pill-tap-hint">👆</span>
          </button>
        </div>

        {/* Interactive Pill Info Bubble (Shows when any pill is tapped) */}
        {activePillIndex !== null && (
          <div className="pill-interactive-tooltip role-animate-in">
            <div className="pill-tooltip-header">
              <Sparkles size={15} className="text-emerald" />
              <strong>{PILL_INFO[activePillIndex].titleMr}</strong>
            </div>
            <p className="pill-tooltip-desc">
              {PILL_INFO[activePillIndex].descMr}
            </p>
          </div>
        )}

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

            {/* Interactive 4 Roles Bar (Right inside mobile view!) */}
            <div className="hero-roles-quick-bar">
              <span className="quick-bar-label">
                {isMr ? '🎯 प्रमुख ४ जबाबदाऱ्या (टॅप करून पहा):' : 'Explore Roles (Tap to view):'}
              </span>
              <div className="quick-roles-pills">
                {REPRESENTATIVE_ROLES.map((role, idx) => (
                  <button
                    key={role.id}
                    type="button"
                    className={`quick-role-btn ${activeRole === idx ? 'active-quick-role' : ''}`}
                    onClick={() => setActiveRole(idx)}
                  >
                    <span>{role.icon}</span>
                    <span>{isMr ? role.titleMr.split(' ')[0] : role.titleEn.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Active Role Quick Spotlight */}
              <div 
                className="hero-active-role-spotlight role-animate-in"
                style={{ 
                  background: REPRESENTATIVE_ROLES[activeRole].bgColor,
                  borderColor: REPRESENTATIVE_ROLES[activeRole].color 
                }}
              >
                <div className="spotlight-header">
                  <span className="spotlight-emoji">{REPRESENTATIVE_ROLES[activeRole].icon}</span>
                  <div>
                    <h4 className="spotlight-title">{REPRESENTATIVE_ROLES[activeRole].titleMr}</h4>
                    <span className="spotlight-earning" style={{ color: REPRESENTATIVE_ROLES[activeRole].color }}>
                      दरमहा {REPRESENTATIVE_ROLES[activeRole].expectedEarning}
                    </span>
                  </div>
                </div>
                <p className="spotlight-desc">{REPRESENTATIVE_ROLES[activeRole].descMr}</p>
              </div>
            </div>

            {/* Fresh Interactive Financial Offer Cards (Tap to expand breakdown!) */}
            <div className="fresh-offers-grid">
              {/* Card 1: Investment */}
              <div 
                className={`fresh-offer-card fresh-card-capital interactive-tap-card ${expandedCard === 'capital' ? 'card-tap-expanded' : ''}`}
                onClick={() => toggleCard('capital')}
                role="button"
                tabIndex={0}
              >
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

                <div className="card-tap-hint-row">
                  <span>{expandedCard === 'capital' ? 'माहिती बंद करा ▲' : 'काय काय मिळते? टॅप करा ▼'}</span>
                </div>

                {/* Expanded Capital Breakdown */}
                {expandedCard === 'capital' && (
                  <div className="interactive-card-breakdown role-animate-in" onClick={(e) => e.stopPropagation()}>
                    <div className="breakdown-item">
                      <Package size={14} className="text-emerald" />
                      <span>सॅनिटरी पॅड्सचा सुरुवातीचा स्टॉक</span>
                    </div>
                    <div className="breakdown-item">
                      <Sparkles size={14} className="text-emerald" />
                      <span>इनोदयम अधिकृत किट व ओळखपत्र</span>
                    </div>
                    <div className="breakdown-item">
                      <Check size={14} className="text-emerald" />
                      <span>मोबाईल ॲप व शाळा ERP ॲक्सेस</span>
                    </div>
                    <div className="breakdown-item">
                      <Check size={14} className="text-emerald" />
                      <span>१००% मोफत व्यवसाय व विक्री प्रशिक्षण</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card 2: Expected Monthly Income */}
              <div 
                className={`fresh-offer-card fresh-card-income interactive-tap-card ${expandedCard === 'income' ? 'card-tap-expanded' : ''}`}
                onClick={() => toggleCard('income')}
                role="button"
                tabIndex={0}
              >
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

                <div className="card-tap-hint-row">
                  <span>{expandedCard === 'income' ? 'माहिती बंद करा ▲' : 'उत्पन्न कसे मिळते? टॅप करा ▼'}</span>
                </div>

                {/* Expanded Income Breakdown */}
                {expandedCard === 'income' && (
                  <div className="interactive-card-breakdown role-animate-in" onClick={(e) => e.stopPropagation()}>
                    <div className="breakdown-item">
                      <Wallet size={14} className="text-sky" />
                      <span>सॅनिटरी पॅड्स विक्री: ~₹4,500/महिना</span>
                    </div>
                    <div className="breakdown-item">
                      <BadgePercent size={14} className="text-sky" />
                      <span>शाळा ERP व ऑनलाईन क्लासेस: ~₹5,500/महिना</span>
                    </div>
                    <div className="breakdown-item">
                      <Check size={14} className="text-sky" />
                      <span>डिजिटल व इतर सेवा: ~₹3,500/महिना</span>
                    </div>
                    <div className="breakdown-item text-bold-income">
                      <Sparkles size={14} className="text-emerald" />
                      <span>एकूण दरमहा: ₹12,000 ते ₹15,000+ थेट बँकेत!</span>
                    </div>
                  </div>
                )}
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

          {/* Right Column: Interactive Village Vacancy Hub */}
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

              {/* Interactive Village Vacancy Checker */}
              <div className="fresh-quick-vacancy-box">
                <div className="vacancy-title-row">
                  <MapPin size={17} className="text-emerald" />
                  <strong>{isMr ? 'तुमच्या गावातील जागा तपासा:' : 'Check Village Vacancy:'}</strong>
                </div>

                <p className="vacancy-note">
                  {isMr 
                    ? 'महाराष्ट्रातील ४४,००० गावांत प्रत्येकी फक्त १ जागा उपलब्ध आहे.' 
                    : 'Only 1 representative spot per village across Maharashtra.'}
                </p>

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
