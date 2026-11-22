import React from 'react';
import { 
  X, 
  ShieldAlert, 
  AlertTriangle, 
  Home, 
  CheckCircle2
} from 'lucide-react';
import { LocationData, FamilyProfile } from '../types';
import { GRAP_EMERGENCY_PROTOCOLS } from '../data/mockData';

interface GRAPModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationData;
  familyProfile: FamilyProfile;
}

export const GRAPModal: React.FC<GRAPModalProps> = ({
  isOpen,
  onClose,
  location,
  familyProfile,
}) => {
  if (!isOpen) return null;

  const stages = [
    { num: 1, key: 'stage1', label: 'Stage I (Poor: 201-300)', ...GRAP_EMERGENCY_PROTOCOLS.stage1 },
    { num: 2, key: 'stage2', label: 'Stage II (Very Poor: 301-400)', ...GRAP_EMERGENCY_PROTOCOLS.stage2 },
    { num: 3, key: 'stage3', label: 'Stage III (Severe: 401-450)', ...GRAP_EMERGENCY_PROTOCOLS.stage3 },
    { num: 4, key: 'stage4', label: 'Stage IV (Severe+ Emergency: >450)', ...GRAP_EMERGENCY_PROTOCOLS.stage4 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="glass-panel border border-white/10 rounded-[24px] w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl animate-mac-pop">
        {/* macOS Window Titlebar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="mac-traffic-lights">
              <button type="button" onClick={onClose} className="mac-dot mac-dot-close" title="Close" />
              <span className="mac-dot mac-dot-minimize" />
              <span className="mac-dot mac-dot-maximize" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>GRAP Emergency Action Plan</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  Stage {location.grapStage} Active
                </span>
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

        {/* Current Status Alert Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/50 via-slate-900 to-amber-950/40 border border-rose-600/40 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Emergency Enforcement Order: Stage {location.grapStage} Active</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Due to current severe meteorological stagnation (AQI: <strong className="text-rose-400">{location.aqi}</strong>, PM2.5: <strong className="text-rose-400">{location.pm25} µg/m³</strong>), public authorities enforce mandatory commercial and transport restrictions in {location.name}.
          </p>
        </div>

        {/* Stage Tabs / Details Accordion */}
        <div className="space-y-3">
          {stages.map((st) => {
            const isCurrent = location.grapStage === st.num;
            return (
              <div
                key={st.num}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-rose-950/20 border-rose-500/60 shadow-lg shadow-rose-950/20'
                    : 'bg-slate-900/60 border-white/5 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                      isCurrent ? 'bg-rose-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {st.num}
                    </span>
                    <h4 className="text-sm font-bold text-slate-200">
                      {st.title}
                    </h4>
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-slate-950">
                      CURRENT STAGE
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                  {st.actionItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2 rounded-xl bg-slate-900/90 border border-white/5 text-slate-300"
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        isCurrent ? 'text-rose-400' : 'text-slate-500'
                      }`} />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Family Protocol Footer */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 text-xs space-y-1">
          <span className="font-bold text-cyan-300 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5" />
            Family Protective Advice for {familyProfile.name}:
          </span>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            In Stage {location.grapStage}, keep elderly and young children strictly indoors with bedroom door sealed. 
            Ensure N95 masks with dual exhalation valves are worn for any necessary outdoor transit. 
            Confirm asthma preventer inhaler compliance twice daily.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs active:scale-95 transition-all"
          >
            Close Emergency Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
