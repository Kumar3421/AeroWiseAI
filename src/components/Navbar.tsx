import React from 'react';
import { 
  Wind, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Settings, 
  ShieldAlert, 
  Sparkles, 
  Calendar, 
  Wrench, 
  Leaf, 
  BarChart3, 
  Flame,
  Search,
  FileText,
  RefreshCw,
  Radio,
  Loader2
} from 'lucide-react';
import { LocationData, FamilyProfile } from '../types';
import { getAQIColorClasses, getAQILabel } from '../utils/airQualityUtils';

interface NavbarProps {
  currentLocation: LocationData;
  allLocations: LocationData[];
  onSelectLocation: (loc: LocationData) => void;
  familyProfile: FamilyProfile;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenProfileModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenGrapModal: () => void;
  onOpenCitySearch: () => void;
  onOpenExportReport: () => void;
  onSyncLive?: () => void;
  isLiveLoading?: boolean;
  isLiveMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLocation,
  allLocations,
  onSelectLocation,
  familyProfile,
  activeTab,
  onSelectTab,
  onOpenProfileModal,
  onOpenSettingsModal,
  onOpenGrapModal,
  onOpenCitySearch,
  onOpenExportReport,
  onSyncLive,
  isLiveLoading = false,
  isLiveMode = false,
}) => {
  const aqiColors = getAQIColorClasses(currentLocation.aqi);
  const aqiLabel = getAQILabel(currentLocation.aqi);

  const tabs = [
    { id: 'copilot', label: 'AI Smog Copilot', icon: Sparkles },
    { id: 'routine', label: 'Smart Routine', icon: Calendar },
    { id: 'iaq-lab', label: 'IAQ Hacks & DIY', icon: Wrench },
    { id: 'alternatives', label: 'Clean Alternatives', icon: Leaf },
    { id: 'impact', label: 'Direct Impact', icon: BarChart3 },
    { id: 'community', label: 'Community Pods', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      {/* Top Utility & Emergency Bar */}
      <div className="bg-gradient-to-r from-red-950/60 via-slate-900 to-amber-950/60 px-4 py-1.5 border-b border-slate-800/80 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-semibold text-rose-300">Winter Smog Emergency Active:</span>
          <span className="text-slate-300 hidden sm:inline">
            Severe thermal boundary inversion trapping PM2.5 in {currentLocation.name}.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenExportReport}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition-all font-medium"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Family Plan</span>
          </button>

          <button
            onClick={onOpenGrapModal}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-all font-medium"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>GRAP Stage {currentLocation.grapStage} Active</span>
          </button>

          <div className="h-3 w-px bg-slate-700 hidden sm:block" />

          <button
            onClick={onOpenProfileModal}
            className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium truncate max-w-[140px]">{familyProfile.name}</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded text-slate-400">
              {familyProfile.membersCount} ppl
            </span>
          </button>
        </div>
      </div>

      {/* Main Brand & Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-300/30">
            <Wind className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                AeroWise AI
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
                v2.5 SmogShield
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Winter Smog & Clean Air Copilot for Families & Communities
            </p>
          </div>
        </div>

        {/* Location Selector & AQI Pill */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Location Selector */}
          <div className="relative flex items-center bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-200 hover:border-slate-600 transition-all shadow-inner">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 mr-2 shrink-0" />
            <select
              value={currentLocation.id}
              onChange={(e) => {
                const found = allLocations.find((l) => l.id === e.target.value);
                if (found) onSelectLocation(found);
              }}
              className="bg-transparent text-slate-200 outline-none font-medium cursor-pointer pr-1"
            >
              {allLocations.map((loc) => (
                <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-200">
                  {loc.name} ({loc.country}) — AQI {loc.aqi}
                </option>
              ))}
            </select>
          </div>

          {/* Search or Add Custom City */}
          <button
            onClick={onOpenCitySearch}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700/80 transition-colors shadow-inner flex items-center gap-1.5 text-xs font-semibold"
            title="Search or Add Any Global City"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Add City</span>
          </button>

          {/* Live Sync Button */}
          {onSyncLive && (
            <button
              onClick={onSyncLive}
              disabled={isLiveLoading}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                isLiveMode
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25'
                  : 'bg-rose-500/15 text-rose-300 border-rose-500/40 hover:bg-rose-500/25'
              } ${isLiveLoading ? 'opacity-60 cursor-wait' : ''}`}
              title="Fetch real-time air quality & weather data"
            >
              {isLiveLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : isLiveMode ? (
                <Radio className="w-3.5 h-3.5" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              <span>{isLiveLoading ? 'Syncing...' : isLiveMode ? 'Live' : 'Sync Live'}</span>
            </button>
          )}

          {/* Dynamic AQI Pill */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${aqiColors.border} ${aqiColors.bg} transition-all`}>
            <div className="text-right">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">AQI</span>
                <span className={`text-base font-extrabold ${aqiColors.text}`}>
                  {currentLocation.aqi}
                </span>
              </div>
            </div>
            <div className="h-6 w-px bg-slate-700/60" />
            <div className="text-xs">
              <div className={`font-semibold ${aqiColors.text} leading-tight`}>{aqiLabel}</div>
              <div className="text-[10px] text-slate-400">PM2.5: {currentLocation.pm25} µg/m³</div>
            </div>
          </div>

          {/* Live timestamp badge */}
          {isLiveMode && currentLocation.lastUpdated && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-mono">
              {currentLocation.lastUpdated}
            </span>
          )}

          {/* Settings Button */}
          <button
            onClick={onOpenSettingsModal}
            title="Configure Gemini API Key & Model Settings"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto gap-1 border-t border-slate-800/60 py-1.5 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
