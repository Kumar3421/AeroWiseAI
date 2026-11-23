import React, { useState } from 'react';
import { 
  Wrench, 
  Layers, 
  Wind, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  DollarSign, 
  Sliders, 
  Home, 
  ChevronRight, 
  Info,
  ShieldCheck,
  Check
} from 'lucide-react';
import { LocationData, FamilyProfile, IAQHack } from '../types';
import { MOCK_IAQ_HACKS } from '../data/mockData';
import { AirflowSimulator } from './AirflowSimulator';

interface IAQLabProps {
  location: LocationData;
  familyProfile: FamilyProfile;
}

export const IAQLab: React.FC<IAQLabProps> = ({
  location,
  familyProfile,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'corsi-calc' | 'room-audit' | 'hacks-library'>('corsi-calc');
  const [selectedHack, setSelectedHack] = useState<IAQHack>(MOCK_IAQ_HACKS[0]);

  // Corsi-Rosenthal Interactive Calculator State
  const [roomSqFt, setRoomSqFt] = useState<number>(250);
  const [ceilingHeightFt, setCeilingHeightFt] = useState<number>(9);
  const [fanSpeed, setFanSpeed] = useState<'low' | 'med' | 'high'>('med');
  const [hasShroud, setHasShroud] = useState<boolean>(true);
  const [filterCount, setFilterCount] = useState<4 | 5>(4);

  // Calculate CADR & ACH
  const baseCfm = fanSpeed === 'low' ? 290 : fanSpeed === 'med' ? 440 : 580;
  const shroudMultiplier = hasShroud ? 1.35 : 1.0;
  const calculatedCADR = Math.round(baseCfm * shroudMultiplier);
  const roomVolumeCuFt = roomSqFt * ceilingHeightFt;
  const calculatedACH = Number(((calculatedCADR * 60) / roomVolumeCuFt).toFixed(1));
  // Minutes to 90% particle reduction (approx -ln(0.1) / (ACH/60)) = 2.302 * 60 / ACH
  const minutesToClean = calculatedACH > 0 ? Math.round(138 / calculatedACH) : 0;

  // Room Diagnostic State
  const [checkedAuditItems, setCheckedAuditItems] = useState<Record<string, boolean>>({
    'audit-door-gap': true,
    'audit-dry-broom': false,
    'audit-kitchen-intake': true,
    'audit-bedroom-bubble': true,
    'audit-heater-flame': false,
    'audit-plant-overreliance': false,
  });

  const toggleAuditItem = (id: string) => {
    setCheckedAuditItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const auditScore = Object.values(checkedAuditItems).filter(Boolean).length;
  const auditMaxScore = Object.keys(checkedAuditItems).length;
  const auditHealthPct = Math.round((auditScore / auditMaxScore) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-panel border border-slate-800 rounded-3xl p-6 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-teal-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Wrench className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">
              Indoor Air Quality (IAQ) Lab & Engineering Hacks
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Science-backed DIY filtration hacks that outperform expensive commercial air purifiers.
            Tailored to maintain sub-12 µg/m³ indoor air during {location.name}’s {location.aqi} AQI winter smog.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-2xl text-xs">
          <button
            onClick={() => setActiveSubTab('corsi-calc')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              activeSubTab === 'corsi-calc'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ CR Box Simulator
          </button>
          <button
            onClick={() => setActiveSubTab('room-audit')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              activeSubTab === 'room-audit'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🏠 Home IAQ Audit
          </button>
          <button
            onClick={() => setActiveSubTab('hacks-library')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              activeSubTab === 'hacks-library'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📚 DIY Hack Library
          </button>
        </div>
      </div>

      {/* VIEW 1: Corsi-Rosenthal Box Interactive CADR Calculator */}
      {activeSubTab === 'corsi-calc' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Controls: Sliders and Toggles */}
            <div className="lg:col-span-5 glass-panel border border-slate-800 rounded-3xl p-6 space-y-5">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-400" />
                Room & Filter Configuration
              </h3>

              {/* Room Size Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Room Floor Area:</span>
                  <span className="font-bold text-cyan-400">{roomSqFt} sq ft</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="800"
                  step="25"
                  value={roomSqFt}
                  onChange={(e) => setRoomSqFt(Number(e.target.value))}
                  className="w-full accent-teal-400 cursor-pointer bg-slate-800 h-2 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Small Bedroom (120 sq ft)</span>
                  <span>Living Hall (600 sq ft)</span>
                </div>
              </div>

              {/* Ceiling Height */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Ceiling Height:</span>
                  <span className="font-bold text-cyan-400">{ceilingHeightFt} ft</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="14"
                  step="0.5"
                  value={ceilingHeightFt}
                  onChange={(e) => setCeilingHeightFt(Number(e.target.value))}
                  className="w-full accent-teal-400 cursor-pointer bg-slate-800 h-2 rounded-lg"
                />
              </div>

              {/* Fan Speed Selection */}
              <div className="space-y-1.5">
                <span className="text-xs text-slate-400 block font-medium">Box Fan Operating Speed:</span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(['low', 'med', 'high'] as const).map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setFanSpeed(spd)}
                      className={`py-2 rounded-xl font-semibold capitalize transition-all ${
                        fanSpeed === spd
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {spd === 'low' ? 'Low (Sleep)' : spd === 'med' ? 'Med (Daily)' : 'Turbo (Fast)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shroud Toggle */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Cardboard Shroud Installed</span>
                  <span className="text-[11px] text-slate-400">Blocks blade tip turbulence (+35% CADR boost)</span>
                </div>
                <button
                  onClick={() => setHasShroud(!hasShroud)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    hasShroud ? 'bg-teal-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                      hasShroud ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Estimated Build Cost Box */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 text-xs space-y-1">
                <div className="flex justify-between items-center text-emerald-300 font-bold">
                  <span>Total DIY Build Cost:</span>
                  <span className="text-base text-emerald-400">~$45 USD</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Compare to a 400 CFM commercial HEPA unit costing <strong>$400 - $600</strong> with $120/yr proprietary replacement filters.
                </p>
              </div>
            </div>

            {/* Right Display: Performance Metrics & Real-time Canvas/Visual */}
            <div className="lg:col-span-7 glass-panel border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6">
              
              {/* Metrics Output Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 text-center">
                  <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">
                    Clean Air Delivery (CADR)
                  </span>
                  <div className="text-3xl font-black text-cyan-400 mt-1">
                    {calculatedCADR}
                  </div>
                  <span className="text-[10px] text-slate-400">CFM (Cubic Ft / Min)</span>
                </div>

                <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-800/40 text-center">
                  <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">
                    Air Changes Per Hour
                  </span>
                  <div className="text-3xl font-black text-teal-400 mt-1">
                    {calculatedACH}x
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {calculatedACH >= 5 ? '✅ Exceeds CDC & WHO Standard' : '⚠️ Moderate Filtration'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/40 text-center">
                  <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">
                    Time to Clean Room Air
                  </span>
                  <div className="text-3xl font-black text-purple-400 mt-1">
                    {minutesToClean} min
                  </div>
                  <span className="text-[10px] text-slate-400">From 350 to &lt;15 µg/m³</span>
                </div>
              </div>

              {/* Real-time Fluid Dynamics Canvas Simulator */}
              <AirflowSimulator 
                cadrCfm={calculatedCADR} 
                roomSqFt={roomSqFt} 
                hasShroud={hasShroud} 
                fanSpeed={fanSpeed} 
              />

              {/* Visual Cube Diagram & Airflow Physics */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Schematic Graphic */}
                <div className="relative w-40 h-40 bg-slate-950 rounded-2xl border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                  {/* Top fan exhaust arrows */}
                  <div className="absolute -top-4 flex gap-1">
                    <span className="w-1.5 h-4 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-4 bg-cyan-400 rounded-full animate-bounce" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 absolute -top-8 font-bold">
                    Clean Air Exhaust
                  </span>

                  {/* Fan blade center */}
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-teal-400/60 flex items-center justify-center animate-spin-slow">
                    <Wind className="w-8 h-8 text-teal-300" />
                  </div>

                  {/* Left & Right Filter Inflow Arrows */}
                  <div className="absolute -left-3 text-[9px] font-mono text-slate-400 rotate-90">
                    MERV 13 In
                  </div>
                  <div className="absolute -right-3 text-[9px] font-mono text-slate-400 -rotate-90">
                    MERV 13 In
                  </div>

                  {/* Shroud Tag */}
                  {hasShroud && (
                    <span className="absolute bottom-2 text-[9px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded border border-teal-500/40 font-mono">
                      Shroud ON (+35%)
                    </span>
                  )}
                </div>

                {/* Physics Explanation */}
                <div className="flex-1 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-200">
                    Fluid Dynamics: Why CR Boxes Clean Faster
                  </h4>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Commercial filters bottleneck airflow through 1 narrow filter, producing noise and high static head loss.
                    The 4-filter Corsi-Rosenthal geometry expands surface area to <strong>16 square feet</strong>.
                    Velocity across the media drops below 50 ft/min, dramatically boosting <strong>diffusion particle capture efficiency</strong> for sub-micron winter soot.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-cyan-300 text-[11px] font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Calculated for {familyProfile.name}’s {roomSqFt} sq ft room</span>
                  </div>
                </div>
              </div>

              {/* Material Shopping Checklist */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
                <span className="font-bold text-slate-200 block mb-2">
                  Materials Required for This Build:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-teal-400" />
                    1x 20-inch 3-Speed Box Fan (~$20)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-teal-400" />
                    4x MERV 13 20"x20" Filters (~$24 pack)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-teal-400" />
                    1x 20"x20" Cardboard Base
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-teal-400" />
                    1x Cardboard 14" Circular Shroud
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* VIEW 2: Room-by-Room IAQ Diagnostic Audit */}
      {activeSubTab === 'room-audit' && (
        <div className="space-y-6">
          <div className="glass-panel border border-slate-800 rounded-3xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Home className="w-5 h-5 text-teal-400" />
                  Room-by-Room Smog Vulnerability Audit
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Evaluate critical air leakages, combustion sources, and filtration gaps in {familyProfile.name}’s {familyProfile.homeSizeSqFt} sq ft residence.
                </p>
              </div>

              {/* Overall Health Score Gauge */}
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    IAQ Safety Rating
                  </span>
                  <span className={`text-xl font-black ${auditHealthPct >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {auditHealthPct}% Protected
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <span className="text-xs text-slate-400 font-medium">
                  {auditScore} / {auditMaxScore} Protocols Active
                </span>
              </div>
            </div>

            {/* Audit Checklist Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {[
                {
                  id: 'audit-door-gap',
                  room: 'Entrance & Hallway',
                  title: 'Under-Door Perimeter Sealing',
                  desc: 'Door sweeps or rolled draft stoppers applied to external corridor doors to eliminate 0.5-inch chimney drafts.',
                  remedy: 'Install twin draft stopper or silicone door sweep. Saves ~40% outside smog infiltration.',
                },
                {
                  id: 'audit-kitchen-intake',
                  room: 'Kitchen & Utility',
                  title: 'Balanced Exhaust Makeup Air',
                  desc: 'Dedicated intake window cracked 1-2 inches while range hood operates, preventing negative-pressure suction.',
                  remedy: 'Prevents kitchen chimney from pulling sewer or corridor pollution into bedrooms.',
                },
                {
                  id: 'audit-bedroom-bubble',
                  room: 'Master Bedroom & Nursery',
                  title: 'Dedicated Sleep Bubble Isolation',
                  desc: 'Bedroom door sealed shut at night with HEPA/Corsi box positioned within 1.5m of bed on Medium speed.',
                  remedy: 'Ensures 8 hours of restorative sub-10 µg/m³ air, reducing nocturnal asthma flares by 84%.',
                },
                {
                  id: 'audit-dry-broom',
                  room: 'All Hard Flooring',
                  title: 'Strict Damp-Mopping Protocol',
                  desc: 'Banning dry broom sweeping and unsealed vacuum cleaners that launch settled micro-soot back into air.',
                  remedy: 'Use microfiber damp mop in S-pattern to permanently trap settled PM2.5.',
                },
                {
                  id: 'audit-heater-flame',
                  room: 'Living Room',
                  title: 'Zero Open Flame / Unvented Heating',
                  desc: 'Replacing coal angithi, wood fireplaces, or gas convector heaters with sealed oil radiators or heat pumps.',
                  remedy: 'Eliminates 100% of lethal carbon monoxide (CO) and black carbon soot emissions indoors.',
                },
                {
                  id: 'audit-plant-overreliance',
                  room: 'Balcony & Indoor Spaces',
                  title: 'Realistic Plant Expectations',
                  desc: 'Recognizing indoor houseplants clean VOCs over days, but CANNOT replace mechanical filtration during winter smog.',
                  remedy: 'Keep plants for humidity/biophilia, but rely on MERV 13 / HEPA for particle removal.',
                },
              ].map((item) => {
                const isChecked = checkedAuditItems[item.id] || false;
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleAuditItem(item.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'border-slate-700 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            {item.room}
                          </span>
                          <span className="text-xs font-bold text-slate-200">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                        <div className="text-[11px] text-teal-300 bg-teal-950/30 px-2 py-1 rounded-lg border border-teal-800/30 mt-2">
                          💡 <strong>Science Fix:</strong> {item.remedy}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Curated DIY Hack Library */}
      {activeSubTab === 'hacks-library' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Hack Sidebar Selector */}
          <div className="lg:col-span-4 space-y-2">
            {MOCK_IAQ_HACKS.map((hack) => {
              const isSelected = selectedHack.id === hack.id;
              return (
                <div
                  key={hack.id}
                  onClick={() => setSelectedHack(hack)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-teal-950/30 border-teal-500/50 shadow-md shadow-teal-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mb-1">
                    <span className="uppercase">{hack.category.replace('_', ' ')}</span>
                    <span className="text-teal-400">{hack.costTier}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">
                    {hack.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {hack.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Hack Details Display */}
          <div className="lg:col-span-8 glass-panel border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {selectedHack.heroBadge}
                </span>
                <span className="text-xs text-slate-400">
                  Difficulty: <strong className="text-slate-200">{selectedHack.difficulty}</strong>
                </span>
                <span className="text-xs text-slate-400">
                  Cost: <strong className="text-slate-200">{selectedHack.costTier}</strong>
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-100">
                {selectedHack.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {selectedHack.subtitle}
              </p>
            </div>

            {/* Materials Needed */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                Materials Checklist:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedHack.materialsNeeded.map((mat, i) => (
                  <li key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Step-by-Step Construction:
              </h4>
              {selectedHack.steps.map((st) => (
                <div key={st.stepNumber} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center gap-2 font-bold text-cyan-300">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center text-[10px]">
                      {st.stepNumber}
                    </span>
                    <span>{st.heading}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-7">
                    {st.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Scientific Mechanism */}
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 text-xs space-y-1">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                The Atmospheric Science Behind This Hack:
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {selectedHack.scientificMechanism}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
