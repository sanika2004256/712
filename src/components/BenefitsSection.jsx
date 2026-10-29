import React, { useState } from 'react';
import { 
  UserCheck, 
  TrendingUp, 
  Handshake, 
  Smartphone, 
  MapPin, 
  Users, 
  Check, 
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Heart
} from 'lucide-react';

const POSTER_BENEFITS = [
  {
    id: 1,
    category: 'women',
    emoji: '👩‍💼',
    titleMr: 'महिला स्वावलंबनाची सुवर्णसंधी',
    titleEn: 'Women Self-Reliance Opportunity',
    descMr: 'गावातच राहून स्वाभिमानाने स्वतःचा व्यवसाय सुरू करा आणि कुटुंबाला आर्थिक हातभार लावा.',
    icon: UserCheck,
    color: '#e11d48',
    gradientBg: 'linear-gradient(145deg, #ffffff 0%, #fff1f2 50%, #ffe4e6 100%)',
    borderColor: '#fecdd3',
    pillText: 'महिला स्वावलंबन',
    pillBg: '#ffe4e6',
    pillColor: '#9f1239',
    perksMr: [
      'गावातच राहून स्वतःचा स्वाभिमानी व्यवसाय',
      'कुटुंबाला नियमित आर्थिक हातभार',
      'गावातील इतर महिलांना रोजगाराची प्रेरणा'
    ],
    metricMr: '१००% स्वाभिमान'
  },
  {
    id: 2,
    category: 'income',
    emoji: '💰',
    titleMr: 'स्थिर व नियमित दरमहा उत्पन्न',
    titleEn: 'Stable & Regular Monthly Income',
    descMr: 'फक्त ₹१०,००० भांडवलात दरमहा किमान ₹१२,००० ते ₹१५,०००+ खात्रीशीर उत्पन्न मिळवा.',
    icon: TrendingUp,
    color: '#059669',
    gradientBg: 'linear-gradient(145deg, #ffffff 0%, #ecfdf5 50%, #d1fae5 100%)',
    borderColor: '#a7f3d0',
    pillText: 'दरमहा उत्पन्न',
    pillBg: '#d1fae5',
    pillColor: '#065f46',
    perksMr: [
      'दरमहा थेट बँक खात्यात सुरक्षित कमिशन जमा',
      'उत्पादनांवर १०% ते २०% भरघोस नफा मार्जिन',
      'उत्कृष्ट कामगिरीवर विशेष मासिक बोनस'
    ],
    metricMr: '₹१२,००० - ₹१५,०००+'
  },
  {
    id: 3,
    category: 'support',
    emoji: '🎓',
    titleMr: 'पूर्ण मोफत प्रशिक्षण व किट',
    titleEn: '100% Free Training & Starter Kit',
    descMr: 'ॲप वापरणे, उत्पादनांची माहिती आणि व्यवसाय वाढीचे इनोदयमतर्फे १००% मोफत प्रशिक्षण.',
    icon: Handshake,
    color: '#d97706',
    gradientBg: 'linear-gradient(145deg, #ffffff 0%, #fffbeb 50%, #fef3c7 100%)',
    borderColor: '#fde68a',
    pillText: 'मोफत प्रशिक्षण',
    pillBg: '#fef3c7',
    pillColor: '#92400e',
    perksMr: [
      'मोबाईल ॲप वापरण्याचे मराठीत सोपे प्रशिक्षण',
      'विनामूल्य व्यवसाय किट व मार्केटिंग साहित्य',
      'कंपनीच्या तज्ज्ञांकडून निरंतर मार्गदर्शन'
    ],
    metricMr: '१००% मोफत'
  },
  {
    id: 4,
    category: 'support',
    emoji: '📱',
    titleMr: 'हाय-टेक डिजिटल प्लॅटफॉर्म',
    titleEn: '100% Digital Platform Support',
    descMr: 'मोबाईल ॲपद्वारे सर्व सेवांचे सहज व्यवस्थापन आणि २४/७ कंपनी सहाय्य उपलब्ध.',
    icon: Smartphone,
    color: '#0284c7',
    gradientBg: 'linear-gradient(145deg, #ffffff 0%, #eff6ff 50%, #dbeafe 100%)',
    borderColor: '#bfdbfe',
    pillText: 'डिजिटल ॲप',
    pillBg: '#dbeafe',
    pillColor: '#1e40af',
    perksMr: [
      'एका क्लिकवर सर्व सेवा व स्टॉक व्यवस्थापन',
      'ग्राहकांच्या नोंदी व ऑर्डर ट्रॅकिंग सोपे',
      '२४/७ कंपनी कस्टमर केअर सहाय्य'
    ],
    metricMr: '२४/७ सपोर्ट'
  },
  {
    id: 5,
    category: 'income',
    emoji: '🏡',
    titleMr: 'आपल्या गावातच घरबसल्या काम',
    titleEn: 'Work From Your Own Village',
    descMr: 'शहरात जाण्याची गरज नाही; आपल्या गावातून किंवा घरातूनच सन्मानपूर्वक केंद्र चालवा.',
    icon: MapPin,
    color: '#7c3aed',
    gradientBg: 'linear-gradient(145deg, #ffffff 0%, #f5f3ff 50%, #ede9fe 100%)',
    borderColor: '#ddd6fe',
    pillText: 'गावातच काम',
    pillBg: '#ede9fe',
    pillColor: '#5b21b6',
    perksMr: [
      'प्रवासाचा वेळ आणि खर्च १००% वाचतो',
      'घरातील कामे सांभाळून व्यवसाय सुरू ठेवण्याची सोय',
      'स्थानिक नागरिकांशी थेट ओळखीचा फायदा'
    ],
    metricMr: '० प्रवास खर्च'
  },
  {
    id: 6,
    category: 'women',
    emoji: '🎖️',
    titleMr: 'समाजात मान व अधिकृत ओळख',
    titleEn: 'Respect & Official Identity',
    descMr: 'गावात इनोदयम टेकचे अधिकृत प्रतिनिधी म्हणून सन्मानजनक ओळख आणि आदर.',
    icon: Users,
    color: '#0d9488',
    gradientBg: 'linear-gradient(145deg, #ffffff 0%, #f0fdfa 50%, #ccfbf1 100%)',
    borderColor: '#99f6e4',
    pillText: 'प्रतिष्ठा व मान',
    pillBg: '#ccfbf1',
    pillColor: '#115e59',
    perksMr: [
      'इनोदयम कंपनीचे अधिकृत ओळखपत्र (ID Card)',
      'गावातील विकास कामांत सन्माननीय सहभाग',
      'सामाजिक आदर व स्वतःचे स्वतंत्र व्यक्तिमत्त्व'
    ],
    metricMr: 'अधिकृत ID कार्ड'
  }
];

