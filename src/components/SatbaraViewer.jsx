import React, { useState } from 'react';
import { 
  Printer, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  ArrowLeft, 
  QrCode, 
  ShieldCheck, 
  ExternalLink,
  Download,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export default function SatbaraViewer({ 
  record, 
  onBack, 
  onSwitchTo8A,
  onSaveRecord, 
  isSaved,
  lang 
}) {
  const [justSaved, setJustSaved] = useState(false);
  const isMr = lang === 'mr';

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*महाराष्ट्र शासन महाभूलेख ७/१२ उतारा*\n` +
      `गाव: ${record.village}\n` +
      `तालुका: ${record.talukaMr}\n` +
      `जिल्हा: ${record.districtMr}\n` +
      `गट क्रमांक: ${record.gatNo}\n` +
      `खातेदार: ${record.owners.map(o => o.name).join(', ')}\n` +
      `एकूण क्षेत्र: ${record.area.total} हे.आर (${record.area.acresText})\n` +
      `तपशील पाहण्यासाठी भेट द्या: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleSave = () => {
    onSaveRecord(record);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
  };

  return (
    <div className="viewer-container">
      {/* Top Action Toolbar (Hidden in Print) */}
      <div className="viewer-toolbar no-print">
        <button type="button" className="toolbar-back-btn" onClick={onBack}>
          <ArrowLeft size={16} className="inline mr-1" />
          <span>{isMr ? 'नवीन शोध / मागे' : 'Back / Search'}</span>
        </button>

        <div className="toolbar-actions">
          {/* Print */}
          <button type="button" className="tool-btn print-btn" onClick={handlePrint}>
            <Printer size={16} className="inline mr-1" />
            <span>{isMr ? 'प्रिंट / PDF' : 'Print / PDF'}</span>
          </button>

          {/* Share WhatsApp */}
          <button type="button" className="tool-btn whatsapp-btn" onClick={handleShareWhatsApp}>
            <Share2 size={16} className="inline mr-1" />
            <span>{isMr ? 'व्हॉट्सॲपवर पाठवा' : 'WhatsApp'}</span>
          </button>

          {/* Save / Bookmark */}
          <button 
            type="button" 
            className={`tool-btn save-btn ${isSaved || justSaved ? 'active' : ''}`}
            onClick={handleSave}
          >
            {isSaved || justSaved ? <BookmarkCheck size={16} className="inline mr-1" /> : <Bookmark size={16} className="inline mr-1" />}
            <span>{isSaved || justSaved ? (isMr ? 'जतन केले!' : 'Saved!') : (isMr ? 'जतन करा' : 'Save')}</span>
          </button>

          {/* Switch to 8A */}
          <button type="button" className="tool-btn switch-btn" onClick={onSwitchTo8A}>
            <FileSpreadsheet size={16} className="inline mr-1" />
            <span>{isMr ? '८-अ उतारा पहा' : 'View 8-A'}</span>
          </button>
        </div>
      </div>

      {/* Official 7/12 Document Sheet */}
      <div className="satbara-paper" id="satbara-extract">
        {/* Background Watermark */}
        <div className="satbara-watermark">महाराष्ट्र शासन</div>

        {/* Top Header */}
        <div className="satbara-header">
          <div className="satbara-emblem-seal">
            <div className="seal-circle">
              <span className="seal-center-text">महाराष्ट्र</span>
              <span className="seal-sub-text">महसूल</span>
            </div>
          </div>

          <div className="satbara-titles">
            <h2 className="satbara-main-heading">महाराष्ट्र शासन - महसूल विभाग</h2>
            <h1 className="satbara-doc-title">गाव नमुना सात (अधिकार अभिलेख पत्रक)</h1>
            <p className="satbara-rule-ref">
              [महाराष्ट्र जमीन महसूल अधिकार अभिलेख आणि नोंदवह्या (तयार करणे व सुस्थितीत ठेवणे) नियम, १९७१ यातील नियम ३, ५, ६ आणि ७]
            </p>
          </div>

          <div className="satbara-ulpin-box">
            <div className="qr-box">
              <QrCode size={52} className="qr-icon" />
              <span className="qr-label">ULPIN कोड:</span>
              <strong className="ulpin-text">{record.ulpinCode}</strong>
            </div>
          </div>
        </div>

        {/* Territory Location Ribbon */}
        <div className="satbara-location-ribbon">
          <div className="loc-item">
            <span className="loc-label">गाव:</span>
            <strong className="loc-val">{record.village}</strong>
          </div>
          <div className="loc-item">
            <span className="loc-label">तालुका:</span>
            <strong className="loc-val">{record.talukaMr}</strong>
          </div>
          <div className="loc-item">
            <span className="loc-label">जिल्हा:</span>
            <strong className="loc-val">{record.districtMr}</strong>
          </div>
          <div className="loc-item loc-highlight">
            <span className="loc-label">भूमापन क्रमांक / गट क्रमांक:</span>
            <strong className="loc-val gat-val">{record.gatNo}</strong>
          </div>
        </div>

        {/* Table 1: Gav Namuna 7 (Rights Record) */}
        <div className="satbara-table-wrapper">
          <table className="satbara-table table-bordered">
            <thead>
              <tr className="table-header-row">
                <th style={{ width: '12%' }}>
                  भूमापन क्रमांक व उपविभाग
                </th>
                <th style={{ width: '16%' }}>
                  भूधारणा पद्धती
                </th>
                <th style={{ width: '10%' }}>
                  खाते क्रमांक
                </th>
                <th style={{ width: '28%' }}>
                  खातेदाराचे नाव व पत्ता
                </th>
                <th style={{ width: '16%' }}>
                  लागवडी योग्य क्षेत्र (हे.आर)
                </th>
                <th style={{ width: '18%' }}>
                  पोटखराब (लागवडीस अयोग्य जमीन)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Gat No */}
                <td className="text-center font-bold font-lg highlight-cell">
                  {record.gatNo}
                </td>

                {/* Bhudharana */}
                <td className="align-top">
                  <span className="bhudharana-tag">{record.bhudharana}</span>
                  <div className="sub-notes mt-1">शेतजमीन, स्वमालकी हक्क</div>
                </td>

                {/* Khata No */}
                <td className="text-center font-bold">
                  {record.khataNo}
                </td>

                {/* Owners */}
                <td className="align-top">
                  <ol className="owners-list">
                    {record.owners.map((owner, idx) => (
                      <li key={idx} className="owner-item">
                        <span className="owner-name font-semibold">{owner.name}</span>
                        <span className="owner-share"> ({owner.share})</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mutation-ref-note">
                    नोंदवहीत फेरफार क्र.: {record.mutationEntries.join(', ')}
                  </div>
                </td>

                {/* Cultivable Area */}
                <td className="align-top">
                  <div className="area-breakdown">
                    <div className="area-row">
                      <span>जिरायत:</span>
                      <strong>{record.area.jirayat}</strong>
                    </div>
                    <div className="area-row">
                      <span>बागायत:</span>
                      <strong>{record.area.bagayat}</strong>
                    </div>
                    <div className="area-row total-area-row">
                      <span>एकूण क्षेत्र:</span>
                      <strong className="text-green-800">{record.area.total}</strong>
                    </div>
                    <div className="area-acres-hint">
                      ({record.area.acresText})
                    </div>
                  </div>
                </td>

                {/* Potkharab */}
                <td className="align-top">
                  <div className="area-breakdown">
                    <div className="area-row">
                      <span>वर्ग (अ):</span>
                      <span>{record.area.potkharabA}</span>
                    </div>
                    <div className="area-row">
                      <span>वर्ग (ब):</span>
                      <span>{record.area.potkharabB}</span>
                    </div>
                    <div className="area-row total-area-row">
                      <span>एकूण पोटखराब:</span>
                      <strong>{record.area.totalPotkharab}</strong>
                    </div>
                    <div className="aakarani-box mt-2">
                      <span className="text-xs">आकारणी (रु. पै.):</span>
                      <div className="font-bold text-sm">रु. {record.aakarani}</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Other Rights & Liabilities (इतर अधिकार व बोजा) */}
        <div className="other-rights-section">
          <div className="other-rights-header">
            <h4>इतर अधिकार, बोजा व फेरफार नोंदी (Other Rights & Liabilities):</h4>
          </div>
          <div className="other-rights-content">
            <ul className="other-rights-list">
              {record.otherRights.map((item, idx) => (
                <li key={idx} className="right-bullet">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section Divider */}
        <div className="doc-section-divider">
          <span>गाव नमुना बारा - पिकांची नोंदवही (Crop Register)</span>
        </div>

        {/* Table 2: Gav Namuna 12 (Crop Details) */}
        <div className="satbara-table-wrapper">
          <table className="satbara-table table-bordered crops-table">
            <thead>
              <tr className="table-header-row secondary">
                <th style={{ width: '14%' }}>वर्ष</th>
                <th style={{ width: '16%' }}>हंगाम</th>
                <th style={{ width: '24%' }}>पिकाचे नाव</th>
                <th style={{ width: '22%' }}>जलसिंचनाचे साधन</th>
                <th style={{ width: '12%' }}>सिंचित क्षेत्र (हे.आर)</th>
                <th style={{ width: '12%' }}>अ-सिंचित क्षेत्र (हे.आर)</th>
              </tr>
            </thead>
            <tbody>
              {record.crops.map((crop, idx) => (
                <tr key={idx}>
                  <td className="text-center font-medium">{crop.year}</td>
                  <td className="text-center">{crop.season}</td>
                  <td className="font-semibold">{crop.cropName}</td>
                  <td>{crop.waterSource}</td>
                  <td className="text-center font-medium">{crop.cultivatedArea}</td>
                  <td className="text-center font-medium">{crop.unirrigatedArea}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Official Footer with Signature Stamp */}
        <div className="satbara-footer">
          <div className="footer-notes">
            <p className="note-text">
              <ShieldCheck size={14} className="inline mr-1 text-green-700" />
              <strong>टीप:</strong> हा डिजिटल सातबारा उतारा महाराष्ट्र शासन माहिती तंत्रज्ञान विभागाच्या अधिकृत डेटाबेस आधारे जनरेट करण्यात आला आहे.
            </p>
            <p className="note-text text-muted">
              दिनांक: <strong>{record.generatedAt}</strong> • पडताळणी क्रमांक: <code>{record.verificationCode}</code>
            </p>
          </div>

          <div className="digital-signature-seal">
            <div className="stamp-box">
              <div className="stamp-title">DIGITALLY VERIFIED</div>
              <div className="stamp-dept">महाभूलेख - महाराष्ट्र शासन</div>
              <div className="stamp-date">{record.generatedAt}</div>
              <CheckCircle2 size={16} className="stamp-check-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
