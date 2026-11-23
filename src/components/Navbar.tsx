import React from 'react';
import { 
  Wind, 
  MapPin, 
  Users, 
  Settings, 
  ShieldAlert, 
  Sparkles, 
  Calendar, 
  Wrench, 
  Leaf, 
  BarChart3, 
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
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-slate-950/75 backdrop-blur-2xl">
      {/* Top macOS-style Utility & Emergency Bar */}
      <div className="bg-gradient-to-r from-red-950/40 via-slate-900/60 to-amber-950/40 px-4 py-1.5 border-b border-white/[0.06] text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* macOS window control lights */}
          <div className="mac-traffic-lights mr-1.5 hidden sm:flex">
            <span className="mac-dot mac-dot-close" />
            <span className="mac-dot mac-dot-minimize" />
            <span className="mac-dot mac-dot-maximize" />
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-semibold text-rose-300">Winter Smog Alert:</span>
          <span className="text-slate-300 hidden md:inline text-[11px]">
            Thermal boundary layer trapping PM2.5 over {currentLocation.name}.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExportReport}
            aria-label="Export Plan as PDF or JSON"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/20 hover:bg-cyan-500/25 active:scale-95 transition-all text-[11px] font-medium"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Plan</span>
          </button>

          <button
            onClick={onOpenGrapModal}
            aria-label={`View GRAP Stage ${currentLocation.grapStage} emergency measures`}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 active:scale-95 transition-all text-[11px] font-medium"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>GRAP Stage {currentLocation.grapStage}</span>
          </button>

          <div className="h-3 w-px bg-white/10 hidden sm:block" />

          <button
            onClick={onOpenProfileModal}
            aria-label={`Configure family health profile for ${familyProfile.name}`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-white/[0.06] text-slate-300 hover:text-cyan-300 transition-all text-[11px]"
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium truncate max-w-[130px]">{familyProfile.name}</span>
            <span className="text-[10px] bg-slate-800/80 px-1.5 py-0.2 rounded-full text-slate-400 border border-white/5">
              {familyProfile.membersCount}
            </span>
          </button>
        </div>
      </div>

      {/* Main macOS Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & App Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-white/20">
            <Wind className="w-5 h-5 text-slate-950 font-extrabold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                AeroWise AI
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-cyan-300 border border-white/10">
                macOS Fluid v2.5
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-tight">
              Winter Smog & Clean Air Copilot for Families & Communities
            </p>
          </div>
        </div>

        {/* Location Selector, Live Sync, and AQI Capsule */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Location Selector (macOS Dropdown) */}
          <div className="relative flex items-center bg-slate-900/80 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 hover:border-white/20 transition-all shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 mr-1.5 shrink-0" />
            <select
              id="city-selector"
              aria-label="Select Current City Location"
              value={currentLocation.id}
              onChange={(e) => {
                const found = allLocations.find((l) => l.id === e.target.value);
                if (found) onSelectLocation(found);
              }}
              className="bg-transparent text-slate-200 outline-none font-medium cursor-pointer text-xs"
            >
              {allLocations.map((loc) => (
                <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-200">
                  {loc.name} — AQI {loc.aqi}
                </option>
              ))}
            </select>
          </div>

          {/* Add City Button */}
          <button
            onClick={onOpenCitySearch}
            className="p-1.5 px-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-white/20 transition-all shadow-sm flex items-center gap-1.5 text-xs font-medium active:scale-95"
            title="Search or Add Any Global City"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Add City</span>
          </button>

          {/* Live Sync Pill */}
          {onSyncLive && (
            <button
              onClick={onSyncLive}
              disabled={isLiveLoading}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border active:scale-95 ${
                isLiveMode
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30 hover:bg-emerald-500/25 shadow-sm shadow-emerald-500/10'
                  : 'bg-rose-500/15 text-rose-300 border-rose-400/30 hover:bg-rose-500/25'
              } ${isLiveLoading ? 'opacity-60 cursor-wait' : ''}`}
              title="Fetch real-time air quality & weather data"
            >
              {isLiveLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : isLiveMode ? (
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
              )}
              <span>{isLiveLoading ? 'Syncing...' : isLiveMode ? 'Live' : 'Sync Live'}</span>
            </button>
          )}

          {/* Dynamic AQI Pill */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${aqiColors.border} ${aqiColors.bg} transition-all shadow-sm`}>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">AQI</span>
                <span className={`text-sm font-black ${aqiColors.text}`}>
                  {currentLocation.aqi}
                </span>
              </div>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="text-xs">
              <div className={`font-bold ${aqiColors.text} leading-none text-[11px]`}>{aqiLabel}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">PM2.5: {currentLocation.pm25} µg</div>
            </div>
          </div>

          {/* Settings Button */}
          <button
            onClick={onOpenSettingsModal}
            aria-label="Configure Gemini API Key & Model Settings"
            title="Configure Gemini API Key & Model Settings"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-white/10 hover:border-white/20 transition-all shadow-sm active:scale-95"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary Navigation - macOS Native Segmented Control */}
      <nav aria-label="Main Application Navigation" className="max-w-7xl mx-auto px-4 sm:px-6 pb-2.5 pt-0.5 overflow-x-auto scrollbar-none">
        <div role="tablist" aria-label="AeroWise Modules" className="mac-segmented-track inline-flex items-center gap-1 min-w-full sm:min-w-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`mac-segmented-item flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap ${
                  isActive
                    ? 'mac-segmented-active text-cyan-300'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
