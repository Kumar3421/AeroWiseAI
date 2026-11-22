import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  ShieldCheck, 
  Activity, 
  Calendar, 
  Wind, 
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { LocationData, FamilyProfile } from '../types';
import { MOCK_ROUTINE_SLOTS } from '../data/mockData';
import { calculateCigaretteEquivalency } from '../utils/airQualityUtils';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationData;
  familyProfile: FamilyProfile;
  adoptedRoutineIds: string[];
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  location,
  familyProfile,
  adoptedRoutineIds,
}) => {
  const [copied, setCopied] = React.useState<boolean>(false);

  if (!isOpen) return null;

  const adoptedSlots = MOCK_ROUTINE_SLOTS.filter((s) => adoptedRoutineIds.includes(s.id));
  const totalParticulateSaved = adoptedSlots.reduce((acc, s) => acc + s.lungParticulateSavedUg, 0);
  const cigarettesDaily = calculateCigaretteEquivalency(location.pm25);

  const handleDownloadJSON = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      family: familyProfile,
      location: {
        city: location.name,
        country: location.country,
        aqi: location.aqi,
        pm25: location.pm25,
        inversionStatus: location.inversionRisk,
        grapStage: location.grapStage,
      },
      healthImpact: {
        particulateAvoidedUgDaily: totalParticulateSaved,
        cigarettesEquivSparedDaily: (totalParticulateSaved / 22).toFixed(1),
        acuteRiskReduction: '-72%',
      },
      adoptedDailySchedule: adoptedSlots.map((s) => ({
        time: s.timeWindow,
        title: s.title,
        action: s.lowEmissionSmartAction,
        checklist: s.actionableChecklist,
      })),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AeroWise_SmogPlan_${familyProfile.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-100">
                Family Winter Smog Action Plan & Health Report
              </h3>
              <p className="text-xs text-slate-400">
                Formatted clinical & routine summary for {familyProfile.name}.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Card Preview */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-xs font-sans">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-sm font-extrabold text-cyan-300 block">
                {familyProfile.name}
              </span>
              <span className="text-[11px] text-slate-400">
                {familyProfile.membersCount} residents • {familyProfile.homeType} ({familyProfile.homeSizeSqFt} sq ft)
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs text-rose-400 font-bold block">
                {location.name} (AQI {location.aqi})
              </span>
              <span className="text-[10px] text-slate-400">
                GRAP Stage {location.grapStage} Active • {location.inversionRisk}
              </span>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div>
              <span className="text-[10px] text-slate-400 block">Particulate Cleared</span>
              <strong className="text-sm font-extrabold text-emerald-400">
                {totalParticulateSaved} µg / day
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Cigarettes Avoided</span>
              <strong className="text-sm font-extrabold text-rose-400">
                ~{(totalParticulateSaved / 22).toFixed(1)} / day
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Active Protocols</span>
              <strong className="text-sm font-extrabold text-cyan-400">
                {adoptedSlots.length} habits
              </strong>
            </div>
          </div>

          {/* Schedule Summary */}
          <div>
            <span className="font-bold text-slate-200 block mb-2 uppercase text-[10px] tracking-wider">
              Adopted Daily Smog Defense Schedule:
            </span>
            <div className="space-y-2">
              {adoptedSlots.map((slot) => (
                <div key={slot.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-cyan-300">{slot.timeWindow} — {slot.title}</span>
                    <span className="text-emerald-400 font-semibold">-{slot.exposureReductionPct}% Exposure</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {slot.lowEmissionSmartAction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleDownloadJSON}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download JSON Data</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-600/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print Action Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
