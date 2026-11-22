import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Search, 
  Plus, 
  Sparkles, 
  Wind, 
  CheckCircle2, 
  AlertTriangle,
  Loader2,
  Radio,
  Globe
} from 'lucide-react';
import { LocationData } from '../types';
import { searchCityCoordinates, fetchLiveAirAndWeather } from '../services/weatherService';

interface CitySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAndSelectCity: (newCity: LocationData) => void;
}

const GLOBAL_SMOG_PRESETS = [
  { name: 'Kolkata', region: 'West Bengal', country: 'India', lat: 22.5726, lon: 88.3639 },
  { name: 'Kathmandu', region: 'Kathmandu Valley', country: 'Nepal', lat: 27.7172, lon: 85.3240 },
  { name: 'Ulaanbaatar', region: 'Tuul River Basin', country: 'Mongolia', lat: 47.9184, lon: 106.9177 },
  { name: 'Bangkok', region: 'Central Plain', country: 'Thailand', lat: 13.7563, lon: 100.5018 },
  { name: 'Milan', region: 'Po Valley', country: 'Italy', lat: 45.4642, lon: 9.1900 },
  { name: 'Tehran', region: 'Alborz Foot', country: 'Iran', lat: 35.6892, lon: 51.3890 },
  { name: 'Mumbai', region: 'Coastal Basin', country: 'India', lat: 19.0760, lon: 72.8777 },
  { name: 'Almaty', region: 'Zailiysky Alatau', country: 'Kazakhstan', lat: 43.2220, lon: 76.8512 },
];

export const CitySearchModal: React.FC<CitySearchModalProps> = ({
  isOpen,
  onClose,
  onAddAndSelectCity,
}) => {
  const [query, setQuery] = useState<string>('');
  const [customCountry, setCustomCountry] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>('');

  if (!isOpen) return null;

  const handleSelectPreset = async (preset: typeof GLOBAL_SMOG_PRESETS[0]) => {
    setIsSearching(true);
    setSearchError('');
    try {
      const liveData = await fetchLiveAirAndWeather(
        preset.lat, preset.lon,
        `${preset.name} - Urban Center`,
        preset.country, preset.region
      );
      onAddAndSelectCity(liveData);
      onClose();
    } catch (err) {
      setSearchError(`Failed to fetch live data for ${preset.name}. Try again.`);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCreateCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchError('');
    
    try {
      // Use geocoding API to find real coordinates
      const geo = await searchCityCoordinates(query.trim());
      
      if (geo) {
        // Fetch live data using real coordinates
        const liveData = await fetchLiveAirAndWeather(
          geo.latitude, geo.longitude,
          `${geo.name} - ${geo.region}`,
          customCountry.trim() || geo.country,
          geo.region
        );
        onAddAndSelectCity(liveData);
        onClose();
      } else {
        setSearchError(`Could not find "${query}". Try a different city name.`);
      }
    } catch (err) {
      setSearchError('Network error while searching. Please check your connection.');
    } finally {
      setIsSearching(false);
    }
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
                Monitor live air quality, inversion trapping, and tailored routines for any city.
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

        {/* Live Data Badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs">
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-300 font-medium">
            Cities are auto-populated with real-time AQI, weather, and hourly forecast from Open-Meteo Atmospheric Network.
          </span>
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
                disabled={isSearching}
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Country / State (Optional):</label>
              <input
                type="text"
                value={customCountry}
                onChange={(e) => setCustomCountry(e.target.value)}
                placeholder="e.g. India, Vietnam, USA..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500"
                disabled={isSearching}
              />
            </div>
          </div>

          {searchError && (
            <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSearching}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-slate-950 font-bold transition-all shadow-md shadow-cyan-600/20 flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Fetching Live Data...</span>
              </>
            ) : (
              <>
                <Globe className="w-4 h-4" />
                <span>Search & Add with Live Air Quality</span>
              </>
            )}
          </button>
        </form>

        {/* Global Smog Basins Presets */}
        <div className="space-y-2 border-t border-slate-800/80 pt-4 text-xs">
          <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
            Quick Select Global Winter Inversion Basins (Live Data):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {GLOBAL_SMOG_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                disabled={isSearching}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group disabled:opacity-50"
              >
                <div className="font-bold text-slate-200 group-hover:text-cyan-300">
                  {p.name}
                </div>
                <div className="text-[10px] text-slate-400">{p.country}</div>
                <div className="mt-1 flex items-center gap-1 text-[10px]">
                  <Radio className="w-2.5 h-2.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Live</span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