const CATEGORIES = [
  { id: 'all', labelMr: '✨ सर्व ६ फायदे', labelEn: 'All Benefits' },
  { id: 'income', labelMr: '💰 उत्पन्न व व्यवसाय', labelEn: 'Income & Business' },
  { id: 'women', labelMr: '👩‍💼 महिला व सन्मान', labelEn: 'Women & Respect' },
  { id: 'support', labelMr: '🎓 प्रशिक्षण व सपोर्ट', labelEn: 'Training & Support' }
];

export default function BenefitsSection({ lang, onApplyClick }) {
  const isMr = lang === 'mr';
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedCardId, setExpandedCardId] = useState(1); // default expand first card for preview

  const toggleExpand = (id) => {
    setExpandedCardId(prev => (prev === id ? null : id));
  };

  const filteredBenefits = activeCategory === 'all' 
    ? POSTER_BENEFITS 
    : POSTER_BENEFITS.filter(b => b.category === activeCategory);

  return (
    <section className="benefits-poster-section" id="benefits">
      <div className="section-container">
        {/* Sweet Section Header */}
        <div className="sweet-benefits-header">
          <div className="sweet-badge-pill">
            <Sparkles size={14} className="text-emerald" />
            <span>{isMr ? 'खास आपल्यासाठी • मोठे फायदे' : 'Special For You • Core Benefits'}</span>
          </div>

          <h2 className="sweet-section-title">
            {isMr ? (
              <>
                गाव प्रतिनिधी बनण्याचे <span className="fresh-gradient-text">६ मोठे फायदे</span>
              </>
            ) : (
              <>
                6 Key Benefits of Becoming a <span className="fresh-gradient-text">Village Representative</span>
              </>
            )}
          </h2>

          <p className="sweet-section-subtitle">
            {isMr 
              ? 'स्थानिक महिला सबलीकरण, खात्रीशीर दरमहा कमिशन आणि गावातच अधिकृत मान-सन्मान.' 
              : 'Local empowerment, guaranteed monthly earnings, and village-wide respect.'}
          </p>

          {/* Interactive Filter Pills */}
          <div className="sweet-filter-pills-row">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`sweet-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{isMr ? cat.labelMr : cat.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sweet Interactive Bento Grid */}
        <div className="sweet-benefits-grid">
          {filteredBenefits.map((item) => {
            const IconComp = item.icon;
            const isExpanded = expandedCardId === item.id;

            return (
              <div 
                key={item.id} 
                className={`sweet-benefit-card ${isExpanded ? 'card-expanded' : ''}`}
                style={{
                  background: item.gradientBg,
                  borderColor: isExpanded ? item.color : item.borderColor
                }}
                onClick={() => toggleExpand(item.id)}
              >
                {/* Card Top Row */}
                <div className="sweet-card-top">
                  <div 
                    className="sweet-icon-avatar"
                    style={{ 
                      backgroundColor: '#ffffff', 
                      color: item.color,
                      boxShadow: `0 4px 12px ${item.color}25`
                    }}
                  >
                    <IconComp size={22} />
                  </div>

                  <div className="sweet-card-badges-group">
                    <span 
                      className="sweet-metric-chip"
                      style={{ 
                        backgroundColor: '#ffffff',
                        borderColor: item.borderColor,
                        color: item.color
                      }}
                    >
                      {item.metricMr}
                    </span>

                    <span 
                      className="sweet-category-chip"
                      style={{ 
                        backgroundColor: item.pillBg, 
                        color: item.pillColor 
                      }}
                    >
                      {item.pillText}
                    </span>
                  </div>
                </div>

                {/* Card Headline */}
                <h3 className="sweet-card-title">
                  <span className="sweet-card-emoji">{item.emoji}</span>
                  <span>{isMr ? item.titleMr : item.titleEn}</span>
                </h3>

                {/* Card Short Description */}
                <p className="sweet-card-desc">
                  {isMr ? item.descMr : item.descMr}
                </p>

                {/* Interactive Toggle Button */}
                <div className="sweet-card-toggle-row">
                  <span className="sweet-toggle-label" style={{ color: item.color }}>
                    {isExpanded ? (isMr ? 'माहिती लपवा' : 'Hide details') : (isMr ? 'अधिक सविस्तर पहा' : 'View perks')}
                  </span>
                  <div 
                    className="sweet-toggle-circle"
                    style={{ 
                      backgroundColor: isExpanded ? item.color : '#ffffff',
                      color: isExpanded ? '#ffffff' : item.color,
                      borderColor: item.borderColor
                    }}
                  >
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </div>
                </div>

                {/* Expandable Perks Section */}
                {isExpanded && (
                  <div className="sweet-expanded-content" onClick={(e) => e.stopPropagation()}>
                    <div className="sweet-perks-list">
                      {item.perksMr.map((perk, pIdx) => (
                        <div key={pIdx} className="sweet-perk-item">
                          <div 
                            className="perk-check-icon"
                            style={{ backgroundColor: item.pillBg, color: item.color }}
                          >
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sweet Action Button */}
                    {onApplyClick && (
                      <button 
                        type="button" 
                        className="sweet-apply-cta-btn"
                        style={{ backgroundColor: item.color }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onApplyClick();
                        }}
                      >
                        <span>{isMr ? 'हा फायदा मिळवा — अर्ज करा' : 'Claim This Benefit — Apply'}</span>
                        <ArrowRight size={15} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
