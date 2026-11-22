import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AQIOverviewHeader } from './components/AQIOverviewHeader';
import { ChatAssistant } from './components/ChatAssistant';
import { DailyRoutineOptimizer } from './components/DailyRoutineOptimizer';
import { IAQLab } from './components/IAQLab';
import { SustainableAlternatives } from './components/SustainableAlternatives';
import { ImpactCalculator } from './components/ImpactCalculator';
import { CommunityPods } from './components/CommunityPods';
import { FamilyProfileModal } from './components/FamilyProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { GRAPModal } from './components/GRAPModal';
import { ParticleBackground } from './components/ParticleBackground';
import { CitySearchModal } from './components/CitySearchModal';
import { ExportReportModal } from './components/ExportReportModal';

import { LocationData, FamilyProfile } from './types';
import { MOCK_LOCATIONS, DEFAULT_FAMILY_PROFILE } from './data/mockData';
import { Wind, Heart, Sparkles, ShieldCheck } from 'lucide-react';

const PROFILE_STORAGE_KEY = 'aerowise_family_profile';
const ADOPTED_ROUTINES_KEY = 'aerowise_adopted_routines';
const ADOPTED_SWAPS_KEY = 'aerowise_adopted_swaps';

export function App() {
  const [locations, setLocations] = useState<LocationData[]>(MOCK_LOCATIONS);
  const [currentLocation, setCurrentLocation] = useState<LocationData>(MOCK_LOCATIONS[0]);
  
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

  const handleAddAndSelectCity = (newCity: LocationData) => {
    setLocations((prev) => [newCity, ...prev]);
    setCurrentLocation(newCity);
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
      {/* Ambient Atmospheric Smog & Clean Particle Background */}
      <ParticleBackground aqi={currentLocation.aqi} />

      {/* Top Navbar */}
      <Navbar
        currentLocation={currentLocation}
        allLocations={locations}
        onSelectLocation={setCurrentLocation}
        familyProfile={familyProfile}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenGrapModal={() => setIsGrapModalOpen(true)}
        onOpenCitySearch={() => setIsCitySearchOpen(true)}
        onOpenExportReport={() => setIsExportReportOpen(true)}
      />

      {/* Hyperlocal Smog Status Header Banner */}
      <AQIOverviewHeader
        location={currentLocation}
        familyProfile={familyProfile}
      />

      {/* Main Tab Content Area */}
      <main className="flex-1">
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
                Powered by Google Gemini GenAI & Atmospheric Fluid Dynamics Models
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <span>Berkeley Earth Particle Metrics</span>
            <span>•</span>
            <span>WHO Air Quality Guidelines 2021</span>
            <span>•</span>
            <span>Corsi-Rosenthal Foundation CADR Standards</span>
            <span>•</span>
            <span>Graded Response Action Plan (GRAP) Stage IV</span>
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
