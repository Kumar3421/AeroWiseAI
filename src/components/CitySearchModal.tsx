import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Search, 
  Plus, 
  Sparkles, 
  Wind, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { LocationData } from '../types';

interface CitySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAndSelectCity: (newCity: LocationData) => void;
}

const GLOBAL_SMOG_PRESETS = [
  { name: 'Kolkata', region: 'West Bengal', country: 'India', aqi: 310, pm25: 260, temp: 18, inversion: 'High' },
  { name: 'Kathmandu', region: 'Kathmandu Valley', country: 'Nepal', aqi: 240, pm25: 190, temp: 8, inversion: 'Severe Inversion Trapped' },
  { name: 'Ulaanbaatar', region: 'Tuul River Basin', country: 'Mongolia', aqi: 420, pm25: 350, temp: -16, inversion: 'Severe Inversion Trapped' },
  { name: 'Bangkok', region: 'Central Plain', country: 'Thailand', aqi: 175, pm25: 85, temp: 26, inversion: 'Moderate' },
  { name: 'Milan', region: 'Po Valley', country: 'Italy', aqi: 165, pm25: 82, temp: 4, inversion: 'High' },
  { name: 'Tehran', region: 'Alborz Foot', country: 'Iran', aqi: 280, pm25: 220, temp: 7, inversion: 'Severe Inversion Trapped' },
  { name: 'Mumbai', region: 'Coastal Basin', country: 'India', aqi: 195, pm25: 110, temp: 24, inversion: 'Moderate' },
  { name: 'Almaty', region: 'Zailiysky Alatau', country: 'Kazakhstan', aqi: 260, pm25: 205, temp: -5, inversion: 'Severe Inversion Trapped' },
];

