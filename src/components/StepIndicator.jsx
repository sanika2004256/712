import React from 'react';
import { MapPin, Navigation, Home, FileText, CheckCircle2 } from 'lucide-react';

export default function StepIndicator({ 
  step, 
  setStep, 
  selectedDistrict, 
  selectedTaluka, 
  selectedVillage, 
  lang 
}) {
  const isMr = lang === 'mr';

  const steps = [
    {
      id: 1,
      title: isMr ? 'जिल्हा' : 'District',
      selected: selectedDistrict ? (isMr ? selectedDistrict.mr : selectedDistrict.en) : null,
      icon: MapPin
    },
    {
      id: 2,
      title: isMr ? 'तालुका' : 'Taluka',
      selected: selectedTaluka ? (isMr ? selectedTaluka.mr : selectedTaluka.en) : null,
      icon: Navigation
    },
    {
      id: 3,
      title: isMr ? 'गाव' : 'Village',
      selected: selectedVillage || null,
      icon: Home
    },
    {
      id: 4,
      title: isMr ? '७/१२ उतारा' : '7/12 Utara',
      selected: null,
      icon: FileText
    }
  ];

  return (
    <div className="step-indicator-wrapper">
      <div className="step-indicator">
        {steps.map((s, index) => {
          const Icon = s.icon;
          const isCompleted = step > s.id;
          const isCurrent = step === s.id;
          const isClickable = s.id < step || (s.id === 2 && selectedDistrict) || (s.id === 3 && selectedTaluka);

          return (
            <React.Fragment key={s.id}>
              <div 
                className={`step-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''} ${isClickable ? 'clickable' : ''}`}
                onClick={() => {
                  if (isClickable) {
                    setStep(s.id);
                  }
                }}
              >
                <div className="step-circle">
                  {isCompleted ? <CheckCircle2 size={16} /> : <Icon size={14} />}
                </div>
                <div className="step-labels">
                  <span className="step-num-title">{s.title}</span>
                  {s.selected && (
                    <span className="step-selected-value" title={s.selected}>
                      {s.selected}
                    </span>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className={`step-connector ${step > s.id ? 'active' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
