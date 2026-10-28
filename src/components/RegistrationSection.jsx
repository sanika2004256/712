import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Navigation, 
  Home, 
  Search, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Store, 
  Send, 
  CheckCircle2, 
  Printer, 
  Share2, 
  RefreshCw, 
  Loader2,
  Sparkles,
  Heart,
  FileCheck
} from 'lucide-react';
import { getDistrictsList, getTalukasOfDistrict, getVillagesOfTaluka } from '../services/apiService';
import { submitFranchiseApplication } from '../services/firebase';

const FRANCHISE_MODELS = [
  {
    id: 'village_unit',
    titleMr: 'ग्रामपंचायत / गाव पातळी केंद्र',
    titleEn: 'Village / Gram Panchayat Kendra',
    investment: '₹१०,००० ते २५,०००',
    descMr: 'गावातील महिलांसाठी घरातून किंवा छोट्या दुकानातून सॅनिटरी पॅड वितरण व विक्री केंद्र.',
    badge: 'सर्वात लोकप्रिय'
  },
  {
    id: 'taluka_distributor',
    titleMr: 'तालुका मुख्य वितरक फ्रँचायझी',
    titleEn: 'Taluka Main Distributor',
    investment: '₹५०,००० ते १,००,०००',
    descMr: 'संपूर्ण तालुक्यातील सर्व गावे, मेडिकल आणि दुकानांना सॅनिटरी पॅडचा अधिकृत पुरवठा.',
    badge: 'उच्च नफा'
  },
  {
    id: 'shg_model',
    titleMr: 'महिला बचत गट विशेष मॉडेल',
    titleEn: 'Women Self Help Group (SHG)',
    investment: '₹१५,००० ते २०,०००',
    descMr: 'बचत गटातील महिलांना रोजगार मिळवून देणारे खास सवलतीचे व सामूहिक विक्री मॉडेल.',
    badge: 'महिला सक्षमीकरण'
  },
  {
    id: 'retail_store',
    titleMr: 'दुकान / रिटेल फ्रँचायझी',
    titleEn: 'Retail Store / Super Shop',
    investment: '₹३०,००० ते ५०,०००',
    descMr: 'अस्तित्व ब्रँडचे अधिकृत सॅनिटरी पॅड काउंटर तुमच्या चालू असलेल्या दुकानात सुरू करा.',
    badge: 'अतिरिक्त उत्पन्न'
  }
];

const PREMISES_OPTIONS = [
  { id: 'owned', labelMr: 'स्वतःचे दुकान / जागा आहे', labelEn: 'Owned Shop / Space' },
  { id: 'rented', labelMr: 'भाड्याने दुकान घेणार आहे', labelEn: 'Planning to Rent' },
  { id: 'home', labelMr: 'सुरुवातीला घरातूनच वितरण करणार', labelEn: 'Home Distribution' },
  { id: 'soon', labelMr: 'लवकरच जागा निश्चित करणार', labelEn: 'Will Finalize Soon' }
];

