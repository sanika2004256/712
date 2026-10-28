import React from 'react';
import { X, BookOpen, HelpCircle } from 'lucide-react';

const GLOSSARY_ITEMS = [
  {
    termMr: 'भोगवटादार वर्ग - १',
    termEn: 'Bhogwatadar Class - 1',
    descMr: 'या जमिनीवर शेतकऱ्याचे पूर्ण व स्वतंत्र मालकी हक्क असतात. अशी जमीन विकण्यासाठी, हस्तांतरित करण्यासाठी किंवा वारसांना देण्यासाठी जिल्हाधिकाऱ्यांच्या पूर्वपरवानगीची गरज नसते.'
  },
  {
    termMr: 'भोगवटादार वर्ग - २',
    termEn: 'Bhogwatadar Class - 2',
    descMr: 'शासनाने विशिष्ट शर्तींवर किंवा वतन/इनाम म्हणून दिलेल्या जमिनी. अशी जमीन विकण्यासाठी अथवा हस्तांतरित करण्यासाठी सक्षम प्राधिकाऱ्यांची (उदा. जिल्हाधिकारी) रीतसर पूर्वपरवानगी आवश्यक असते.'
  },
  {
    termMr: 'पोटखराब (वर्ग अ व ब)',
    termEn: 'Potkharab (Class A & B)',
    descMr: 'शेतजमिनीतील लागवडीस अयोग्य असलेला भाग. वर्ग (अ): नाले, दगडगोटे, खाणी इत्यादींमुळे लागवड न होणारा भाग. वर्ग (ब): विहीर, रस्ता, पाणंद, कालवा यासाठी वापरलेला भाग.'
  },
  {
    termMr: 'फेरफार (Mutation Entry)',
    termEn: 'Ferfar / Mutation Register',
    descMr: 'जमिनीच्या मालकी हक्कात झालेला कोणताही बदल (उदा. खरेदी-विक्री, वारस नोंद, वाटप, बोजा नोंद किंवा कमी करणे) नोंदवणारे गाव नमुना ६ मधील अधिकृत रजिस्टर.'
  },
  {
    termMr: 'गाव नमुना ८-अ (८अ उतारा)',
    termEn: 'Village Form 8-A',
    descMr: 'एका गावात एका विशिष्ट खातेदाराच्या नावावर असलेल्या सर्व जमिनींची व सर्व्हे नंबरची एकत्रित गोळाबेरीज दाखवणारी खातेवही.'
  },
  {
    termMr: 'आकारणी (Assessment)',
    termEn: 'Land Revenue Assessment',
    descMr: 'जमिनीच्या प्रत, पाणी उपलब्धता व उत्पादनक्षमतेनुसार शासनास देय असलेला जमीन महसूल कर (रुपये व पैशात).'
  },
  {
    termMr: 'बोजा (Encumbrance / Lien)',
    termEn: 'Boja / Bank Loan Lien',
    descMr: 'जमिनीवर एखाद्या बँकेचे किंवा पतसंस्थेचे पीक कर्ज, तारण अथवा न्यायालयाचा स्थगिती आदेश असल्यास त्याची ७/१२ मधील इतर हक्कात केलेली नोंद.'
  },
  {
    termMr: 'ULPIN (युनिक लँड पार्सल आयडेंटिफायर)',
    termEn: 'Unique Land Parcel ID',
    descMr: 'प्रत्येक जमिनीच्या तुकड्याला मिळालेला १४ अंकी अद्वितीय भू-आधार क्रमांक.'
  }
];

export default function GlossaryModal({ isOpen, onClose, lang }) {
  if (!isOpen) return null;
  const isMr = lang === 'mr';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <BookOpen className="text-green-700" size={22} />
            <h3 className="modal-title">
              {isMr ? '७/१२ मार्गदर्शक व महसूल शब्दावली' : '7/12 Land Records Glossary'}
            </h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-desc">
            {isMr 
              ? 'सातबारा आणि जमिनीच्या कागदपत्रांमध्ये वापरल्या जाणाऱ्या महत्त्वाच्या शब्दांचे अर्थ:' 
              : 'Meanings of key revenue and land record terms in Maharashtra:'}
          </p>

          <div className="glossary-grid">
            {GLOSSARY_ITEMS.map((item, idx) => (
              <div key={idx} className="glossary-card">
                <div className="glossary-card-header">
                  <HelpCircle size={16} className="text-amber-600 inline mr-1 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="glossary-term-mr">{item.termMr}</h4>
                    <span className="glossary-term-en">{item.termEn}</span>
                  </div>
                </div>
                <p className="glossary-desc">{item.descMr}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
