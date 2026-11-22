import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Home, 
  Heart, 
  Flame, 
  Car, 
  Baby, 
  Activity, 
  Save, 
  Check
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-100">
                Household & Vulnerability Profile
              </h3>
              <p className="text-xs text-slate-400">
                Personalizes routines, CADR calculations, and clinical exposure warnings.
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

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Family Name & Member Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Household Name / Label:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500 font-medium"
                required
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Number of Residents:</label>
              <input
                type="number"
                min="1"
                max="15"
                value={formData.membersCount}
                onChange={(e) => setFormData({ ...formData, membersCount: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500 font-medium"
                required
              />
            </div>
          </div>

          {/* Vulnerability Checkboxes */}
          <div>
            <label className="text-slate-300 block mb-2 font-bold uppercase tracking-wider text-[11px]">
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
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isChecked
                        ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Home Type:</label>
              <select
                value={formData.homeType}
                onChange={(e) => setFormData({ ...formData, homeType: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500"
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
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Cooking & Heating Fuels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Primary Kitchen Cooking:</label>
              <select
                value={formData.cookingFuel}
                onChange={(e) => setFormData({ ...formData, cookingFuel: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500"
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
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500"
              >
                <option value="electric_convector">Electric Convector / Oil Radiator</option>
                <option value="reverse_cycle_ac">Inverter Heat Pump / Warm AC</option>
                <option value="wood_fireplace">Open Wood Fireplace / Angithi</option>
                <option value="none">No Space Heating</option>
              </select>
            </div>
          </div>

          {/* Commute */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Daily Commute Mode:</label>
              <select
                value={formData.commuteMode}
                onChange={(e) => setFormData({ ...formData, commuteMode: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500"
              >
                <option value="metro_transit">Metro / Subway / Train</option>
                <option value="ev">Electric Vehicle (EV)</option>
                <option value="petrol_diesel_car">Petrol / Diesel Car</option>
                <option value="two_wheeler_bike">Two-Wheeler Motorcycle / Scooter</option>
                <option value="walk_cycle">Bicycle / Walk</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Daily Roundtrip Commute (km):</label>
              <input
                type="number"
                min="0"
                max="200"
                value={formData.dailyCommuteDistanceKm}
                onChange={(e) => setFormData({ ...formData, dailyCommuteDistanceKm: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-slate-950 font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/20"
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
