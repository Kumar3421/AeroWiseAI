import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Baby, 
  Activity, 
  Heart, 
  Save 
} from 'lucide-react';
import { FamilyProfile } from '../types';

interface FamilyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FamilyProfile;
  onSaveProfile: (updated: FamilyProfile) => void;
}

export const FamilyProfileModal: React.FC<FamilyProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<FamilyProfile>({ ...profile });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="glass-panel border border-white/10 rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl animate-mac-pop">
        {/* macOS Window Titlebar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="mac-traffic-lights">
              <button type="button" onClick={onClose} className="mac-dot mac-dot-close" title="Close" />
              <span className="mac-dot mac-dot-minimize" />
              <span className="mac-dot mac-dot-maximize" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Users className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-100 tracking-tight">
                Household & Vulnerability Profile
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

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Family Name & Member Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="household-name" className="text-slate-400 block mb-1 font-semibold">Household Name / Label:</label>
              <input
                id="household-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900/90 border border-white/10 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-400 font-medium"
                required
              />
            </div>
            <div>
              <label htmlFor="household-residents" className="text-slate-400 block mb-1 font-semibold">Number of Residents:</label>
              <input
                id="household-residents"
                type="number"
                min="1"
                max="15"
                value={formData.membersCount}
                onChange={(e) => setFormData({ ...formData, membersCount: Number(e.target.value) })}
                className="w-full bg-slate-900/90 border border-white/10 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-400 font-medium"
                required
              />
            </div>
          </div>

          {/* Vulnerability Checkboxes */}
          <div>
            <label className="text-slate-300 block mb-2 font-bold uppercase tracking-wider text-[10px]">
              Vulnerable Family Members in Home:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { key: 'hasInfants', label: 'Infants / Toddlers', icon: Baby },
                { key: 'hasElderly', label: 'Elderly (65+)', icon: Users },
                { key: 'hasAsthmaOrRespiratory', label: 'Asthma / COPD', icon: Activity },
                { key: 'hasPets', label: 'Pets (Dogs/Cats)', icon: Heart },
              ].map((item) => {
                const Icon = item.icon;
                const isChecked = Boolean((formData as any)[item.key]);
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFormData({ ...formData, [item.key]: !isChecked })}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between active:scale-95 ${
                      isChecked
                        ? 'bg-cyan-950/40 border-cyan-400/50 text-cyan-200 shadow-sm shadow-cyan-500/10'
                        : 'bg-slate-900/80 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-2 ${isChecked ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span className="font-semibold text-xs">{item.label}</span>
                    <span className="text-[10px] mt-1 text-slate-400">
                      {isChecked ? 'Flagged High Risk' : 'None'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Housing Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Home Type:</label>
              <select
                value={formData.homeType}
                onChange={(e) => setFormData({ ...formData, homeType: e.target.value as any })}
                className="w-full bg-slate-900/90 border border-white/10 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-400"
              >
                <option value="apartment">Multi-Story Apartment Flat</option>
                <option value="builder_floor">Independent Builder Floor</option>
                <option value="independent_house">Standalone House / Villa</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Total Floor Area (sq ft):</label>
              <input
                type="number"
                min="300"
                max="8000"
                step="50"
                value={formData.homeSizeSqFt}
                onChange={(e) => setFormData({ ...formData, homeSizeSqFt: Number(e.target.value) })}
                className="w-full bg-slate-900/90 border border-white/10 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Cooking & Heating Fuels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Primary Kitchen Cooking:</label>
              <select
                value={formData.cookingFuel}
                onChange={(e) => setFormData({ ...formData, cookingFuel: e.target.value as any })}
                className="w-full bg-slate-900/90 border border-white/10 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-400"
              >
                <option value="piped_gas">Piped Natural Gas (PNG)</option>
                <option value="lpg">LPG Cylinder Flame</option>
                <option value="induction">Electric Induction (Zero Emission)</option>
                <option value="biomass_wood">Biomass / Chulha (High Risk)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Winter Space Heating:</label>
              <select
                value={formData.heatingType}
                onChange={(e) => setFormData({ ...formData, heatingType: e.target.value as any })}
                className="w-full bg-slate-900/90 border border-white/10 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-400"
              >
                <option value="electric_convector">Electric Convector / Oil Radiator</option>
                <option value="reverse_cycle_ac">Inverter Heat Pump / Warm AC</option>
                <option value="wood_fireplace">Open Wood Fireplace / Angithi</option>
                <option value="none">No Space Heating</option>
              </select>
            </div>
          </div>

          {/* Commute */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Daily Commute Mode:</label>
              <select
                value={formData.commuteMode}
                onChange={(e) => setFormData({ ...formData, commuteMode: e.target.value as any })}
                className="w-full bg-slate-900/90 border border-white/10 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-400"
              >
                <option value="metro_transit">Metro / Subway / Train</option>
                <option value="ev">Electric Vehicle (EV)</option>
                <option value="petrol_diesel_car">Petrol / Diesel Car</option>
                <option value="two_wheeler_bike">Two-Wheeler Motorcycle / Scooter</option>
                <option value="walk_cycle">Bicycle / Walk</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Daily Commute (km):</label>
              <input
                type="number"
                min="0"
                max="200"
                value={formData.dailyCommuteDistanceKm}
                onChange={(e) => setFormData({ ...formData, dailyCommuteDistanceKm: Number(e.target.value) })}
                className="w-full bg-slate-900/90 border border-white/10 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 font-semibold border border-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-slate-950 font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/20 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Update Household Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
