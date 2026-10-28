import React, { useState } from 'react';
import { 
  UserCheck, 
  TrendingUp, 
  Handshake, 
  Smartphone, 
  MapPin, 
  Users, 
  CheckCircle2, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const POSTER_BENEFITS = [
  {
    id: 1,
    titleMr: 'महिलांना स्वावलंबनाची संधी',
    titleEn: 'Women Self-Reliance Opportunity',
    descMr: 'गावातील महिलांना स्वतःच्या गावात राहून स्वाभिमानाने स्वतःचा डिजिटल व सॅनिटरी पॅड्सचा व्यवसाय सुरू करता येतो. कुटुंबाला आर्थिक हातभार लावण्याची उत्तम संधी.',
    icon: UserCheck,
    color: '#2563eb',
    bgColor: '#eff6ff',
    pillText: 'स्वावलंबन'
  },
  {
    id: 2,
    titleMr: 'स्थिर व नियमित उत्पन्न',
    titleEn: 'Stable & Regular Income',
    descMr: 'किमान ₹१०,००० च्या एकाच भांडवलात दरमहा किमान ₹१२,००० ते ₹१५,००० पर्यंत खात्रीशीर व नियमित उत्पन्न मिळते. कोणतेही लपलेले शुल्क नाही.',
    icon: TrendingUp,
    color: '#059669',
    bgColor: '#ecfdf5',
    pillText: 'दरमहा उत्पन्न'
  },
  {
    id: 3,
    titleMr: 'कंपनीकडून पूर्ण प्रशिक्षण व मार्गदर्शन',
    titleEn: 'Full Training & Guidance',
    descMr: 'Inodayam Tech तर्फे ॲप हाताळणी, ग्राहक संवाद, उत्पादनांचे ज्ञान आणि व्यवसाय वाढीचे १००% मोफत वैयक्तिक प्रशिक्षण दिले जाते.',
    icon: Handshake,
    color: '#0284c7',
    bgColor: '#f0f9ff',
    pillText: 'मोफत प्रशिक्षण'
  },
  {
    id: 4,
    titleMr: 'डिजिटल प्लॅटफॉर्मद्वारे संपूर्ण सपोर्ट',
    titleEn: '100% Digital Platform Support',
    descMr: 'मोबाईल ॲपद्वारे सर्व ऑर्डर, विद्यार्थी नोंदी, मालमत्ता सेवा आणि ग्राहक डेटा सहज मॅनेज करा. २४/७ कंपनी सपोर्ट उपलब्ध.',
    icon: Smartphone,
    color: '#4f46e5',
    bgColor: '#eef2ff',
    pillText: 'हाय-टेक प्लॅटफॉर्म'
  },
  {
    id: 5,
    titleMr: 'आपल्या गावातच काम करण्याची संधी',
    titleEn: 'Work in Your Own Village',
    descMr: 'शहरात जाण्याची किंवा रोज प्रवासाची मुळीच गरज नाही. आपल्या स्वतःच्या घरातून किंवा गावात लहान जागेतून हे केंद्र सुरू करा.',
    icon: MapPin,
    color: '#0d9488',
    bgColor: '#f0fdfa',
    pillText: 'आपल्या गावात'
  },
  {
    id: 6,
    titleMr: 'समाजात मान-सन्मान आणि ओळख',
    titleEn: 'Respect & Social Identity',
    descMr: 'गावातील अधिकृत Inodayam Tech प्रतिनिधी म्हणून ओळख. सरपंच, ग्रामसेवक, शाळा आणि गावकरी यांच्याशी थेट संपर्क व आदर.',
    icon: Users,
    color: '#1e293b',
    bgColor: '#f8fafc',
    pillText: 'प्रतिष्ठा व मान'
  }
];

export default function BenefitsSection({ lang }) {
  const isMr = lang === 'mr';
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  return (
    <section className="benefits-poster-section" id="benefits">
      <div className="section-container">
        {/* Section Header */}
        <div className="pro-section-header">
          <div className="pro-pill-badge">
            <Sparkles size={14} className="text-blue-600" />
            <span>{isMr ? 'प्रमुख फायदे' : 'Core Benefits'}</span>
          </div>
          <h2 className="pro-section-title">
            {isMr ? 'गाव प्रतिनिधी बनण्याचे ६ मोठे फायदे' : '6 Core Benefits of Becoming Village Representative'}
          </h2>
          <p className="pro-section-subtitle">
            {isMr 
              ? 'स्थानिक महिला सबलीकरण, खात्रीशीर दरमहा कमिशन आणि गावातच अधिकृत प्रतिष्ठा.' 
              : 'Local empowerment, regular monthly income, and village-wide respect.'}
          </p>
        </div>

        {/* 6 Clean Benefit Cards Grid */}
        <div className="pro-benefits-grid">
          {POSTER_BENEFITS.map((item) => {
            const IconComp = item.icon;
            return (
              <div 
                key={item.id} 
                className="pro-benefit-card"
                onClick={() => setSelectedBenefit(item)}
              >
                <div className="pro-benefit-top-row">
                  <div 
                    className="pro-benefit-icon-box"
                    style={{ backgroundColor: item.bgColor, color: item.color }}
                  >
                    <IconComp size={24} />
                  </div>
                  <span className="pro-benefit-pill">
                    {item.pillText}
                  </span>
                </div>

                <h3 className="pro-benefit-title">
                  {isMr ? item.titleMr : item.titleEn}
                </h3>

                <p className="pro-benefit-desc">
                  {isMr ? item.descMr : item.descMr}
                </p>

                <div className="pro-benefit-footer">
                  <span className="pro-learn-more-text">
                    {isMr ? 'सविस्तर वाचा' : 'Read details'}
                  </span>
                  <ArrowRight size={14} className="pro-arrow" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Benefit Details Modal */}
        {selectedBenefit && (
          <div className="benefit-modal-overlay" onClick={() => setSelectedBenefit(null)}>
            <div className="benefit-modal-card" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className="benefit-modal-close"
                onClick={() => setSelectedBenefit(null)}
              >
                <X size={18} />
              </button>

              <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1.25rem'}}>
                <div 
                  style={{
                    width:'52px',
                    height:'52px',
                    borderRadius:'14px',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor: selectedBenefit.bgColor,
                    color: selectedBenefit.color
                  }}
                >
                  <selectedBenefit.icon size={26} />
                </div>
                <div>
                  <span style={{fontSize:'0.75rem',fontWeight:'700',color:'#64748b',textTransform:'uppercase',letterSpacing:'0.05em'}}>
                    {selectedBenefit.pillText}
                  </span>
                  <h3 style={{fontSize:'1.2rem',fontWeight:'800',color:'#0f172a',margin:'0.2rem 0 0'}}>
                    {isMr ? selectedBenefit.titleMr : selectedBenefit.titleEn}
                  </h3>
                </div>
              </div>

              <p style={{fontSize:'0.95rem',color:'#475569',lineHeight:'1.6',marginBottom:'1.5rem'}}>
                {isMr ? selectedBenefit.descMr : selectedBenefit.descMr}
              </p>

              <div style={{background:'#f8fafc',borderRadius:'12px',padding:'1rem',border:'1px solid #e2e8f0',marginBottom:'1.25rem'}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.5rem',color:'#059669',fontWeight:'700',fontSize:'0.88rem',marginBottom:'0.35rem'}}>
                  <CheckCircle2 size={16} />
                  <span>{isMr ? 'कंपनीकडून मिळणारे सहकार्य:' : 'Support from Inodayam Tech:'}</span>
                </div>
                <p style={{fontSize:'0.85rem',color:'#64748b',margin:0,lineHeight:'1.5'}}>
                  {isMr 
                    ? 'प्रत्येक प्रतिनिधीला अधिकृत ओळखपत्र, ॲप प्रशिक्षण, मार्केटिंग साहित्य आणि २४/७ ग्राहक सहाय्य दिले जाते.' 
                    : 'Official ID, training, marketing collateral, and round-the-clock support.'}
                </p>
              </div>

              <button 
                type="button" 
                style={{
                  width:'100%',
                  background:'#0f172a',
                  color:'#ffffff',
                  border:'none',
                  padding:'0.75rem',
                  borderRadius:'10px',
                  fontWeight:'700',
                  fontSize:'0.92rem',
                  cursor:'pointer'
                }}
                onClick={() => setSelectedBenefit(null)}
              >
                {isMr ? 'समजले' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
