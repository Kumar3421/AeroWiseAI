import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Car, 
  Wind, 
  Flame, 
  Moon, 
  Sparkles, 
  Download, 
  Printer, 
  ChevronDown, 
  ChevronUp, 
  Leaf, 
  HeartHandshake,
  Check
} from 'lucide-react';
import { LocationData, FamilyProfile, RoutineSlot } from '../types';
import { MOCK_ROUTINE_SLOTS } from '../data/mockData';

interface DailyRoutineOptimizerProps {
  location: LocationData;
  familyProfile: FamilyProfile;
  adoptedRoutineIds: string[];
  onToggleAdoptRoutine: (id: string) => void;
}

export const DailyRoutineOptimizer: React.FC<DailyRoutineOptimizerProps> = ({
  location,
  familyProfile,
  adoptedRoutineIds,
  onToggleAdoptRoutine,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSlotId, setExpandedSlotId] = useState<string | null>('slot-1');

  // Filter slots
  const filteredSlots = MOCK_ROUTINE_SLOTS.filter((slot) => {
    if (selectedCategory === 'all') return true;
    return slot.category === selectedCategory;
  });

  // Calculate live cumulative impact of adopted routines
  const adoptedSlots = MOCK_ROUTINE_SLOTS.filter((s) => adoptedRoutineIds.includes(s.id));
  const totalLungParticulateSavedUg = adoptedSlots.reduce((acc, s) => acc + s.lungParticulateSavedUg, 0);
  const totalCO2SavedKg = adoptedSlots.reduce((acc, s) => acc + s.emissionSavedKgCO2, 0);
  const avgExposureReductionPct = adoptedSlots.length 
    ? Math.round(adoptedSlots.reduce((acc, s) => acc + s.exposureReductionPct, 0) / adoptedSlots.length) 
    : 0;
  const cigarettesSaved = (totalLungParticulateSavedUg / 22).toFixed(1);

  const handlePrintRoutine = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel border border-slate-800 rounded-3xl p-6 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Clock className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">
              Smog-Smart 24-Hour Routine Optimizer
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Synchronize your family’s daily habits with the atmospheric boundary layer in <strong className="text-slate-200">{location.name}</strong>.
            Avoid peak thermal inversion traps while cutting personal carbon and particulate emissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrintRoutine}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print Family Plan</span>
          </button>
        </div>
      </div>

      {/* Real-time Dynamic Scorecard of Adopted Choices */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel border border-cyan-800/40 rounded-2xl p-4 bg-cyan-950/20">
          <span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider block">
            Routines Adopted
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-cyan-400">
              {adoptedRoutineIds.length} / {MOCK_ROUTINE_SLOTS.length}
            </span>
            <span className="text-xs text-slate-400">habits active</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(adoptedRoutineIds.length / MOCK_ROUTINE_SLOTS.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="glass-panel border border-emerald-800/40 rounded-2xl p-4 bg-emerald-950/20">
          <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
            PM2.5 Lung Burden Avoided
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-emerald-400">
              {totalLungParticulateSavedUg} µg
            </span>
            <span className="text-xs text-slate-400">today</span>
          </div>
          <span className="text-[11px] text-emerald-300/80 block mt-1">
            ≈ {cigarettesSaved} cigarettes avoided / person
          </span>
        </div>

        <div className="glass-panel border border-teal-800/40 rounded-2xl p-4 bg-teal-950/20">
          <span className="text-[11px] font-semibold text-teal-300 uppercase tracking-wider block">
            CO2 Prevented Daily
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-teal-400">
              {totalCO2SavedKg.toFixed(1)} kg
            </span>
            <span className="text-xs text-slate-400">direct cut</span>
          </div>
          <span className="text-[11px] text-teal-300/80 block mt-1">
            via transit & clean heating
          </span>
        </div>

        <div className="glass-panel border border-purple-800/40 rounded-2xl p-4 bg-purple-950/20">
          <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block">
            Avg Respiratory Risk Drop
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-purple-400">
              {avgExposureReductionPct}%
            </span>
            <span className="text-xs text-slate-400">cleaner air</span>
          </div>
          <span className="text-[11px] text-purple-300/80 block mt-1">
            protection for {familyProfile.membersCount} family members
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { id: 'all', label: 'All 24h Slots' },
          { id: 'exercise', label: '🏃 Morning Exercise' },
          { id: 'commute', label: '🚗 Commute & School' },
          { id: 'ventilation', label: '🪟 Solar Ventilation' },
          { id: 'cooking', label: '🍳 Kitchen & Dinner' },
          { id: 'rest', label: '🛏️ Sleep Bubble' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
              selectedCategory === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Routine Slots List */}
      <div className="space-y-4">
        {filteredSlots.map((slot) => {
          const isAdopted = adoptedRoutineIds.includes(slot.id);
          const isExpanded = expandedSlotId === slot.id;

          return (
            <div
              key={slot.id}
              className={`glass-panel border rounded-3xl transition-all overflow-hidden ${
                isAdopted
                  ? 'border-emerald-500/50 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-950'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              {/* Header Row */}
              <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  {/* Adoption Checkbox Button */}
                  <button
                    onClick={() => onToggleAdoptRoutine(slot.id)}
                    className={`mt-1 w-6 h-6 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                      isAdopted
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                        : 'border-slate-700 hover:border-cyan-400 text-transparent'
                    }`}
                    title={isAdopted ? 'Mark as Not Adopted' : 'Mark as Adopted by My Family'}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                        {slot.timeWindow}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {slot.period}
                      </span>
                      {slot.riskRating === 'critical_hazard' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          Critical Inversion Peak
                        </span>
                      )}
                      {slot.riskRating === 'safe_window' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          Optimal Clean Air Window
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-1">
                      {slot.title}
                    </h3>
                  </div>
                </div>

                {/* Impact Tags & Expand Toggle */}
                <div className="flex items-center gap-3 self-end md:self-center">
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 block">
                      -{slot.exposureReductionPct}% Exposure
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Saves {slot.lungParticulateSavedUg} µg PM2.5
                    </span>
                  </div>

                  <button
                    onClick={() => setExpandedSlotId(isExpanded ? null : slot.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Comparison Preview (Always Visible) */}
              <div className="px-4 sm:px-5 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-900/30 text-xs">
                  <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3 h-3" />
                    Conventional Risky Practice:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {slot.conventionalPractice}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 text-xs">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1 mb-1">
                    <ShieldCheck className="w-3 h-3" />
                    Low-Emission Smart Alternative:
                  </span>
                  <p className="text-slate-200 font-medium leading-relaxed">
                    {slot.lowEmissionSmartAction}
                  </p>
                </div>
              </div>

              {/* Expanded Scientific Breakdown & Checklist */}
              {isExpanded && (
                <div className="border-t border-slate-800/80 bg-slate-950/60 p-4 sm:p-5 space-y-4 text-xs">
                  {/* Scientific Why */}
                  <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 space-y-1">
                    <h4 className="font-bold text-cyan-300 flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      The Atmospheric & Medical Science Behind This Choice:
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-xs">
                      {slot.scientificWhy}
                    </p>
                  </div>

                  {/* Actionable Checklist */}
                  <div>
                    <h4 className="font-bold text-slate-200 mb-2">
                      Checklist for {familyProfile.name}:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {slot.actionableChecklist.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Adoption Toggle Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onToggleAdoptRoutine(slot.id)}
                      className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                        isAdopted
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                          : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>{isAdopted ? 'Habit Adopted in Daily Routine' : 'Adopt This Habit'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
