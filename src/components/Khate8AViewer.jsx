import React from 'react';
import { Printer, Share2, ArrowLeft, FileText, ShieldCheck } from 'lucide-react';

export default function Khate8AViewer({ record, onBack, onSwitchTo712, lang }) {
  const isMr = lang === 'mr';

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*महाराष्ट्र शासन महाभूलेख ८-अ खाते उतारा*\n` +
      `गाव: ${record.village}, तालुका: ${record.talukaMr}, जिल्हा: ${record.districtMr}\n` +
      `खाते क्रमांक: ${record.khataNo}\n` +
      `खातेदार: ${record.ownerName}\n` +
      `एकूण क्षेत्र: ${record.totalArea} हे.आर\n` +
      `एकूण आकारणी: रु. ${record.totalAakarani}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="viewer-container">
      {/* Top Toolbar */}
      <div className="viewer-toolbar no-print">
        <button type="button" className="toolbar-back-btn" onClick={onBack}>
          <ArrowLeft size={16} className="inline mr-1" />
          <span>{isMr ? 'नवीन शोध / मागे' : 'Back / Search'}</span>
        </button>

        <div className="toolbar-actions">
          <button type="button" className="tool-btn print-btn" onClick={handlePrint}>
            <Printer size={16} className="inline mr-1" />
            <span>{isMr ? 'प्रिंट / PDF' : 'Print / PDF'}</span>
          </button>

          <button type="button" className="tool-btn whatsapp-btn" onClick={handleShareWhatsApp}>
            <Share2 size={16} className="inline mr-1" />
            <span>{isMr ? 'व्हॉट्सॲपवर पाठवा' : 'WhatsApp'}</span>
          </button>

          <button type="button" className="tool-btn switch-btn" onClick={onSwitchTo712}>
            <FileText size={16} className="inline mr-1" />
            <span>{isMr ? '७/१२ उतारा पहा' : 'View 7/12'}</span>
          </button>
        </div>
      </div>

      {/* 8-A Paper Sheet */}
      <div className="satbara-paper" id="extract-8a">
        <div className="satbara-watermark">८-अ खातेवही</div>

        <div className="satbara-header">
          <div className="satbara-titles">
            <h2 className="satbara-main-heading">महाराष्ट्र शासन - महसूल विभाग</h2>
            <h1 className="satbara-doc-title">गाव नमुना आठ-अ (खातेदाराच्या जमिनीची नोंदवही)</h1>
            <p className="satbara-rule-ref">
              [महाराष्ट्र जमीन महसूल अधिकार अभिलेख आणि नोंदवह्या (तयार करणे व सुस्थितीत ठेवणे) नियम, १९७१]
            </p>
          </div>
        </div>

        {/* Location & Account Banner */}
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
            <span className="loc-label">खाते क्रमांक:</span>
            <strong className="loc-val gat-val">{record.khataNo}</strong>
          </div>
        </div>

        {/* Khatedar Name Bar */}
        <div className="khatedar-name-bar">
          <span className="khata-title">खातेदाराचे नाव:</span>
          <span className="khata-holder-name">{record.ownerName}</span>
        </div>

        {/* Table: All Land Parcels under this Account */}
        <div className="satbara-table-wrapper">
          <table className="satbara-table table-bordered">
            <thead>
              <tr className="table-header-row">
                <th style={{ width: '8%' }}>अ.क्र.</th>
                <th style={{ width: '22%' }}>भूमापन क्रमांक / गट क्र.</th>
                <th style={{ width: '24%' }}>भूधारणा पद्धती</th>
                <th style={{ width: '16%' }}>क्षेत्र (हे.आर)</th>
                <th style={{ width: '15%' }}>पोटखराब (हे.आर)</th>
                <th style={{ width: '15%' }}>आकारणी (रु. पै.)</th>
              </tr>
            </thead>
            <tbody>
              {record.entries.map((entry, idx) => (
                <tr key={idx}>
                  <td className="text-center">{idx + 1}</td>
                  <td className="text-center font-bold">{entry.gatNo}</td>
                  <td>{entry.bhudharana}</td>
                  <td className="text-center font-semibold">{entry.area}</td>
                  <td className="text-center">{entry.potkharab}</td>
                  <td className="text-center font-semibold">रु. {entry.aakarani}</td>
                </tr>
              ))}
              {/* Grand Total Row */}
              <tr className="grand-total-row">
                <td colSpan={3} className="text-right font-bold">एकूण (Total):</td>
                <td className="text-center font-bold text-green-900">{record.totalArea} हे.आर</td>
                <td className="text-center">०.०२</td>
                <td className="text-center font-bold text-green-900">रु. {record.totalAakarani}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="satbara-footer">
          <div className="footer-notes">
            <p className="note-text">
              <ShieldCheck size={14} className="inline mr-1 text-green-700" />
              <strong>टीप:</strong> हे गाव नमुना ८-अ खातेवहीचे अधिकृत संगणकीकृत स्वरूप आहे.
            </p>
            <p className="note-text text-muted">
              दिनांक: <strong>{record.generatedAt}</strong> • महाभूलेख डिजिटल सेवा
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
