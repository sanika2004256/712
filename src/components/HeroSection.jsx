import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Search,
  Heart,
  Award,
  BookOpen,
  Briefcase
} from 'lucide-react';

const REPRESENTATIVE_ROLES = [
  {
    id: 'empowerment',
    titleMr: 'स्वावलंबी महिला प्रतिनिधी',
    titleEn: 'Self-Reliant Village Leader',
    badgeMr: 'महिला सबलीकरण',
    icon: '👩‍💼',
    descMr: 'गावातच राहून स्वतःचा स्वाभिमानी व्यवसाय सांभाळा. मासिक किमान ₹12,000 - ₹15,000 उत्पन्न.',
    color: '#e11d48'
  },
  {
    id: 'health',
    titleMr: 'आरोग्य व सॅनिटरी सखी (Astitva Mart)',
    titleEn: 'Health & Sanitary Hygiene Sakhi',
    badgeMr: 'महिला आरोग्य',
    icon: '🌸',
    descMr: 'अस्तित्व मार्टच्या माध्यमातून उच्च गुणवत्तेचे सॅनिटरी पॅड्स व महिला आरोग्य उत्पादने गावातील प्रत्येक घरात पोहोचवा.',
    color: '#0284c7'
  },
  {
    id: 'education',
    titleMr: 'शिक्षण समन्वयक (Edu Coordinator)',
    titleEn: 'Education Ambassador',
    badgeMr: 'डिजिटल शिक्षण',
    icon: '👩‍🏫',
    descMr: 'शाळा ERP व्यवस्थापन आणि CET / JEE / NEET ऑनलाईन क्लासेसचे गावातील विद्यार्थ्यांसाठी समन्वयक बना.',
    color: '#16a34a'
  },
  {
    id: 'realty',
    titleMr: 'डिजिटल सेवा व मालमत्ता सल्लागार',
    titleEn: 'Digital & Realty Advisor',
    badgeMr: 'स्थानिक सेवा',
    icon: '🏡',
    descMr: 'अस्तित्व रियल्टी ॲपद्वारे शेतजमीन, घरे व दुकानांची स्थानिक खरेदी-विक्री नोंदणी व इतर शासकीय डिजिटल सेवा.',
    color: '#f59e0b'
  }
];