export const CitySearchModal: React.FC<CitySearchModalProps> = ({
  isOpen,
  onClose,
  onAddAndSelectCity,
}) => {
  const [query, setQuery] = useState<string>('');
  const [customCountry, setCustomCountry] = useState<string>('');
  const [estimatedAQI, setEstimatedAQI] = useState<number>(275);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof GLOBAL_SMOG_PRESETS[0]) => {
    const newLocation: LocationData = {
      id: `loc-${Date.now()}`,
      name: `${preset.name} - Urban Center`,
      region: preset.region,
      country: preset.country,
      aqi: preset.aqi,
      pm25: preset.pm25,
      pm10: Math.round(preset.pm25 * 1.4),
      no2: Math.round(preset.pm25 * 0.22),
      so2: Math.round(preset.pm25 * 0.08),
      co: Number((preset.pm25 * 0.009).toFixed(1)),
      temperature: preset.temp,
      humidity: 72,
      windSpeed: 3.5,
      inversionRisk: preset.inversion as any,
      grapStage: preset.aqi > 400 ? 4 : preset.aqi > 300 ? 3 : preset.aqi > 200 ? 2 : 1,
      primarySources: ['Vehicular exhaust', 'Local heating & biomass', 'Thermal boundary stagnation', 'Suspended road dust'],
      lastUpdated: 'Just now',
      hourlyForecast: [
        { hour: '06:00', aqi: Math.round(preset.aqi * 1.15), pm25: Math.round(preset.pm25 * 1.15), inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
        { hour: '09:00', aqi: Math.round(preset.aqi * 1.1), pm25: Math.round(preset.pm25 * 1.1), inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
        { hour: '13:00', aqi: Math.round(preset.aqi * 0.72), pm25: Math.round(preset.pm25 * 0.72), inversionTrap: false, safeToVentilate: true, commuteSafety: 'caution' },
        { hour: '17:00', aqi: Math.round(preset.aqi * 0.95), pm25: Math.round(preset.pm25 * 0.95), inversionTrap: false, safeToVentilate: false, commuteSafety: 'caution' },
        { hour: '21:00', aqi: Math.round(preset.aqi * 1.08), pm25: Math.round(preset.pm25 * 1.08), inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
      ],
    };

    onAddAndSelectCity(newLocation);
    onClose();
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const pm25 = Math.round(estimatedAQI * 0.82);
    const newLocation: LocationData = {
      id: `custom-${Date.now()}`,
      name: query.trim(),
      region: 'Metropolitan Airshed',
      country: customCountry.trim() || 'Global',
      aqi: estimatedAQI,
      pm25: pm25,
      pm10: Math.round(pm25 * 1.45),
      no2: Math.round(pm25 * 0.24),
      so2: Math.round(pm25 * 0.08),
      co: 2.1,
      temperature: 8,
      humidity: 75,
      windSpeed: 3.2,
      inversionRisk: estimatedAQI > 300 ? 'Severe Inversion Trapped' : estimatedAQI > 180 ? 'High' : 'Moderate',
      grapStage: estimatedAQI > 400 ? 4 : estimatedAQI > 300 ? 3 : estimatedAQI > 200 ? 2 : 1,
      primarySources: ['Local traffic exhaust', 'Winter boundary stagnation', 'Heating emissions'],
      lastUpdated: 'Just now (Simulated)',
      hourlyForecast: [
        { hour: '06:00', aqi: Math.round(estimatedAQI * 1.12), pm25: Math.round(pm25 * 1.12), inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
        { hour: '10:00', aqi: Math.round(estimatedAQI * 1.05), pm25: Math.round(pm25 * 1.05), inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
        { hour: '14:00', aqi: Math.round(estimatedAQI * 0.7), pm25: Math.round(pm25 * 0.7), inversionTrap: false, safeToVentilate: true, commuteSafety: 'caution' },
        { hour: '18:00', aqi: Math.round(estimatedAQI * 0.98), pm25: Math.round(pm25 * 0.98), inversionTrap: false, safeToVentilate: false, commuteSafety: 'caution' },
        { hour: '22:00', aqi: Math.round(estimatedAQI * 1.1), pm25: Math.round(pm25 * 1.1), inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
      ],
    };

    onAddAndSelectCity(newLocation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel border border-slate-800 rounded-3xl w-full max-w-xl p-6 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <MapPin className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-100">
                Search or Add Hyperlocal Location
              </h3>
              <p className="text-xs text-slate-400">
                Monitor winter smog, inversion trapping, and tailored routines for any city.
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

        {/* Custom City Form */}
        <form onSubmit={handleCreateCustom} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">City Name:</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Kolkata, Hanoi, Chicago..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500"
                required
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Country / State:</label>
              <input
                type="text"
                value={customCountry}
                onChange={(e) => setCustomCountry(e.target.value)}
                placeholder="e.g. India, Vietnam, USA..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Estimated Current Winter AQI:</span>
              <strong className="text-cyan-400">{estimatedAQI} AQI</strong>
            </div>
            <input
              type="range"
              min="50"
              max="550"
              step="5"
              value={estimatedAQI}
              onChange={(e) => setEstimatedAQI(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>Moderate (50)</span>
              <span>Severe Inversion (350)</span>
              <span>Emergency (550)</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-slate-950 font-bold transition-all shadow-md shadow-cyan-600/20 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add & Navigate to This City</span>
          </button>
        </form>

        {/* Global Smog Basins Presets */}
        <div className="space-y-2 border-t border-slate-800/80 pt-4 text-xs">
          <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
            Quick Select Global Winter Inversion Basins:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {GLOBAL_SMOG_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group"
              >
                <div className="font-bold text-slate-200 group-hover:text-cyan-300">
                  {p.name}
                </div>
                <div className="text-[10px] text-slate-400">{p.country}</div>
                <div className="mt-1 flex items-center justify-between text-[10px]">
                  <span className={p.aqi > 300 ? 'text-rose-400 font-bold' : 'text-amber-400 font-bold'}>
                    AQI {p.aqi}
                  </span>
                  <span className="text-slate-500">{p.temp}°C</span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