export default function RegistrationSection({ lang, onApplicationSuccess }) {
  const isMr = lang === 'mr';

  // State Dropdown
  const [selectedState, setSelectedState] = useState('Maharashtra');

  // Cascading Location Dropdowns
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictCode, setSelectedDistrictCode] = useState('');
  const [talukas, setTalukas] = useState([]);
  const [selectedTalukaCode, setSelectedTalukaCode] = useState('');
  const [villages, setVillages] = useState([]);
  const [selectedVillageCode, setSelectedVillageCode] = useState('');

  // Loading States
  const [loadingDistricts, setLoadingDistricts] = useState(true);
  const [loadingTalukas, setLoadingTalukas] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Village search inside dropdown
  const [villageSearch, setVillageSearch] = useState('');

  // Applicant Personal & Business Form Details
  const [applicantName, setApplicantName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [selectedModel, setSelectedModel] = useState('village_unit');
  const [premisesStatus, setPremisesStatus] = useState('owned');
  const [experienceNote, setExperienceNote] = useState('');

  // Success Receipt State
  const [submittedData, setSubmittedData] = useState(null);

  // Initial Load: Districts
  useEffect(() => {
    let isMounted = true;
    setLoadingDistricts(true);
    getDistrictsList()
      .then(dList => {
        if (isMounted) {
          setDistricts(dList);
          setLoadingDistricts(false);
          // Set Pune by default for convenience if available
          const pune = dList.find(d => d.en.toLowerCase() === 'pune' || d.mr.includes('पुणे'));
          if (pune) {
            setSelectedDistrictCode(pune.code || pune.id);
          } else if (dList.length > 0) {
            setSelectedDistrictCode(dList[0].code || dList[0].id);
          }
        }
      })
      .catch(err => {
        console.error(err);
        if (isMounted) setLoadingDistricts(false);
      });

    return () => { isMounted = false; };
  }, []);

  // District Change -> Load Talukas
  useEffect(() => {
    if (!selectedDistrictCode) {
      setTalukas([]);
      setSelectedTalukaCode('');
      setVillages([]);
      setSelectedVillageCode('');
      return;
    }

    let isMounted = true;
    setLoadingTalukas(true);
    const distObj = districts.find(d => (d.code || d.id) === selectedDistrictCode);
    const distSlug = distObj?.slug || distObj?.id;

    getTalukasOfDistrict(selectedDistrictCode, distSlug)
      .then(tList => {
        if (isMounted) {
          setTalukas(tList);
          setLoadingTalukas(false);
          if (tList.length > 0) {
            setSelectedTalukaCode(tList[0].code || tList[0].id);
          } else {
            setSelectedTalukaCode('');
          }
        }
      })
      .catch(err => {
        console.error(err);
        if (isMounted) setLoadingTalukas(false);
      });

    return () => { isMounted = false; };
  }, [selectedDistrictCode, districts]);

  // Taluka Change -> Load Villages
  useEffect(() => {
    if (!selectedDistrictCode || !selectedTalukaCode) {
      setVillages([]);
      setSelectedVillageCode('');
      return;
    }

    let isMounted = true;
    setLoadingVillages(true);
    const distObj = districts.find(d => (d.code || d.id) === selectedDistrictCode);
    const talukaObj = talukas.find(t => (t.code || t.id) === selectedTalukaCode);
    const distSlug = distObj?.slug || distObj?.id;
    const talukaSlug = talukaObj?.en?.toLowerCase().replace(/[^a-z0-9]/g, '_');

    getVillagesOfTaluka(selectedDistrictCode, selectedTalukaCode, distSlug, talukaSlug)
      .then(vList => {
        if (isMounted) {
          setVillages(vList);
          setLoadingVillages(false);
          if (vList.length > 0) {
            setSelectedVillageCode(vList[0].code || vList[0].en);
          } else {
            setSelectedVillageCode('');
          }
        }
      })
      .catch(err => {
        console.error(err);
        if (isMounted) setLoadingVillages(false);
      });

    return () => { isMounted = false; };
  }, [selectedDistrictCode, selectedTalukaCode, districts, talukas]);

  // Sync WhatsApp with Mobile
  useEffect(() => {
    if (sameAsMobile) {
      setWhatsappNumber(mobileNumber);
    }
  }, [mobileNumber, sameAsMobile]);

  // Filtered villages
  const filteredVillages = useMemo(() => {
    if (!villageSearch.trim()) return villages;
    const q = villageSearch.toLowerCase().trim();
    return villages.filter(v => 
      v.en.toLowerCase().includes(q) || 
      v.mr.includes(q) || 
      (v.code && v.code.includes(q))
    );
  }, [villages, villageSearch]);

  const currentDistrict = districts.find(d => (d.code || d.id) === selectedDistrictCode);
  const currentTaluka = talukas.find(t => (t.code || t.id) === selectedTalukaCode);
  const currentVillage = villages.find(v => (v.code || v.en) === selectedVillageCode);

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!applicantName.trim() || !mobileNumber.trim()) {
      alert(isMr ? 'कृपया अर्जदाराचे नाव आणि मोबाईल नंबर टाका.' : 'Please enter Applicant Name and Mobile Number.');
      return;
    }

    if (!currentDistrict || !currentTaluka || !currentVillage) {
      alert(isMr ? 'कृपया राज्य, जिल्हा, तालुका आणि गाव निवडा.' : 'Please select State, District, Taluka and Village.');
      return;
    }

    setSubmitting(true);

    const modelObj = FRANCHISE_MODELS.find(m => m.id === selectedModel);
    const premisesObj = PREMISES_OPTIONS.find(p => p.id === premisesStatus);

    const formData = {
      state: selectedState,
      district: currentDistrict.mr,
      districtEn: currentDistrict.en,
      districtCode: currentDistrict.code || currentDistrict.id,
      taluka: currentTaluka.mr,
      talukaEn: currentTaluka.en,
      talukaCode: currentTaluka.code || currentTaluka.id,
      village: currentVillage.mr || currentVillage.en,
      villageEn: currentVillage.en,
      villageCode: currentVillage.code || '',
      applicantName: applicantName.trim(),
      mobileNumber: mobileNumber.trim(),
      whatsappNumber: (sameAsMobile ? mobileNumber : whatsappNumber).trim(),
      email: email.trim(),
      address: address.trim(),
      pincode: pincode.trim(),
      franchiseModelId: selectedModel,
      franchiseModelTitle: modelObj?.titleMr || selectedModel,
      franchiseInvestment: modelObj?.investment || '₹१०,००० ते २५,०००',
      premisesStatus: premisesObj?.labelMr || premisesStatus,
      experienceNote: experienceNote.trim(),
      preferredService: 'अस्तित्व सॅनिटरी पॅड व गाव प्रतिनिधी केंद्र'
    };

    try {
      const savedDoc = await submitFranchiseApplication(formData);
      setSubmittedData(savedDoc);
      if (onApplicationSuccess) {
        onApplicationSuccess(savedDoc);
      }
    } catch (err) {
      console.error('Error submitting franchise application:', err);
      alert(isMr ? 'अर्ज सबमिट करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.' : 'Error submitting application.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    if (!submittedData) return;
    const text = encodeURIComponent(
      `*अस्तित्व सॅनिटरी पॅड - फ्रँचायझी अर्ज नोंदणी पावती*\n` +
      `अर्ज क्रमांक: ${submittedData.applicationNumber}\n` +
      `अर्जदार: ${submittedData.applicantName}\n` +
      `स्थान: ${submittedData.village}, ${submittedData.taluka}, ${submittedData.district}\n` +
      `मॉडेल: ${submittedData.franchiseModelTitle}\n` +
      `मोबाईल: ${submittedData.mobileNumber}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // If application was just submitted, show sweet success receipt!
  if (submittedData) {
    return (
      <section className="registration-section" id="register">
        <div className="section-container">
          <div className="receipt-view-wrapper">
            <div className="receipt-card printable-receipt">
              <div className="receipt-header-banner">
                <div className="receipt-badge-top">
                  <CheckCircle2 size={16} className="inline mr-1 text-emerald-600" />
                  {isMr ? 'अर्ज यशस्वीपणे नोंदवला गेला!' : 'Application Submitted!'}
                </div>
                <h2 className="receipt-title">
                  {isMr ? 'अस्तित्व सॅनिटरी पॅड फ्रँचायझी पावती' : 'Franchise Application Receipt'}
                </h2>
                <p className="receipt-sub">
                  {isMr 
                    ? 'तुमचा अर्ज सुरक्षितपणे गुगल फायरबेसवर जतन झाला आहे.' 
                    : 'Application securely saved in Firebase Firestore.'}
                </p>
              </div>

              {/* Application Number Callout */}
              <div className="app-number-callout">
                <span className="app-no-label">{isMr ? 'अधिकृत अर्ज क्रमांक:' : 'Application Number:'}</span>
                <strong className="app-no-value">{submittedData.applicationNumber}</strong>
                <span className="app-time-badge">{new Date(submittedData.createdAt).toLocaleString('mr-IN')}</span>
              </div>

              {/* Details Table */}
              <div className="receipt-details-grid">
                <div className="receipt-info-item">
                  <span className="receipt-item-label">{isMr ? 'अर्जदाराचे नाव:' : 'Applicant Name:'}</span>
                  <strong className="receipt-item-val">{submittedData.applicantName}</strong>
                </div>

                <div className="receipt-info-item">
                  <span className="receipt-item-label">{isMr ? 'मोबाईल / व्हॉट्सॲप:' : 'Mobile / WhatsApp:'}</span>
                  <strong className="receipt-item-val">{submittedData.mobileNumber} / {submittedData.whatsappNumber}</strong>
                </div>

                <div className="receipt-info-item">
                  <span className="receipt-item-label">{isMr ? 'गाव, तालुका व जिल्हा:' : 'Location:'}</span>
                  <strong className="receipt-item-val text-emerald-800">{submittedData.village}, {submittedData.taluka}, {submittedData.district}</strong>
                </div>

                <div className="receipt-info-item">
                  <span className="receipt-item-label">{isMr ? 'फ्रँचायझी मॉडेल:' : 'Franchise Model:'}</span>
                  <strong className="receipt-item-val text-rose-700">{submittedData.franchiseModelTitle} ({submittedData.franchiseInvestment})</strong>
                </div>

                <div className="receipt-info-item full-span">
                  <span className="receipt-item-label">{isMr ? 'दुकान / जागा उपलब्धता:' : 'Premises Status:'}</span>
                  <strong className="receipt-item-val">{submittedData.premisesStatus}</strong>
                </div>

                {submittedData.address && (
                  <div className="receipt-info-item full-span">
                    <span className="receipt-item-label">{isMr ? 'पत्ता व पिनकोड:' : 'Address:'}</span>
                    <span className="receipt-item-val">{submittedData.address} {submittedData.pincode ? `- ${submittedData.pincode}` : ''}</span>
                  </div>
                )}
              </div>

              <div className="receipt-next-steps">
                <h4 className="next-steps-title">
                  <Sparkles size={16} className="inline mr-1 text-rose-600" />
                  {isMr ? 'पुढील प्रक्रिया (Next Steps):' : 'Next Steps:'}
                </h4>
                <p className="next-steps-desc">
                  {isMr 
                    ? 'कंपनीचे प्रतिनिधी २४ ते ४८ तासांत आपल्याशी संपर्क साधतील आणि संपूर्ण व्यवसाय किट, आयडी कार्ड व मोफत मार्गदर्शन उपलब्ध करून देतील.' 
                    : 'Our representative will contact you within 24-48 hours.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="receipt-actions-row no-print">
                <button type="button" className="receipt-btn print-receipt-btn" onClick={handlePrintReceipt}>
                  <Printer size={16} className="inline mr-1" />
                  <span>{isMr ? 'प्रिंट / PDF' : 'Print / PDF'}</span>
                </button>

                <button type="button" className="receipt-btn whatsapp-share-btn" onClick={handleShareWhatsApp}>
                  <Share2 size={16} className="inline mr-1" />
                  <span>{isMr ? 'व्हॉट्सॲप' : 'WhatsApp'}</span>
                </button>

                <button 
                  type="button" 
                  className="receipt-btn new-app-btn"
                  onClick={() => {
                    setSubmittedData(null);
                    setApplicantName('');
                    setMobileNumber('');
                    setWhatsappNumber('');
                    setAddress('');
                    setPincode('');
                    setExperienceNote('');
                  }}
                >
                  <RefreshCw size={15} className="inline mr-1" />
                  <span>{isMr ? 'नवीन अर्ज' : 'New Form'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="registration-section" id="register">
      <div className="section-container">
        {/* Sweet Form Card exactly matching previous photo */}
        <div className="sweet-form-card">
          {/* Hero Intro Banner */}
          <div className="sweet-hero-banner">
            <div className="hero-heart-badge">
              <Heart size={14} className="inline mr-1 text-rose-500 fill-rose-500" />
              <span>{isMr ? 'महिला आरोग्य व स्वावलंबन' : 'Health & Self-Reliance'}</span>
            </div>
            <h2 className="sweet-hero-title">
              {isMr ? 'अस्तित्व सॅनिटरी पॅड फ्रँचायझी नोंदणी' : 'Franchise Registration'}
            </h2>
            <p className="sweet-hero-subtitle">
              {isMr 
                ? 'कमी भांडवल, खात्रीशीर नफा आणि स्वतःचा सन्मानजनक व्यवसाय! खालील माहिती भरून फ्रँचायझीसाठी अर्ज करा:' 
                : 'Start your own Sanitary Pad distribution business in your area:'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="franchise-form-body">
            {/* ======================================================== */}
            {/* STEP 1: LOCATION HIERARCHY */}
            {/* ======================================================== */}
            <div className="form-step-section">
              <div className="step-section-header">
                <div className="step-circle-badge">१</div>
                <div>
                  <h3 className="step-section-title">
                    {isMr ? 'स्थान निवडा (राज्य, जिल्हा, तालुका आणि गाव)' : 'Select Location'}
                  </h3>
                  <p className="step-section-desc">
                    {isMr ? 'ज्या ठिकाणी फ्रँचायझी सुरू करायची आहे ते ठिकाण निवडा:' : 'Choose the location for franchise:'}
                  </p>
                </div>
              </div>

              <div className="location-dropdowns-grid">
                {/* 1. STATE */}
                <div className="sweet-field-group">
                  <label className="sweet-field-label">
                    <Building2 size={15} className="text-rose-600 inline mr-1 flex-shrink-0" />
                    <span>{isMr ? 'राज्य (State):' : 'State:'}</span>
                    <span className="required-star">*</span>
                  </label>
                  <select
                    className="sweet-select"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option value="Maharashtra">महाराष्ट्र (Maharashtra)</option>
                    <option value="Goa">गोवा (Goa)</option>
                    <option value="Karnataka">कर्नाटक (Karnataka)</option>
                    <option value="Gujarat">गुजरात (Gujarat)</option>
                  </select>
                </div>

                {/* 2. DISTRICT */}
                <div className="sweet-field-group">
                  <label className="sweet-field-label">
                    <Building2 size={15} className="text-rose-600 inline mr-1 flex-shrink-0" />
                    <span>{isMr ? 'जिल्हा (District):' : 'District:'}</span>
                    <span className="required-star">*</span>
                  </label>

                  {loadingDistricts ? (
                    <div className="sweet-loading-box">
                      <Loader2 size={15} className="spinner-icon inline mr-1" />
                      <span>{isMr ? 'जिल्हे लोड होत आहेत...' : 'Loading districts...'}</span>
                    </div>
                  ) : (
                    <select
                      className="sweet-select"
                      value={selectedDistrictCode}
                      onChange={(e) => setSelectedDistrictCode(e.target.value)}
                      required
                    >
                      <option value="">-- {isMr ? 'जिल्हा निवडा' : 'Select District'} --</option>
                      {districts.map(d => (
                        <option key={d.code || d.id} value={d.code || d.id}>
                          {d.mr} ({d.en})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* 3. TALUKA */}
                <div className="sweet-field-group">
                  <label className="sweet-field-label">
                    <Navigation size={15} className="text-rose-600 inline mr-1 flex-shrink-0" />
                    <span>{isMr ? 'तालुका (Taluka):' : 'Taluka:'}</span>
                    <span className="required-star">*</span>
                  </label>

                  {loadingTalukas ? (
                    <div className="sweet-loading-box">
                      <Loader2 size={15} className="spinner-icon inline mr-1" />
                      <span>{isMr ? 'तालुके लोड होत आहेत...' : 'Loading talukas...'}</span>
                    </div>
                  ) : (
                    <select
                      className="sweet-select"
                      disabled={!selectedDistrictCode || talukas.length === 0}
                      value={selectedTalukaCode}
                      onChange={(e) => setSelectedTalukaCode(e.target.value)}
                      required
                    >
                      <option value="">
                        {!selectedDistrictCode 
                          ? `-- ${isMr ? 'आधी जिल्हा निवडा' : 'Select District'} --` 
                          : `-- ${isMr ? 'तालुका निवडा' : 'Select Taluka'} (${talukas.length}) --`}
                      </option>
                      {talukas.map(t => (
                        <option key={t.code || t.id} value={t.code || t.id}>
                          {t.mr} ({t.en})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* 4. VILLAGE */}
                <div className="sweet-field-group">
                  <label className="sweet-field-label">
                    <Home size={15} className="text-rose-600 inline mr-1 flex-shrink-0" />
                    <span>{isMr ? 'गाव (Village):' : 'Village:'}</span>
                    <span className="required-star">*</span>
                  </label>

                  {loadingVillages ? (
                    <div className="sweet-loading-box">
                      <Loader2 size={15} className="spinner-icon inline mr-1" />
                      <span>{isMr ? 'गावे लोड होत आहेत...' : 'Loading villages...'}</span>
                    </div>
                  ) : (
                    <div className="village-select-wrapper">
                      <select
                        className="sweet-select"
                        disabled={!selectedTalukaCode || villages.length === 0}
                        value={selectedVillageCode}
                        onChange={(e) => setSelectedVillageCode(e.target.value)}
                        required
                      >
                        <option value="">
                          {!selectedTalukaCode 
                            ? `-- ${isMr ? 'आधी तालुका निवडा' : 'Select Taluka'} --` 
                            : `-- ${isMr ? 'गाव निवडा' : 'Select Village'} (${villages.length}) --`}
                        </option>
                        {filteredVillages.map(v => (
                          <option key={v.code || v.en} value={v.code || v.en}>
                            {v.displayName || `${v.mr} (${v.en})`}
                          </option>
                        ))}
                      </select>

                      {/* Fast filter search box */}
                      <div className="village-quick-search-box">
                        <Search size={14} className="text-slate-400 flex-shrink-0" />
                        <input
                          type="text"
                          className="village-search-input"
                          placeholder={isMr ? 'गावाचे नाव शोधण्यासाठी टाईप करा...' : 'Type to search village...'}
                          value={villageSearch}
                          onChange={(e) => setVillageSearch(e.target.value)}
                        />
                        {villageSearch && (
                          <button 
                            type="button" 
                            className="clear-village-search"
                            onClick={() => setVillageSearch('')}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Confirmation Pill */}
              {currentDistrict && currentTaluka && currentVillage && (
                <div className="sweet-selection-pill">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                  <span className="location-pill-text">
                    <strong>{isMr ? 'निवडलेले ठिकाण:' : 'Selected:'}</strong> {currentVillage.mr || currentVillage.en} › {currentTaluka.mr} › {currentDistrict.mr}
                  </span>
                </div>
              )}
            </div>

            {/* ======================================================== */}
            {/* STEP 2: APPLICANT PERSONAL DETAILS */}
            {/* ======================================================== */}
            <div className="form-step-section">
              <div className="step-section-header">
                <div className="step-circle-badge">२</div>
                <div>
                  <h3 className="step-section-title">
                    {isMr ? 'अर्जदाराची माहिती (Applicant Details)' : 'Applicant Details'}
                  </h3>
                  <p className="step-section-desc">
                    {isMr ? 'कृपया संपर्क साधण्यासाठी अचूक माहिती भरा:' : 'Enter your accurate contact info:'}
                  </p>
                </div>
              </div>

              <div className="personal-fields-grid">
                {/* Full Name */}
                <div className="sweet-field-group">
                  <label className="sweet-field-label">
                    <User size={15} className="text-rose-600 inline mr-1 flex-shrink-0" />
                    <span>{isMr ? 'अर्जदाराचे पूर्ण नाव:' : 'Full Name:'}</span>
                    <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="sweet-input"
                    placeholder={isMr ? 'उदा. सौ. सुनिता रमेश पाटील' : 'e.g. Sunita Ramesh Patil'}
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                  />
                </div>

                {/* Mobile Number */}
                <div className="sweet-field-group">
                  <label className="sweet-field-label">
                    <Phone size={15} className="text-rose-600 inline mr-1 flex-shrink-0" />
                    <span>{isMr ? 'मोबाईल नंबर (कॉलिंग):' : 'Mobile Number:'}</span>
                    <span className="required-star">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    inputMode="numeric"
                    className="sweet-input font-semibold"
                    placeholder={isMr ? '१० अंकी मोबाईल नंबर' : '10-digit mobile number'}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  />
                </div>

                {/* WhatsApp Number */}
                <div className="sweet-field-group">
                  <div className="whatsapp-header-row">
                    <label className="sweet-field-label mb-0">
                      <Phone size={15} className="text-emerald-600 inline mr-1 flex-shrink-0" />
                      <span>{isMr ? 'व्हॉट्सॲप नंबर:' : 'WhatsApp:'}</span>
                      <span className="required-star">*</span>
                    </label>
                    <label className="same-as-mobile-label">
                      <input
                        type="checkbox"
                        checked={sameAsMobile}
                        onChange={(e) => setSameAsMobile(e.target.checked)}
                      />
                      <span>{isMr ? 'मोबाईलसारखाच' : 'Same as Mobile'}</span>
                    </label>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    inputMode="numeric"
                    disabled={sameAsMobile}
                    className="sweet-input font-semibold"
                    placeholder="10 digit WhatsApp number"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                  />
                </div>

                {/* Email */}
                <div className="sweet-field-group">
                  <label className="sweet-field-label">
                    <Mail size={15} className="text-rose-600 inline mr-1 flex-shrink-0" />
                    <span>{isMr ? 'ईमेल आयडी (पर्यायी):' : 'Email (Optional):'}</span>
                  </label>
                  <input
                    type="email"
                    className="sweet-input"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Street Address */}
                <div className="sweet-field-group full-span">
                  <label className="sweet-field-label">
                    <MapPin size={15} className="text-rose-600 inline mr-1 flex-shrink-0" />
                    <span>{isMr ? 'सविस्तर पत्ता व लँडमार्क:' : 'Address & Landmark:'}</span>
                  </label>
                  <input
                    type="text"
                    className="sweet-input"
                    placeholder={isMr ? 'उदा. ग्रामपंचायत जवळ, मारुती मंदिर गल्ली' : 'e.g. Near Gram Panchayat Office'}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {/* Pincode */}
                <div className="sweet-field-group">
                  <label className="sweet-field-label">
                    <span>{isMr ? 'पिनकोड (Pincode):' : 'Pincode:'}</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    inputMode="numeric"
                    className="sweet-input"
                    placeholder="411001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* STEP 3: FRANCHISE MODEL & BUSINESS PREMISES */}
            {/* ======================================================== */}
            <div className="form-step-section">
              <div className="step-section-header">
                <div className="step-circle-badge">३</div>
                <div>
                  <h3 className="step-section-title">
                    {isMr ? 'फ्रँचायझी प्रकार व व्यवसायाची माहिती' : 'Franchise Plan & Details'}
                  </h3>
                  <p className="step-section-desc">
                    {isMr ? 'आपल्या बजेटनुसार योग्य फ्रँचायझी प्लॅन निवडा:' : 'Select your desired plan:'}
                  </p>
                </div>
              </div>

              {/* Franchise Model Cards */}
              <div className="models-selection-grid">
                {FRANCHISE_MODELS.map(model => (
                  <label 
                    key={model.id}
                    className={`model-card-label ${selectedModel === model.id ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="franchiseModel"
                      value={model.id}
                      checked={selectedModel === model.id}
                      onChange={() => setSelectedModel(model.id)}
                    />
                    <div className="model-card-top">
                      <span className="model-badge-tag">{model.badge}</span>
                      <span className="model-investment-text">{model.investment}</span>
                    </div>
                    <h4 className="model-title-text">{isMr ? model.titleMr : model.titleEn}</h4>
                    <p className="model-desc-text">{model.descMr}</p>
                  </label>
                ))}
              </div>

              {/* Premises Status Radio Group */}
              <div className="premises-group mt-3">
                <label className="sweet-field-label mb-2">
                  <Store size={15} className="text-rose-600 inline mr-1 flex-shrink-0" />
                  <span>{isMr ? 'दुकान / जागेची सद्यस्थिती:' : 'Premises Availability:'}</span>
                </label>

                <div className="premises-options-list">
                  {PREMISES_OPTIONS.map(opt => (
                    <label 
                      key={opt.id}
                      className={`premises-option-card ${premisesStatus === opt.id ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="premisesStatus"
                        value={opt.id}
                        checked={premisesStatus === opt.id}
                        onChange={() => setPremisesStatus(opt.id)}
                      />
                      <span className="radio-circle-dot" />
                      <span className="premises-label-text">{isMr ? opt.labelMr : opt.labelEn}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Note or Experience */}
              <div className="sweet-field-group full-span mt-3">
                <label className="sweet-field-label">
                  <Briefcase size={15} className="text-rose-600 inline mr-1 flex-shrink-0" />
                  <span>{isMr ? 'काही पूर्व अनुभव किंवा संदेश (पर्यायी):' : 'Prior Experience or Note (Optional):'}</span>
                </label>
                <textarea
                  rows={2}
                  className="sweet-textarea"
                  placeholder={isMr ? 'उदा. किराणा दुकानातून विक्री करणार किंवा बचत गटात काम केले आहे...' : 'Write any experience or message...'}
                  value={experienceNote}
                  onChange={(e) => setExperienceNote(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button Row */}
            <div className="form-submit-footer">
              <button 
                type="submit" 
                disabled={submitting} 
                className="sweet-submit-btn"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="spinner-icon inline mr-2" />
                    <span>{isMr ? 'अर्ज सबमिट होत आहे...' : 'Submitting...'}</span>
                  </>
                ) : (
                  <>
                    <Send size={18} className="inline mr-2" />
                    <span>{isMr ? 'फ्रँचायझी अर्ज सादर करा (Apply)' : 'Submit Franchise Application'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
