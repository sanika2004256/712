import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Navigation, 
  Home, 
  Search, 
  FileText, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  ExternalLink,
  Loader2,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { getDistrictsList, getTalukasOfDistrict, getVillagesOfTaluka } from '../services/apiService';

const SAMPLE_GAT_NUMBERS = ['२५/१', '४२', '७८/अ', '१०५', '१४२/२', '२०८', '३१५'];
const SAMPLE_SURNAMES = ['पाटील', 'पवार', 'जाधव', 'कदम', 'देशमुख', 'शिंदे'];

export default function DropdownSelector({
  onViewRecord,
  lang,
  initialDistrict = null,
  initialTaluka = null,
  initialVillage = null
}) {
  const isMr = lang === 'mr';

  // Dropdown states
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictCode, setSelectedDistrictCode] = useState(initialDistrict?.code || initialDistrict?.id || '');
  const [talukas, setTalukas] = useState([]);
  const [selectedTalukaCode, setSelectedTalukaCode] = useState(initialTaluka?.code || initialTaluka?.id || '');
  const [villages, setVillages] = useState([]);
  const [selectedVillageCode, setSelectedVillageCode] = useState(initialVillage?.code || '');

  // Loading states
  const [loadingDistricts, setLoadingDistricts] = useState(true);
  const [loadingTalukas, setLoadingTalukas] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);

  // Village search filter within dropdown
  const [villageSearch, setVillageSearch] = useState('');

  // Search parameters
  const [recordType, setRecordType] = useState('712'); // '712' | '8a' | 'ferfar'
  const [searchBy, setSearchBy] = useState('surveyNo');
  const [queryValue, setQueryValue] = useState('४२');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
  const [captchaError, setCaptchaError] = useState(false);

  // 1. Load Districts on mount
  useEffect(() => {
    let isMounted = true;
    setLoadingDistricts(true);
    getDistrictsList()
      .then(dList => {
        if (isMounted) {
          setDistricts(dList);
          setLoadingDistricts(false);
          // If no initial district, default to Pune (490) or Ahilyanagar (466) for quick demo
          if (!selectedDistrictCode && dList.length > 0) {
            const pune = dList.find(d => d.en.toLowerCase().includes('pune')) || dList[0];
            setSelectedDistrictCode(pune.code || pune.id);
          }
        }
      })
      .catch(err => {
        console.error(err);
        if (isMounted) setLoadingDistricts(false);
      });

    return () => { isMounted = false; };
  }, []);

  // 2. When District changes -> Load Talukas
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
          // Pick first taluka or keep existing if valid
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

  // 3. When Taluka changes -> Load Villages
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

  // Filtered villages based on search query in dropdown
  const filteredVillages = useMemo(() => {
    if (!villageSearch.trim()) return villages;
    const q = villageSearch.toLowerCase().trim();
    return villages.filter(v => 
      v.en.toLowerCase().includes(q) || 
      v.mr.includes(q) || 
      (v.code && v.code.includes(q))
    );
  }, [villages, villageSearch]);

  // Selected Objects
  const currentDistrict = districts.find(d => (d.code || d.id) === selectedDistrictCode);
  const currentTaluka = talukas.find(t => (t.code || t.id) === selectedTalukaCode);
  const currentVillage = villages.find(v => (v.code || v.en) === selectedVillageCode);

  const refreshCaptcha = () => {
    setCaptchaCode(Math.floor(1000 + Math.random() * 9000).toString());
    setCaptchaInput('');
    setCaptchaError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaInput.trim() !== captchaCode) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);

    if (!currentDistrict || !currentTaluka || !currentVillage) {
      alert(isMr ? 'कृपया जिल्हा, तालुका आणि गाव निवडा.' : 'Please select District, Taluka and Village.');
      return;
    }

    onViewRecord({
      district: {
        id: currentDistrict.code || currentDistrict.id,
        en: currentDistrict.en,
        mr: currentDistrict.mr
      },
      taluka: {
        id: currentTaluka.code || currentTaluka.id,
        en: currentTaluka.en,
        mr: currentTaluka.mr
      },
      village: currentVillage.displayName || currentVillage.mr || currentVillage.en,
      villageData: currentVillage,
      recordType,
      searchBy,
      query: queryValue || '४२'
    });
  };

  return (
    <div className="selector-card dropdown-mode-card">
      {/* Top Banner */}
      <div className="dropdown-hero-banner">
        <div className="flex items-center gap-2">
          <Sparkles className="text-amber-500" size={20} />
          <h2 className="text-lg font-bold text-slate-900">
            {isMr ? 'महाभूलेख ऑनलाइन सातबारा शोध (ड्रॉपडाउन पद्धत)' : 'Mahabhulekh 7/12 Search (Dropdown Form)'}
          </h2>
        </div>
        <p className="text-sm text-slate-600 mt-0.5">
          {isMr 
            ? 'अधिकृत कॉमन व्हिलेज मास्टर (CVM) API आधारे जिल्हा, तालुका व गाव निवडा:' 
            : 'Select District, Taluka & Village powered by Common Village Master (LGD API):'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="search-form-body mt-4">
        {/* Cascading Dropdowns 3-Column Grid */}
        <div className="dropdowns-row-grid">
          {/* 1. DISTRICT DROPDOWN */}
          <div className="dropdown-field-group">
            <label className="dropdown-field-label">
              <Building2 size={16} className="text-green-700 inline mr-1" />
              <span>१. {isMr ? 'जिल्हा निवडा (District):' : 'Select District:'}</span>
              <span className="required-star">*</span>
            </label>

            <div className="select-container">
              {loadingDistricts ? (
                <div className="dropdown-loading-box">
                  <Loader2 size={16} className="spinner-icon inline mr-2" />
                  <span>{isMr ? 'जिल्हे लोड होत आहेत...' : 'Loading districts...'}</span>
                </div>
              ) : (
                <select
                  className="modern-dropdown-select"
                  value={selectedDistrictCode}
                  onChange={(e) => setSelectedDistrictCode(e.target.value)}
                >
                  <option value="">-- {isMr ? 'जिल्हा निवडा' : 'Select District'} --</option>
                  {districts.map(d => (
                    <option key={d.code || d.id} value={d.code || d.id}>
                      {d.mr} ({d.en}) {d.code ? `[LGD: ${d.code}]` : ''}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {currentDistrict && (
              <span className="dropdown-hint-text">
                {isMr ? 'निवडलेला:' : 'Selected:'} <strong>{currentDistrict.mr}</strong>
              </span>
            )}
          </div>

          {/* 2. TALUKA DROPDOWN */}
          <div className="dropdown-field-group">
            <label className="dropdown-field-label">
              <Navigation size={16} className="text-green-700 inline mr-1" />
              <span>२. {isMr ? 'तालुका निवडा (Taluka):' : 'Select Taluka:'}</span>
              <span className="required-star">*</span>
            </label>

            <div className="select-container">
              {loadingTalukas ? (
                <div className="dropdown-loading-box">
                  <Loader2 size={16} className="spinner-icon inline mr-2" />
                  <span>{isMr ? 'तालुके लोड होत आहेत...' : 'Loading talukas...'}</span>
                </div>
              ) : (
                <select
                  className="modern-dropdown-select"
                  disabled={!selectedDistrictCode || talukas.length === 0}
                  value={selectedTalukaCode}
                  onChange={(e) => setSelectedTalukaCode(e.target.value)}
                >
                  <option value="">
                    {!selectedDistrictCode 
                      ? `-- ${isMr ? 'आधी जिल्हा निवडा' : 'Select District First'} --` 
                      : `-- ${isMr ? 'तालुका निवडा' : 'Select Taluka'} (${talukas.length}) --`}
                  </option>
                  {talukas.map(t => (
                    <option key={t.code || t.id} value={t.code || t.id}>
                      {t.mr} ({t.en}) {t.code ? `[कोड: ${t.code}]` : ''}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {currentTaluka && (
              <span className="dropdown-hint-text">
                {isMr ? 'निवडलेला:' : 'Selected:'} <strong>{currentTaluka.mr}</strong> ({talukas.length} {isMr ? 'तालुके' : 'talukas'})
              </span>
            )}
          </div>

          {/* 3. VILLAGE DROPDOWN */}
          <div className="dropdown-field-group">
            <label className="dropdown-field-label">
              <Home size={16} className="text-green-700 inline mr-1" />
              <span>३. {isMr ? 'गाव निवडा (Village):' : 'Select Village:'}</span>
              <span className="required-star">*</span>
            </label>

            <div className="select-container">
              {loadingVillages ? (
                <div className="dropdown-loading-box">
                  <Loader2 size={16} className="spinner-icon inline mr-2" />
                  <span>{isMr ? 'गावे लोड होत आहेत...' : 'Loading villages...'}</span>
                </div>
              ) : (
                <div className="village-select-wrapper">
                  <select
                    className="modern-dropdown-select"
                    disabled={!selectedTalukaCode || villages.length === 0}
                    value={selectedVillageCode}
                    onChange={(e) => setSelectedVillageCode(e.target.value)}
                  >
                    <option value="">
                      {!selectedTalukaCode 
                        ? `-- ${isMr ? 'आधी तालुका निवडा' : 'Select Taluka First'} --` 
                        : `-- ${isMr ? 'गाव निवडा' : 'Select Village'} (${villages.length}) --`}
                    </option>
                    {filteredVillages.map(v => (
                      <option key={v.code || v.en} value={v.code || v.en}>
                        {v.displayName || `${v.mr} (${v.en})`} {v.code ? `[कोड: ${v.code}]` : ''}
                      </option>
                    ))}
                  </select>

                  {/* Fast filter search box for long village list */}
                  {villages.length > 20 && (
                    <div className="village-quick-search-box">
                      <Search size={14} className="text-slate-400" />
                      <input
                        type="text"
                        className="village-search-input"
                        placeholder={isMr ? 'ड्रॉपडाउन फिल्टर करा...' : 'Quick filter village...'}
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
                  )}
                </div>
              )}
            </div>
            {currentVillage && (
              <span className="dropdown-hint-text">
                {isMr ? 'निवडलेले गाव:' : 'Selected:'} <strong>{currentVillage.mr || currentVillage.en}</strong> 
                {currentVillage.lgdCode ? ` (LGD: ${currentVillage.lgdCode})` : ''}
              </span>
            )}
          </div>
        </div>

        {/* Selected Location Confirmation Pill */}
        {currentDistrict && currentTaluka && currentVillage && (
          <div className="dropdown-selected-pill">
            <CheckCircle2 size={16} className="text-green-700 flex-shrink-0" />
            <span>
              <strong>{isMr ? 'निवडलेले क्षेत्र:' : 'Selected:'}</strong> {currentVillage.mr || currentVillage.en} › {currentTaluka.mr} › {currentDistrict.mr}
            </span>
          </div>
        )}

        <div className="dropdown-divider" />

        {/* Record Type Tabs */}
        <div className="form-section">
          <label className="form-section-label">
            {isMr ? '४. अभिलेख प्रकार निवडा:' : '4. Select Record Type:'}
          </label>
          <div className="record-tabs">
            <button
              type="button"
              className={`record-tab-btn ${recordType === '712' ? 'active' : ''}`}
              onClick={() => setRecordType('712')}
            >
              <FileText size={16} />
              <span>{isMr ? '७/१२ (सातबारा उतारा)' : '7/12 (Satbara Extract)'}</span>
            </button>
            <button
              type="button"
              className={`record-tab-btn ${recordType === '8a' ? 'active' : ''}`}
              onClick={() => setRecordType('8a')}
            >
              <FileText size={16} />
              <span>{isMr ? '८-अ (८अ नोंदवही)' : '8-A (Khate Register)'}</span>
            </button>
            <button
              type="button"
              className={`record-tab-btn ${recordType === 'ferfar' ? 'active' : ''}`}
              onClick={() => setRecordType('ferfar')}
            >
              <FileText size={16} />
              <span>{isMr ? 'फेरफार नोंद स्थिती' : 'Ferfar Status'}</span>
            </button>
          </div>
        </div>

        {/* Search Method Radio Grid */}
        <div className="form-section">
          <label className="form-section-label">
            {isMr ? '५. शोध निकष निवडा:' : '5. Search Criteria:'}
          </label>
          <div className="search-methods-grid">
            {[
              { id: 'surveyNo', labelMr: 'सर्व्हे नंबर / गट नंबर', labelEn: 'Survey / Gat No.' },
              { id: 'letterSurvey', labelMr: 'अक्षरी सर्व्हे नंबर', labelEn: 'Alphanumeric Gat No' },
              { id: 'firstName', labelMr: 'पहिले नाव', labelEn: 'First Name' },
              { id: 'middleName', labelMr: 'मधले नाव', labelEn: 'Middle Name' },
              { id: 'lastName', labelMr: 'आडनाव', labelEn: 'Surname / Last Name' },
              { id: 'fullName', labelMr: 'संपूर्ण नाव', labelEn: 'Full Name' },
            ].map(method => (
              <label 
                key={method.id} 
                className={`search-method-radio-card ${searchBy === method.id ? 'active' : ''}`}
              >
                <input
                  type="radio"
                  name="searchByDropdown"
                  value={method.id}
                  checked={searchBy === method.id}
                  onChange={() => {
                    setSearchBy(method.id);
                    if (method.id === 'surveyNo') setQueryValue('४२');
                    else if (method.id === 'lastName') setQueryValue('पाटील');
                    else if (method.id === 'firstName') setQueryValue('रमेश');
                    else setQueryValue('');
                  }}
                />
                <span className="radio-dot" />
                <span className="radio-label">
                  {isMr ? method.labelMr : method.labelEn}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Input Field based on searchBy */}
        <div className="form-section">
          <label className="form-section-label">
            {searchBy === 'surveyNo' && (isMr ? 'गट नंबर / सर्व्हे नंबर प्रविष्ट करा:' : 'Enter Gat / Survey Number:')}
            {searchBy === 'letterSurvey' && (isMr ? 'अक्षरी गट नंबर टाका (उदा. २५/अ):' : 'Enter Alphanumeric Gat No:')}
            {searchBy === 'firstName' && (isMr ? 'खातेदाराचे पहिले नाव टाका:' : 'Enter First Name:')}
            {searchBy === 'middleName' && (isMr ? 'खातेदाराचे मधले नाव (वडिलांचे/पतीचे नाव):' : 'Enter Middle Name:')}
            {searchBy === 'lastName' && (isMr ? 'खातेदाराचे आडनाव टाका:' : 'Enter Surname / Last Name:')}
            {searchBy === 'fullName' && (isMr ? 'खातेदाराचे संपूर्ण नाव टाका:' : 'Enter Full Name:')}
          </label>

          <div className="main-query-input-wrap">
            <input
              type="text"
              required
              className="main-query-input"
              placeholder={
                searchBy === 'surveyNo' ? (isMr ? 'उदा. ४५ किंवा १२/१ किंवा १०४' : 'e.g. 45 or 12/1') :
                searchBy === 'lastName' ? (isMr ? 'उदा. पाटील, जाधव, पवार...' : 'e.g. Patil, Jadhav...') :
                (isMr ? 'येथे नाव किंवा नंबर प्रविष्ट करा...' : 'Enter details here...')
              }
              value={queryValue}
              onChange={(e) => setQueryValue(e.target.value)}
            />
          </div>

          {/* Quick Suggestions Chips */}
          {searchBy === 'surveyNo' && (
            <div className="quick-chips-wrapper">
              <span className="quick-chips-label">{isMr ? 'नमुना गट नंबर:' : 'Sample Numbers:'}</span>
              <div className="chips-list">
                {SAMPLE_GAT_NUMBERS.map(num => (
                  <button
                    key={num}
                    type="button"
                    className={`chip-btn ${queryValue === num ? 'selected' : ''}`}
                    onClick={() => setQueryValue(num)}
                  >
                    गट क्र. {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchBy === 'lastName' && (
            <div className="quick-chips-wrapper">
              <span className="quick-chips-label">{isMr ? 'वारंवार आढळणारी आडनावे:' : 'Common Surnames:'}</span>
              <div className="chips-list">
                {SAMPLE_SURNAMES.map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`chip-btn ${queryValue === s ? 'selected' : ''}`}
                    onClick={() => setQueryValue(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Captcha Section */}
        <div className="form-section captcha-section">
          <label className="form-section-label">
            <ShieldCheck size={16} className="inline mr-1 text-green-700" />
            {isMr ? '६. सुरक्षा कोड (कॅप्चा) प्रविष्ट करा:' : '6. Enter Security Code (Captcha):'}
          </label>

          <div className="captcha-row">
            <div className="captcha-display-box" title={isMr ? 'हा सुरक्षा कोड खाली टाका' : 'Security Code'}>
              <span className="captcha-text">{captchaCode}</span>
            </div>

            <button
              type="button"
              className="captcha-refresh-btn"
              onClick={refreshCaptcha}
              title={isMr ? 'नवीन कोड मिळवा' : 'Refresh Captcha'}
            >
              <RefreshCw size={18} />
            </button>

            <input
              type="text"
              required
              maxLength={6}
              className={`captcha-input ${captchaError ? 'error' : ''}`}
              placeholder={isMr ? 'येथे कोड टाका' : 'Enter Code'}
              value={captchaInput}
              onChange={(e) => {
                setCaptchaInput(e.target.value);
                setCaptchaError(false);
              }}
            />

            <button
              type="button"
              className="quick-fill-btn"
              onClick={() => setCaptchaInput(captchaCode)}
              title={isMr ? 'आपोआप भरा' : 'Auto Fill'}
            >
              <Check size={14} className="inline mr-1" />
              {isMr ? 'ऑटो-भरा' : 'Auto-Fill'}
            </button>
          </div>

          {captchaError && (
            <p className="captcha-error-text">
              {isMr ? 'चुकीचा सुरक्षा कोड! कृपया बरोबर कोड टाका.' : 'Incorrect Captcha! Please try again.'}
            </p>
          )}
        </div>

        {/* Submit Row */}
        <div className="form-submit-row">
          <button type="submit" className="primary-submit-btn">
            <Search size={20} className="inline mr-2" />
            <span>
              {recordType === '712' && (isMr ? '७/१२ पहा (View 7/12)' : 'View 7/12 Extract')}
              {recordType === '8a' && (isMr ? '८-अ पहा (View 8-A)' : 'View 8-A Extract')}
              {recordType === 'ferfar' && (isMr ? 'फेरफार पहा (View Ferfar)' : 'View Ferfar Status')}
            </span>
          </button>

          <a
            href="https://bhulekh.mahabhumi.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="official-portal-link"
          >
            <ExternalLink size={14} className="inline mr-1" />
            {isMr ? 'अधिकृत महाभूलेख संकेतस्थळ' : 'Official Mahabhulekh Portal'}
          </a>
        </div>
      </form>
    </div>
  );
}
