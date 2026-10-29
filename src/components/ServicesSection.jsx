import React, { useState } from 'react';
import { 
  School, 
  GraduationCap, 
  Building, 
  Film, 
  ShoppingBag, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const POSTER_SERVICES = [
  {
    id: 'school_erp',
    titleMr: 'शाळा ERP व्यवस्थापन',
    titleEn: 'School ERP Management',
    taglineMr: 'गावातील शाळांचे १००% डिजिटल व्यवस्थापन',
    icon: School,
    color: '#2563eb',
    bgColor: '#eff6ff',
    featuresMr: [
      'विद्यार्थी व शिक्षकांची डिजिटल हजेरी',
      'परीक्षा निकाल व प्रगतीपुस्तक निर्मिती',
      'ऑनलाईन फी संकलन व पालक सूचना मेसेजिंग'
    ],
    repBenefitMr: 'शाळांच्या वार्षिक सबस्क्रिप्शनवर दरमहा खात्रीशीर कमिशन.'
  },
  {
    id: 'coaching_classes',
    titleMr: 'CET / JEE / NEET ऑनलाईन क्लासेस',
    titleEn: 'CET / JEE / NEET Online Coaching',
    taglineMr: 'गावातील विद्यार्थ्यांना उच्च दर्जाचे ऑनलाइन शिक्षण',
    icon: GraduationCap,
    color: '#0284c7',
    bgColor: '#f0f9ff',
    featuresMr: [
      'तज्ज्ञ प्राध्यापकांचे लाइव्ह व रेकॉर्डेड लेक्चर्स',
      'मॉक टेस्ट सिरीज व शंका निरसन सेशन्स',
      'अत्यंत माफक व परवडणाऱ्या शुल्कात प्रवेश'
    ],
    repBenefitMr: 'प्रत्येक विद्यार्थी प्रवेशावर थेट ₹500 ते ₹1,500 चे कमिशन.'
  },
  {
    id: 'astitva_realty',
    titleMr: 'अस्तित्व रियल्टी (Property App)',
    titleEn: 'Astitva Realty (Property App)',
    taglineMr: 'गावातील शेतजमीन, घरे व दुकाने खरेदी-विक्री ॲप',
    icon: Building,
    color: '#059669',
    bgColor: '#ecfdf5',
    featuresMr: [
      'शेतजमीन, प्लॉट व घरांची स्थानिक डिजिटल नोंदणी',
      '७/१२ उतारा व फेरफार नोंदणी सहाय्य',
      'स्थानिक खरेदीदार व विक्रेत्यांचा थेट संपर्क'
    ],
    repBenefitMr: 'प्रत्येक यशस्वी जमीन/घर व्यवहारावर आकर्षक कमाई.'
  },
  {
    id: 'filmy_adda',
    titleMr: 'फिल्मी अड्डा (Film Production App)',
    titleEn: 'Filmy Adda (Film Production App)',
    taglineMr: 'स्थानिक कलाकारांसाठी अभिनय व मनोरंजन मंच',
    icon: Film,
    color: '#4f46e5',
    bgColor: '#eef2ff',
    featuresMr: [
      'स्थानिक कलाकारांची ऑडिशन नोंदणी',
      'लघुपट व संगीत अल्बम निर्मितीच्या संधी',
      'ग्रामीण कथा व स्थानिक संस्कृतीचे प्रमोशन'
    ],
    repBenefitMr: 'कलाकार नोंदणी व स्थानिक उपक्रमांतून अतिरिक्त उत्पन्न.'
  },
  {
    id: 'astitva_mart',
    titleMr: 'अस्तित्व मार्ट (सॅनिटरी पॅड्स व शॉपिंग)',
    titleEn: 'Astitva Mart (Sanitary Pads & Shopping)',
    taglineMr: 'सॅनिटरी नॅपकिन्स व दैनंदिन वस्तूंचे घरपोच वितरण',
    icon: ShoppingBag,
    color: '#2563eb',
    bgColor: '#eff6ff',
    featuresMr: [
      'महिलांसाठी उच्च दर्जाचे, ॲनायन चिपयुक्त सॅनिटरी पॅड्स',
      'वाजवी दरात गावात थेट घरपोच वितरण',
      'महिला बचत गटांच्या उत्पादनांना ऑनलाइन बाजारपेठ'
    ],
    repBenefitMr: 'नियमित ग्राहकांमुळे दरमहा ₹4,000 ते ₹7,000 स्थिर उत्पन्न.'
  },
  {
    id: 'all_digital_services',
    titleMr: 'इतर सर्व शासकीय व डिजिटल सेवा...',
    titleEn: 'All Government & Digital Services...',
    taglineMr: 'गावातील सर्व ऑनलाइन सेवांचे एकाच छताखाली केंद्र',
    icon: Layers,
    color: '#0d9488',
    bgColor: '#f0fdfa',
    featuresMr: [
      '७/१२, ८-अ, फेरफार उतारे डाउनलोड व प्रिंट',
      'पॅन कार्ड, आधार अपडेट व शासकीय योजना अर्ज',
      'मोबाईल रिचार्ज व वीज बिल भरणा'
    ],
    repBenefitMr: 'दैनंदिन ग्राहकांकडून नियमित रोख उत्पन्न.'
  }
];

export default function ServicesSection({ lang, onApplyClick }) {
  const isMr = lang === 'mr';
  const [activeServiceId, setActiveServiceId] = useState('astitva_mart');

  const currentService = POSTER_SERVICES.find(s => s.id === activeServiceId) || POSTER_SERVICES[0];

  return (
    <section className="services-poster-section" id="services">
      <div className="section-container">
        {/* Section Heading */}
        <div className="pro-section-header">
          <div className="pro-pill-badge">
            <Sparkles size={14} className="text-blue-600" />
            <span>{isMr ? 'डिजिटल इकोसिस्टम' : 'Inodayam Tech Ecosystem'}</span>
          </div>
          <h2 className="pro-section-title">
            {isMr ? 'आमच्या प्रमुख डिजिटल सेवा' : 'Our Core Digital Services'}
          </h2>
          <p className="pro-section-subtitle">
            {isMr 
              ? 'गाव प्रतिनिधी म्हणून तुम्हाला खालील सर्व सेवा आपल्या गावात देण्याचा अधिकृत अधिकार मिळेल:' 
              : 'As a Village Representative, you get authorized access to provide all these core services:'}
          </p>
        </div>

        {/* 2-Column Interactive Services Layout */}
        <div className="poster-services-container">
          {/* Left Column: Clean Service List Card */}
          <div className="poster-service-checklist-box">
            <div className="checklist-top-pill">
              <span>{isMr ? 'अधिकृत सेवा यादी' : 'Official Services'}</span>
            </div>

            <div className="checklist-items-stack">
              {POSTER_SERVICES.map((srv) => {
                const isSelected = srv.id === activeServiceId;
                const IconComp = srv.icon;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    className={`checklist-item-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => setActiveServiceId(srv.id)}
                  >
                    <div style={{display:'flex',alignItems:'center',gap:'0.55rem'}}>
                      <div className="check-box-icon" style={{ display: 'flex', alignItems: 'center' }}>
                        <IconComp size={16} className="check-icon-svg" />
                      </div>
                      <span className="checklist-item-title">
                        {isMr ? srv.titleMr : srv.titleEn}
                      </span>
                    </div>
                    <ChevronRight size={18} className="arrow-indicator" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Interactive Service Inspector */}
          <div className="service-details-inspector">
            <div className="inspector-card">
              <div className="inspector-head">
                <div 
                  className="inspector-icon-box"
                  style={{ backgroundColor: currentService.bgColor, color: currentService.color }}
                >
                  <currentService.icon size={30} />
                </div>
                <div>
                  <h3 className="inspector-title">
                    {isMr ? currentService.titleMr : currentService.titleEn}
                  </h3>
                  <p className="inspector-tagline">
                    {isMr ? currentService.taglineMr : currentService.titleEn}
                  </p>
                </div>
              </div>

              <div className="inspector-features-box">
                <span className="features-head">
                  {isMr ? 'या सेवेतील प्रमुख वैशिष्ट्ये:' : 'Key Features:'}
                </span>
                <ul className="features-list">
                  {currentService.featuresMr.map((feat, idx) => (
                    <li key={idx} className="feature-item">
                      <div className="feature-bullet" style={{ backgroundColor: currentService.color }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rep-earning-highlight">
                <span className="earning-badge">
                  {isMr ? 'प्रतिनिधीचा नफा / कमिशन:' : 'Representative Income:'}
                </span>
                <p className="earning-text">
                  {isMr ? currentService.repBenefitMr : currentService.repBenefitMr}
                </p>
              </div>

              <button 
                type="button" 
                className="inspector-apply-btn"
                onClick={onApplyClick}
              >
                <span>{isMr ? 'या सेवेसाठी प्रतिनिधी अर्ज करा' : 'Apply For This Service'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