export default function HeroSection({ lang, onApplyClick }) {
  const isMr = lang === 'mr';
  const [activeRole, setActiveRole] = useState(0);

  return (
    <section className="hero-poster-style-section" id="hero">
      {/* Background Stylized Waves and Sky Ambience */}
      <div className="hero-sky-backdrop">
        <div className="sun-glow" />
        <div className="rural-hills-silhouette" />
      </div>

      <div className="section-container">
        {/* TOP ROW: Arched Slogan & Maharashtra 44,000 Villages Badge */}
        <div className="poster-top-bar">
          {/* Slogan */}
          <div className="poster-arch-slogan">
            <div className="slogan-curved-box">
              <span className="slogan-arc-text">
                {isMr 
                  ? 'एक गाव... एक प्रतिनिधी... मजबूत होणार आपले गाव !' 
                  : 'One Village... One Representative... Empowered Village!'}
              </span>
            </div>
          </div>

          {/* Maharashtra 44,000 Villages Badge */}
          <div className="poster-maharashtra-badge">
            <div className="maha-map-shape">
              <span className="maha-state-label">
                {isMr ? 'महाराष्ट्रातील' : 'Across'}
              </span>
              <strong className="maha-number">
                {isMr ? '४४,०००' : '44,000'}
              </strong>
              <span className="maha-village-label">
                {isMr ? 'गावांमध्ये' : 'Villages'}
              </span>
            </div>
          </div>
        </div>

        {/* 4 CORE PILLARS: Exact Poster Pills */}
        <div className="poster-pillars-container">
          <div className="poster-pillar-pill pillar-blue">
            <span className="pillar-dot">🔵</span>
            <span>{isMr ? 'गाव तिथे प्रतिनिधी' : 'Village Representative'}</span>
          </div>
          <div className="poster-pillar-pill pillar-green">
            <span className="pillar-dot">🟢</span>
            <span>{isMr ? 'गावाचा विकास' : 'Village Growth'}</span>
          </div>
          <div className="poster-pillar-pill pillar-magenta">
            <span className="pillar-dot">🔴</span>
            <span>{isMr ? 'महिलांचे सबलीकरण' : 'Women Empowerment'}</span>
          </div>
          <div className="poster-pillar-pill pillar-orange">
            <span className="pillar-dot">🟠</span>
            <span>{isMr ? 'समृद्ध महाराष्ट्र' : 'Prosperous Maharashtra'}</span>
          </div>
        </div>

        {/* MAIN HERO INTERACTIVE SHOWCASE */}
        <div className="poster-hero-main-grid">
          {/* Left Column: Headlines & Callout Ribbons */}
          <div className="poster-hero-left">
            {/* Pink Painted Brush Ribbon: गाव प्रतिनिधी बना... */}
            <div className="brush-ribbon-wrapper">
              <div className="brush-ribbon-tag">
                <h2 className="brush-ribbon-text">
                  {isMr ? 'गाव प्रतिनिधी बना...' : 'Become Village Representative...'}
                </h2>
              </div>
            </div>

            {/* Dark Navy Subheading */}
            <h1 className="poster-main-subheading">
              {isMr ? (
                <>
                  स्वतःचा व्यवसाय सुरु करा <br className="hidden sm:inline" />
                  आणि <span className="text-pink-600">स्वतःसोबत आपल्या गावाचा</span> विकास घडवा !
                </>
              ) : (
                'Start your own business and drive your village development!'
              )}
            </h1>

            <p className="poster-subtext-para">
              {isMr 
                ? 'Inodayam Tech Private Limited च्या माध्यमातून आपल्या गावातच उच्च प्रतीच्या डिजिटल सेवा, सॅनिटरी पॅड्स, शाळा ERP आणि मालमत्ता सेवा केंद्र सुरू करा. महिलांसाठी विशेष स्वावलंबनाची सुवर्णसंधी.' 
                : 'Empower your village with digital services, sanitary hygiene, education ERP, and real estate solutions with Inodayam Tech Private Limited.'}
            </p>

            {/* EXACT POSTER OFFER CALLOUT BOXES (Yellow Capital + Magenta Income) */}
            <div className="poster-offers-stack">
              {/* Yellow Banner: फक्त ₹10,000 भांडवलात */}
              <div className="poster-yellow-ribbon">
                <div className="ribbon-inner">
                  <span className="ribbon-small-label">{isMr ? 'फक्त' : 'Only'}</span>
                  <div className="ribbon-big-amount">
                    <span className="currency">₹</span>10,000
                  </div>
                  <div className="ribbon-text-lines">
                    <strong>{isMr ? 'भांडवलात सुरु करा' : 'Start with capital of'}</strong>
                    <span>{isMr ? 'आपला स्वतःचा व्यवसाय !' : 'Your Own Business!'}</span>
                  </div>
                </div>
              </div>

              {/* Magenta Curved Banner: मासिक उत्पन्न मिळवा: किमान ₹12,000 – ₹15,000 */}
              <div className="poster-magenta-ribbon">
                <div className="magenta-ribbon-content">
                  <div className="magenta-income-label">
                    <Sparkles size={16} className="inline mr-1 text-amber-300" />
                    <span>{isMr ? 'मासिक उत्पन्न मिळवा:' : 'Earn Monthly Income:'}</span>
                  </div>
                  <div className="magenta-income-val">
                    {isMr ? 'किमान ₹12,000 – ₹15,000' : 'Min ₹12,000 – ₹15,000'}
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="poster-cta-group">
              <button 
                type="button" 
                className="poster-apply-btn"
                onClick={onApplyClick}
              >
                <span>{isMr ? 'आताच आपल्या गावाची जागा आरक्षित करा' : 'Reserve Your Village Seat Now'}</span>
                <ArrowRight size={20} />
              </button>

              <a 
                href="#calculator" 
                className="poster-calc-btn"
              >
                <span>{isMr ? 'उत्पन्न कॅल्क्युलेटर पहा 📊' : 'View Earnings Calculator 📊'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Empowerment Hub (Replaces static poster image) */}
          <div className="poster-hero-right">
            <div className="interactive-empowerment-card">
              <div className="card-top-header">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    {isMr ? 'प्रत्येक गावात १ जागा • थेट निवड' : '1 Seat Per Village • Direct Selection'}
                  </span>
                </div>
                <span className="text-xs bg-pink-100 text-pink-700 font-bold px-2.5 py-1 rounded-full">
                  {isMr ? 'महिलांना प्राधान्य' : 'Women Priority'}
                </span>
              </div>

              <div className="roles-interactive-selector">
                <span className="text-sm font-semibold text-slate-700 block mb-2">
                  {isMr ? 'प्रतिनिधी म्हणून तुम्हाला मिळणाऱ्या ४ प्रमुख जबाबदाऱ्या:' : 'Key Responsibilities as Village Representative:'}
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

                {/* Active Role Detailed Card */}
                <div className="active-role-display-box" style={{ borderColor: REPRESENTATIVE_ROLES[activeRole].color }}>
                  <div className="role-display-head">
                    <span className="display-emoji">{REPRESENTATIVE_ROLES[activeRole].icon}</span>
                    <div>
                      <h4 className="display-title">
                        {isMr ? REPRESENTATIVE_ROLES[activeRole].titleMr : REPRESENTATIVE_ROLES[activeRole].titleEn}
                      </h4>
                      <span className="display-badge" style={{ backgroundColor: `${REPRESENTATIVE_ROLES[activeRole].color}15`, color: REPRESENTATIVE_ROLES[activeRole].color }}>
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
                  <strong>{isMr ? 'तुमच्या गावातील जागा रिक्त आहे का?' : 'Check Village Vacancy Status:'}</strong>
                </div>
                <p className="vacancy-note">
                  {isMr 
                    ? 'महाराष्ट्रातील ४४,००० गावांमध्ये प्रत्येकी फक्त १ प्रतिनिधी निवडला जाणार आहे. जागा भरण्यापूर्वी लगेच अर्ज करा!' 
                    : 'Only 1 representative per village across 44,000 villages in Maharashtra. Reserve early!'}
                </p>
                <button 
                  type="button"
                  className="vacancy-check-btn"
                  onClick={onApplyClick}
                >
                  <Search size={16} />
                  <span>{isMr ? 'जिल्हा व गाव निवडून जागा तपासा ➔' : 'Select Village & Check ➔'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
