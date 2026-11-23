import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { AQIOverviewHeader } from './components/AQIOverviewHeader';
import { FamilyProfileModal } from './components/FamilyProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { GRAPModal } from './components/GRAPModal';
import { ParticleBackground } from './components/ParticleBackground';
import { CitySearchModal } from './components/CitySearchModal';
import { ExportReportModal } from './components/ExportReportModal';

import { LocationData, FamilyProfile } from './types';
import { MOCK_LOCATIONS, DEFAULT_FAMILY_PROFILE } from './data/mockData';
import { fetchLiveAirAndWeather, CITY_COORDINATES } from './services/weatherService';
import { Wind } from 'lucide-react';

// Code-split dynamic tabs for optimal bundle size & performance
const ChatAssistant = lazy(() => import('./components/ChatAssistant').then((m) => ({ default: m.ChatAssistant })));
const DailyRoutineOptimizer = lazy(() => import('./components/DailyRoutineOptimizer').then((m) => ({ default: m.DailyRoutineOptimizer })));
const IAQLab = lazy(() => import('./components/IAQLab').then((m) => ({ default: m.IAQLab })));
const SustainableAlternatives = lazy(() => import('./components/SustainableAlternatives').then((m) => ({ default: m.SustainableAlternatives })));
const ImpactCalculator = lazy(() => import('./components/ImpactCalculator').then((m) => ({ default: m.ImpactCalculator })));
const CommunityPods = lazy(() => import('./components/CommunityPods').then((m) => ({ default: m.CommunityPods })));

const PROFILE_STORAGE_KEY = 'aerowise_family_profile';
const ADOPTED_ROUTINES_KEY = 'aerowise_adopted_routines';
const ADOPTED_SWAPS_KEY = 'aerowise_adopted_swaps';

