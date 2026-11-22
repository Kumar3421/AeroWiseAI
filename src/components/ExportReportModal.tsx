import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText
} from 'lucide-react';
import { LocationData, FamilyProfile } from '../types';
import { MOCK_ROUTINE_SLOTS } from '../data/mockData';

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
  if (!isOpen) return null;

  const adoptedSlots = MOCK_ROUTINE_SLOTS.filter((s) => adoptedRoutineIds.includes(s.id));
  const totalParticulateSaved = adoptedSlots.reduce((acc, s) => acc + s.lungParticulateSavedUg, 0);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="glass-panel border border-white/10 rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl animate-mac-pop">
        {/* macOS Window Titlebar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="mac-traffic-lights">
              <button type="button" onClick={onClose} className="mac-dot mac-dot-close" title="Close" />
              <span className="mac-dot mac-dot-minimize" />
              <span className="mac-dot mac-dot-maximize" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <FileText className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-100 tracking-tight">
                Family Smog Plan & Clinical Summary
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Card Preview */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-4 text-xs font-sans shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
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
          <div className="grid grid-cols-3 gap-2 text-center py-2.5 bg-slate-950/70 rounded-xl border border-white/5">
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
                <div key={slot.id} className="p-2.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-200 transition-all active:scale-95"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download JSON Data</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-600/20 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
