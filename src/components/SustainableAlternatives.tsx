import React, { useState } from 'react';
import { 
  Leaf, 
  Flame, 
  Car, 
  Trash2, 
  Zap, 
  CheckCircle2, 
  TrendingDown, 
  DollarSign, 
  HeartHandshake, 
  HelpCircle,
  Sparkles,
  Check
} from 'lucide-react';
import { LocationData, FamilyProfile, SustainableAlternative } from '../types';
import { MOCK_SUSTAINABLE_ALTERNATIVES } from '../data/mockData';

interface SustainableAlternativesProps {
  location: LocationData;
  familyProfile: FamilyProfile;
  adoptedSwapIds: string[];
  onToggleAdoptSwap: (id: string) => void;
}

export const SustainableAlternatives: React.FC<SustainableAlternativesProps> = ({
  location,
  familyProfile,
  adoptedSwapIds,
  onToggleAdoptSwap,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredSwaps = MOCK_SUSTAINABLE_ALTERNATIVES.filter((swap) => {
    if (selectedCategory === 'all') return true;
    return swap.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const adoptedSwaps = MOCK_SUSTAINABLE_ALTERNATIVES.filter((s) => adoptedSwapIds.includes(s.id));
  const totalAnnualCO2Kg = adoptedSwaps.reduce((acc, s) => acc + s.annualCO2ReductionKg, 0);
  const totalAnnualPM25Grams = adoptedSwaps.reduce((acc, s) => acc + s.annualPM25ReductionGrams, 0);
  const totalHealthSavingsUSD = adoptedSwaps.reduce((acc, s) => acc + s.healthSavingsEstUSD, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-panel border border-slate-800 rounded-3xl p-6 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-emerald-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Leaf className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">
              Sustainable Alternatives & Clean Lifestyle Swaps
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Replace high-emission household practices with high-efficiency alternatives tailored to {familyProfile.name} in {location.name}.
            Every swap reduces local airshed toxic loading while protecting family respiratory health.
          </p>
        </div>
      </div>

      {/* Live Swaps Impact Counter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel border border-emerald-800/40 rounded-2xl p-4 bg-emerald-950/20">
          <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
            Annual CO2 Reduction
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-emerald-400">
              {totalAnnualCO2Kg} kg
            </span>
            <span className="text-xs text-slate-400">avoided/year</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Equivalent to planting ~{Math.round(totalAnnualCO2Kg / 22)} mature urban trees
          </span>
        </div>

        <div className="glass-panel border border-cyan-800/40 rounded-2xl p-4 bg-cyan-950/20">
          <span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider block">
            Annual Particulate Kept Out of Air
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-cyan-400">
              {(totalAnnualPM25Grams / 1000).toFixed(2)} kg
            </span>
            <span className="text-xs text-slate-400">PM2.5 soot prevented</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Prevents community atmospheric deposition
          </span>
        </div>

        <div className="glass-panel border border-amber-800/40 rounded-2xl p-4 bg-amber-950/20">
          <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
            Est. Health & Fuel Savings
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-amber-400">
              ${totalHealthSavingsUSD}
            </span>
            <span className="text-xs text-slate-400">per family / year</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Reduced inhalers, antibiotics, and fuel costs
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { id: 'all', label: 'All Clean Swaps' },
          { id: 'heating', label: '🔥 Clean Heating' },
          { id: 'cooking', label: '🍳 Induction Cooking' },
          { id: 'commute', label: '🚗 Green Mobility' },
          { id: 'waste', label: '🍂 Zero Waste & Mulch' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Swap Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSwaps.map((swap) => {
          const isAdopted = adoptedSwapIds.includes(swap.id);
          return (
            <div
              key={swap.id}
              className={`glass-panel border rounded-3xl p-6 transition-all flex flex-col justify-between space-y-4 ${
                isAdopted
                  ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-950/25 via-slate-900 to-slate-950 shadow-lg shadow-emerald-500/10'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header: Category & Adoption Status */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                    {swap.category}
                  </span>

                  <button
                    onClick={() => onToggleAdoptSwap(swap.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      isAdopted
                        ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{isAdopted ? 'Swap Active' : 'Adopt Swap'}</span>
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  {swap.title}
                </h3>

                {/* Contrast: Before & After */}
                <div className="grid grid-cols-1 gap-2 mt-3 text-xs">
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30">
                    <span className="text-[10px] font-bold uppercase text-rose-400 block mb-0.5">
                      Conventional Practice:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {swap.conventionalMethod}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30">
                    <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-0.5">
                      Sustainable Clean Choice:
                    </span>
                    <p className="text-slate-200 font-medium leading-relaxed">
                      {swap.sustainableChoice}
                    </p>
                  </div>
                </div>

                {/* Direct Airshed Impact */}
                <div className="mt-3 p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-xs space-y-1">
                  <span className="font-bold text-cyan-300 flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3 h-3" />
                    Direct Atmospheric & Health Impact:
                  </span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {swap.directLocalImpact}
                  </p>
                </div>
              </div>

              {/* Bottom Metrics Pill */}
              <div className="border-t border-slate-800/80 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Annual CO2 Saved</span>
                    <span className="font-bold text-emerald-400">-{swap.annualCO2ReductionKg} kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">PM2.5 Prevented</span>
                    <span className="font-bold text-cyan-400">-{swap.annualPM25ReductionGrams} g</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Financial Payback</span>
                  <span className="font-bold text-amber-400">{swap.paybackTimeline}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
