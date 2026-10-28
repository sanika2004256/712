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
  Sparkles 
} from 'lucide-react';

const POSTER_BENEFITS = [
  {
    id: 1,
    titleMr: 'महिलांना स्वावलंबनाची संधी',
    titleEn: 'Women Self-Reliance Opportunity',
    descMr: 'गावातील महिलांना स्वतःच्या गावात राहून स्वाभिमानाने स्वतःचा डिजिटल व सॅनिटरी पॅड्सचा व्यवसाय सुरू करता येतो. कुटुंबाला आर्थिक हातभार लावण्याची उत्तम संधी.',
    icon: UserCheck,
    color: '#e11d48',
    bgColor: '#ffe4e6',
    pillText: 'स्वावलंबन'
  },
  {
    id: 2,
    titleMr: 'स्थिर व नियमित उत्पन्न',
    titleEn: 'Stable & Regular Income',
    descMr: 'किमान ₹१०,००० च्या एकाच भांडवलात दरमहा किमान ₹१२,००० ते ₹१५,००० पर्यंत खात्रीशीर व नियमित उत्पन्न मिळते. कोणतेही लपलेले शुल्क नाही.',
    icon: TrendingUp,
    color: '#16a34a',
    bgColor: '#dcfce7',
    pillText: 'दरमहा उत्पन्न'
  },
  {
    id: 3,
    titleMr: 'कंपनीकडून पूर्ण प्रशिक्षण व मार्गदर्शन',
    titleEn: 'Full Training & Guidance',
    descMr: 'Inodayam Tech तर्फे ॲप हाताळणी, ग्राहक संवाद, उत्पादनांचे ज्ञान आणि व्यवसाय वाढीचे १००% मोफत वैयक्तिक प्रशिक्षण दिले जाते.',
    icon: Handshake,
    color: '#ea580c',
    bgColor: '#ffedd5',
    pillText: 'मोफत प्रशिक्षण'
  },
  {
    id: 4,
    titleMr: 'डिजिटल प्लॅटफॉर्मद्वारे संपूर्ण सपोर्ट',
    titleEn: '100% Digital Platform Support',
    descMr: 'मोबाईल ॲपद्वारे सर्व ऑर्डर, विद्यार्थी नोंदी, मालमत्ता सेवा आणि ग्राहक डेटा सहज मॅनेज करा. २४/७ कंपनी सपोर्ट उपलब्ध.',
    icon: Smartphone,
    color: '#0284c7',
    bgColor: '#e0f2fe',
    pillText: 'हाय-टेक प्लॅटफॉर्म'
  },
  {
    id: 5,
    titleMr: 'आपल्या गावातच काम करण्याची संधी',
    titleEn: 'Work in Your Own Village',
    descMr: 'शहरात जाण्याची किंवा रोज प्रवासाची मुळीच गरज नाही. आपल्या स्वतःच्या घरातून किंवा गावात लहान जागेतून हे केंद्र सुरू करा.',
    icon: MapPin,
    color: '#d946ef',
    bgColor: '#fae8ff',
    pillText: 'आपल्या गावात'
  },
  {
    id: 6,
    titleMr: 'समाजात मान-सन्मान आणि ओळख',
    titleEn: 'Respect & Social Identity',
    descMr: 'गावातील अधिकृत Inodayam Tech प्रतिनिधी म्हणून ओळख. सरपंच, ग्रामसेवक, शाळा आणि गावकरी यांच्याशी थेट संपर्क व आदर.',
    icon: Users,
    color: '#0d9488',
    bgColor: '#ccfbf1',
    pillText: 'प्रतिष्ठा व मान'
  }
];

export default function BenefitsSection({ lang }) {
  const isMr = lang === 'mr';
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  return (
    <section className="benefits-poster-section" id="benefits">
      <div className="section-container">
        {/* Main Poster-Style Benefits Container */}
        <div className="poster-benefits-bar-wrapper">
          {/* Top Blue Header Tab (Exact match to flyer) */}
          <div className="poster-benefits-blue-tab">
            <Sparkles size={18} className="text-amber-300" />
            <span>{isMr ? 'गाव प्रतिनिधीचे फायदे' : 'Benefits of Village Representative'}</span>
          </div>

          {/* 6 Circular Icon Badges Row */}
          <div className="poster-benefits-circles-grid">
            {POSTER_BENEFITS.map((item) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={item.id} 
                  className="benefit-circle-item group cursor-pointer"
                  onClick={() => setSelectedBenefit(item)}
                >
                  <div 
                    className="circle-icon-badge"
                    style={{ backgroundColor: item.color }}
                  >
                    <IconComp size={28} className="text-white transform group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="circle-item-title">
                    {isMr ? item.titleMr : item.titleEn}
                  </h4>
                  <span className="circle-learn-more">
                    {isMr ? 'तपशील पहा +' : 'Details +'}
                  </span>
                </div>
              );
            })}
          </div>
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
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: selectedBenefit.color }}
                >
                  <selectedBenefit.icon size={30} className="text-white" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {selectedBenefit.pillText}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    {isMr ? selectedBenefit.titleMr : selectedBenefit.titleEn}
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {selectedBenefit.descMr}
              </p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
                <span className="text-sm font-semibold text-emerald-900">
                  {isMr ? 'Inodayam Tech तर्फे या सुविधेचे संपूर्ण मार्गदर्शन मिळेल.' : 'Guaranteed guidance provided by Inodayam Tech.'}
                </span>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
                  onClick={() => setSelectedBenefit(null)}
                >
                  {isMr ? 'समजले (Close)' : 'Got it'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
