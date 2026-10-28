import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  RefreshCw, 
  ArrowLeft, 
  CheckCircle, 
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';

const SAMPLE_GAT_NUMBERS = ['२५/१', '४२', '७८/अ', '१०५', '१४२/२', '२०८', '३१५'];
const SAMPLE_SURNAMES = ['पाटील', 'पवार', 'जाधव', 'कदम', 'देशमुख', 'शिंदे'];

export default function SearchForm({ 
  district, 
  taluka, 
  village, 
  onViewRecord, 
  onChangeVillage, 
  lang 
}) {
  const [recordType, setRecordType] = useState('712'); // '712' | '8a' | 'ferfar'
  const [searchBy, setSearchBy] = useState('surveyNo'); // 'surveyNo' | 'letterSurvey' | 'firstName' | 'middleName' | 'lastName' | 'fullName'
  const [queryValue, setQueryValue] = useState('४२');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
  const [captchaError, setCaptchaError] = useState(false);

  const isMr = lang === 'mr';

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
    onViewRecord({
      recordType,
      searchBy,
      query: queryValue || '४२'
    });
  };

  const handleQuickGatSelect = (num) => {
    setQueryValue(num);
  };

  return (
    <div className="selector-card">
      {/* Selected Location Banner */}
      <div className="active-selection-banner full-location">
        <div className="banner-info">
          <div className="banner-icon-box">
            <CheckCircle size={22} className="text-green-600" />
          </div>
          <div>
            <span className="banner-sublabel">
              {isMr ? 'निवडलेले गाव व क्षेत्र' : 'Selected Land Territory'}
            </span>
            <h3 className="banner-title">
              {village}
              <span className="banner-secondary-text">
                ({isMr ? taluka.mr : taluka.en}, {isMr ? district.mr : district.en})
              </span>
            </h3>
          </div>
        </div>

        <button 
          type="button" 
          className="change-selection-btn"
          onClick={onChangeVillage}
          title={isMr ? 'दुसरे गाव निवडा' : 'Change Village'}
        >
          <ArrowLeft size={14} className="inline mr-1" />
          {isMr ? 'गाव बदला' : 'Change Village'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="search-form-body">
        {/* Record Type Tabs */}
        <div className="form-section">
          <label className="form-section-label">
            {isMr ? '१. अभिलेख प्रकार निवडा:' : '1. Select Record Type:'}
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
            {isMr ? '२. शोध निकष निवडा:' : '2. Search Criteria:'}
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
                  name="searchBy"
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
                    onClick={() => handleQuickGatSelect(num)}
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

        {/* Captcha Verification */}
        <div className="form-section captcha-section">
          <label className="form-section-label">
            <ShieldCheck size={16} className="inline mr-1 text-green-700" />
            {isMr ? '३. सुरक्षा कोड (कॅप्चा) प्रविष्ट करा:' : '3. Enter Security Code (Captcha):'}
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

        {/* Submit Button */}
        <div className="form-submit-row">
          <button type="submit" className="primary-submit-btn">
            <Search size={20} className="inline mr-2" />
            <span>
              {recordType === '712' && (isMr ? '७/१२ पहा (View 7/12)' : 'View 7/12 Extract')}
              {recordType === '8a' && (isMr ? '८-अ पहा (View 8-A)' : 'View 8-A Extract')}
              {recordType === 'ferfar' && (isMr ? 'फेरफार पहा (View Ferfar)' : 'View Ferfar Status')}
            </span>
          </button>

          {/* Link to official Govt Mahabhulekh Portal */}
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