export function App() {
  const [locations, setLocations] = useState<LocationData[]>(MOCK_LOCATIONS);
  const [currentLocation, setCurrentLocation] = useState<LocationData>(MOCK_LOCATIONS[0]);
  const [isLiveLoading, setIsLiveLoading] = useState<boolean>(false);
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);
  
  // Family profile with local storage persistence
  const [familyProfile, setFamilyProfile] = useState<FamilyProfile>(() => {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_FAMILY_PROFILE;
  });

  // Adopted Routines and Swaps
  const [adoptedRoutineIds, setAdoptedRoutineIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(ADOPTED_ROUTINES_KEY);
    return saved ? JSON.parse(saved) : ['slot-1', 'slot-3', 'slot-5'];
  });

  const [adoptedSwapIds, setAdoptedSwapIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(ADOPTED_SWAPS_KEY);
    return saved ? JSON.parse(saved) : ['alt-heating', 'alt-mobility'];
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>('copilot');

  // Modals
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isGrapModalOpen, setIsGrapModalOpen] = useState<boolean>(false);
  const [isCitySearchOpen, setIsCitySearchOpen] = useState<boolean>(false);
  const [isExportReportOpen, setIsExportReportOpen] = useState<boolean>(false);

  // Sync live data for a location
  const syncLiveData = useCallback(async (loc: LocationData) => {
    const lat = loc.latitude || CITY_COORDINATES[loc.id]?.lat;
    const lon = loc.longitude || CITY_COORDINATES[loc.id]?.lon;
    if (!lat || !lon) return; // No coordinates, keep mock data
    
    setIsLiveLoading(true);
    try {
      const liveData = await fetchLiveAirAndWeather(
        lat, lon, loc.name, loc.country, loc.region
      );
      // Merge live data into location, preserving id and primarySources from mock if available
      const merged: LocationData = {
        ...liveData,
        id: loc.id,
        name: loc.name,
        primarySources: loc.primarySources.length > 2 ? loc.primarySources : liveData.primarySources,
      };
      setCurrentLocation(merged);
      setIsLiveMode(true);
      // Also update this location in the locations array
      setLocations(prev => prev.map(l => l.id === loc.id ? merged : l));
    } catch (err) {
      console.error('Live data sync failed, keeping cached data:', err);
    } finally {
      setIsLiveLoading(false);
    }
  }, []);

  // Auto-sync live data on first mount
  useEffect(() => {
    syncLiveData(MOCK_LOCATIONS[0]);
  }, [syncLiveData]);

  const handleSyncLive = useCallback(() => {
    syncLiveData(currentLocation);
  }, [currentLocation, syncLiveData]);

  const handleSelectLocation = useCallback((loc: LocationData) => {
    setCurrentLocation(loc);
    setIsLiveMode(false);
    // Auto-sync live data when switching cities
    syncLiveData(loc);
  }, [syncLiveData]);

  const handleAddAndSelectCity = (newCity: LocationData) => {
    setLocations((prev) => [newCity, ...prev]);
    setCurrentLocation(newCity);
    if (newCity.isLive) {
      setIsLiveMode(true);
    }
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(familyProfile));
  }, [familyProfile]);

  useEffect(() => {
    localStorage.setItem(ADOPTED_ROUTINES_KEY, JSON.stringify(adoptedRoutineIds));
  }, [adoptedRoutineIds]);

  useEffect(() => {
    localStorage.setItem(ADOPTED_SWAPS_KEY, JSON.stringify(adoptedSwapIds));
  }, [adoptedSwapIds]);

  const toggleAdoptRoutine = (id: string) => {
    setAdoptedRoutineIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAdoptSwap = (id: string) => {
    setAdoptedSwapIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white relative">
      {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Ambient Atmospheric Smog & Clean Particle Background */}
      <ParticleBackground aqi={currentLocation.aqi} />

      {/* Top Navbar */}
      <Navbar
        currentLocation={currentLocation}
        allLocations={locations}
        onSelectLocation={handleSelectLocation}
        familyProfile={familyProfile}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenGrapModal={() => setIsGrapModalOpen(true)}
        onOpenCitySearch={() => setIsCitySearchOpen(true)}
        onOpenExportReport={() => setIsExportReportOpen(true)}
        onSyncLive={handleSyncLive}
        isLiveLoading={isLiveLoading}
        isLiveMode={isLiveMode}
      />

      {/* Hyperlocal Smog Status Header Banner */}
      <AQIOverviewHeader
        location={currentLocation}
        familyProfile={familyProfile}
      />

      {/* Main Tab Content Area */}
      <main
        id="main-content"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="flex-1"
      >
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[420px] gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              <p className="text-xs text-slate-400 font-mono">Loading module...</p>
            </div>
          }
        >
          {activeTab === 'copilot' && (
            <ChatAssistant
              location={currentLocation}
              familyProfile={familyProfile}
              onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === 'routine' && (
            <DailyRoutineOptimizer
              location={currentLocation}
              familyProfile={familyProfile}
              adoptedRoutineIds={adoptedRoutineIds}
              onToggleAdoptRoutine={toggleAdoptRoutine}
            />
          )}

          {activeTab === 'iaq-lab' && (
            <IAQLab
              location={currentLocation}
              familyProfile={familyProfile}
            />
          )}

          {activeTab === 'alternatives' && (
            <SustainableAlternatives
              location={currentLocation}
              familyProfile={familyProfile}
              adoptedSwapIds={adoptedSwapIds}
              onToggleAdoptSwap={toggleAdoptSwap}
            />
          )}

          {activeTab === 'impact' && (
            <ImpactCalculator
              location={currentLocation}
              familyProfile={familyProfile}
              adoptedRoutineCount={adoptedRoutineIds.length}
              adoptedSwapCount={adoptedSwapIds.length}
            />
          )}

          {activeTab === 'community' && (
            <CommunityPods
              location={currentLocation}
              familyProfile={familyProfile}
            />
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800/80 bg-slate-950/80 py-8 px-4 sm:px-6 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-200">AeroWise AI</span> — Winter Smog & Community Clean Air Copilot
              <p className="text-[11px] text-slate-500 mt-0.5">
                Powered by Google Gemini GenAI • Open-Meteo Live Atmospheric Data • WHO Air Quality Guidelines
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <span>Open-Meteo Atmospheric Network</span>
            <span>•</span>
            <span>Berkeley Earth Particle Metrics</span>
            <span>•</span>
            <span>Corsi-Rosenthal Foundation CADR Standards</span>
            <span>•</span>
            <span>GRAP Stage IV Protocols</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <FamilyProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={familyProfile}
        onSaveProfile={setFamilyProfile}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onApiKeyUpdated={() => {}}
      />

      <GRAPModal
        isOpen={isGrapModalOpen}
        onClose={() => setIsGrapModalOpen(false)}
        location={currentLocation}
        familyProfile={familyProfile}
      />

      <CitySearchModal
        isOpen={isCitySearchOpen}
        onClose={() => setIsCitySearchOpen(false)}
        onAddAndSelectCity={handleAddAndSelectCity}
      />

      <ExportReportModal
        isOpen={isExportReportOpen}
        onClose={() => setIsExportReportOpen(false)}
        location={currentLocation}
        familyProfile={familyProfile}
        adoptedRoutineIds={adoptedRoutineIds}
      />
    </div>
  );
}
export default App;
