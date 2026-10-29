import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2, Sparkles, Building2, Home } from 'lucide-react';
import RegistrationSection from './RegistrationSection';
import InodayamLogo from './InodayamLogo';

export default function ApplyPage({ lang, onBackToHome, onApplicationSuccess }) {
  const isMr = lang === 'mr';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="apply-page-wrapper">
      {/* Top Professional Navigation Bar */}
      <div className="apply-page-top-nav">
        <div className="section-container apply-page-nav-content">
          <button 
            type="button" 
            className="apply-back-btn"
            onClick={onBackToHome}
            aria-label="Back to Home"
          >
            <ArrowLeft size={18} />
            <span>{isMr ? 'मुख्य पृष्ठावर परत जा' : 'Back to Home'}</span>
          </button>

          <div className="apply-page-brand-badge" onClick={onBackToHome} style={{ cursor: 'pointer' }}>
            <InodayamLogo variant="full" size={36} />
          </div>

          <div className="apply-page-official-badge">
            <span className="apply-live-dot" />
            <span>{isMr ? 'अधिकृत नोंदणी पोर्टल' : 'Official Portal'}</span>
          </div>
        </div>
      </div>

      {/* Hero Header Banner for Dedicated Application Page */}
      <div className="apply-page-header-banner">
        <div className="section-container">
          <div className="apply-header-badge">
            <ShieldCheck size={16} className="text-emerald" />
            <span>{isMr ? 'महाराष्ट्र शासन LGD पडताळणी प्रणाली' : 'Government LGD Verified System'}</span>
          </div>
          <h1 className="apply-header-title">
            {isMr ? (
              <>
                गाव प्रतिनिधी <span className="fresh-gradient-text">अधिकृत नोंदणी अर्ज</span>
              </>
            ) : (
              'Village Representative Official Application Form'
            )}
          </h1>
          <p className="apply-header-subtitle">
            {isMr 
              ? 'आपल्या गावाचे अधिकृत इनोदयम प्रतिनिधी होण्यासाठी खालील माहिती अचूक भरा. अवघ्या २ मिनिटांत नोंदणी पूर्ण होते.' 
              : 'Complete your registration to become the official representative for your village in just 2 minutes.'}
          </p>


        </div>
      </div>

      {/* Main Registration Form Component */}
      <div className="apply-form-container">
        <RegistrationSection
          lang={lang}
          onApplicationSuccess={onApplicationSuccess}
        />
      </div>
    </div>
  );
}
