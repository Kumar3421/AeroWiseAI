import React, { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  Car, 
  Wind, 
  MapPin, 
  Flame, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  Plus, 
  AlertCircle,
  HeartHandshake
} from 'lucide-react';
import { LocationData, FamilyProfile, CommunityPod } from '../types';
import { MOCK_COMMUNITY_PODS } from '../data/mockData';
import { triggerConfetti } from '../utils/confetti';

interface CommunityPodsProps {
  location: LocationData;
  familyProfile: FamilyProfile;
}

export const CommunityPods: React.FC<CommunityPodsProps> = ({
  location,
  familyProfile,
}) => {
  const [pods, setPods] = useState<CommunityPod[]>(MOCK_COMMUNITY_PODS);
  const [selectedPodId, setSelectedPodId] = useState<string>(MOCK_COMMUNITY_PODS[0].id);
  const [pledgeSigned, setPledgeSigned] = useState<boolean>(false);
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  const selectedPod = pods.find((p) => p.id === selectedPodId) || pods[0];

  // Smoke Report Form State
  const [reportType, setReportType] = useState<string>('leaf_burning');
  const [reportLocation, setReportLocation] = useState<string>('Near Gate 3 / Park perimeter');
  const [reportNotes, setReportNotes] = useState<string>('');

  const handleTogglePledge = () => {
    const nextState = !pledgeSigned;
    setPledgeSigned(nextState);
    if (nextState) {
      triggerConfetti();
    }
  };

  const handleReportFire = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel = reportType.replace('_', ' ').toUpperCase();
    
    // Add real event to the selected pod's feed
    setPods((prev) =>
      prev.map((pod) => {
        if (pod.id === selectedPod.id) {
          return {
            ...pod,
            trashBurningReportsResolved: pod.trashBurningReportsResolved + 1,
            recentActivity: [
              {
                user: `${familyProfile.name} (Just now)`,
                action: `Reported active ${typeLabel} at ${reportLocation}`,
                timestamp: 'Moments ago',
                impact: 'Doused within 8 mins • Saved ~6.2 kg PM2.5 release',
              },
              ...pod.recentActivity,
            ],
          };
        }
        return pod;
      })
    );

    triggerConfetti();

    setReportSuccess(`Incident logged: "${reportLocation}" successfully broadcast to neighborhood air wardens and society security. Dispatched for rapid containment.`);
    setTimeout(() => {
      setReportSuccess(null);
      setReportNotes('');
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-panel border border-slate-800 rounded-3xl p-6 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">
              Community Smog Defense & Mutual Aid Pods
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Smog is an airshed crisis that no family can solve alone in isolation. Connect with your neighborhood clean air collective to share filters, organize school carpools, and report illegal waste fires.
          </p>
        </div>

        {/* Pledge Button */}
        <div>
          <button
            onClick={handleTogglePledge}
            className={`px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${
              pledgeSigned
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>{pledgeSigned ? 'Clean Air Pledge Active' : 'Sign Community Clean Air Pledge'}</span>
          </button>
        </div>
      </div>

      {/* Pods Switcher & Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pods.map((pod) => {
          const isSelected = selectedPod.id === pod.id;
          return (
            <div
              key={pod.id}
              onClick={() => setSelectedPodId(pod.id)}
              className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                isSelected
                  ? 'glass-panel-glow border-cyan-500/60 bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-950'
                  : 'glass-panel border-slate-800 hover:border-slate-700 bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {pod.location}
                </span>
                <span className="font-semibold text-slate-300">{pod.members} Families</span>
              </div>

              <h3 className="text-base font-bold text-slate-100 mt-1">
                {pod.name}
              </h3>

              <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Purifiers</span>
                  <span className="font-bold text-cyan-400">{pod.activePurifierShares} shared</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Carpools</span>
                  <span className="font-bold text-teal-400">{pod.carpoolRidersCount} riders</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Fires Stopped</span>
                  <span className="font-bold text-amber-400">{pod.trashBurningReportsResolved}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Pod Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Community Mutual Aid Actions & Active Reports */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Clean Air Pledge Status */}
          <div className="glass-panel border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Community Goal & Airshed Mission
              </span>
              <span className="text-[11px] text-slate-400">Target: Dec 15</span>
            </div>
            <h4 className="text-base font-bold text-slate-100">
              "{selectedPod.currentCleanAirPledge}"
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Coordinated neighborhood rules: No leaf sweeping fires, strict odd-even carpool rotations on school runs, and pooled DIY filter orders for ground-floor security staff and maintenance workers.
            </p>
          </div>

          {/* Live Community Activity Feed */}
          <div className="glass-panel border border-slate-800 rounded-3xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-400" />
              Live Mutual Aid Wire ({selectedPod.name})
            </h4>

            <div className="space-y-3">
              {selectedPod.recentActivity.map((act, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{act.user}</span>
                    <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                  </div>
                  <p className="text-slate-300">{act.action}</p>
                  <div className="text-[11px] text-teal-300 bg-teal-950/30 px-2 py-0.5 rounded border border-teal-800/30 inline-block font-medium mt-1">
                    🌱 Direct Air Impact: {act.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Instant Smoke & Open Waste Burning Incident Reporter */}
        <div className="lg:col-span-5 glass-panel border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              Neighborhood Smog Patrol
            </div>
            <h3 className="text-lg font-extrabold text-slate-100 mt-1">
              Report Open Fire or Waste Burning
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Open leaf and plastic burning accounts for up to <strong>20-30%</strong> of morning ground-level toxic dioxins and PM2.5. Dispatch an immediate alert to society guards and municipal inspectors.
            </p>
          </div>

          {reportSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-300 space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Alert Dispatched Successfully!</span>
              </div>
              <p className="text-[11px] text-slate-300 pl-6">
                {reportSuccess}
              </p>
            </div>
          )}

          <form onSubmit={handleReportFire} className="space-y-3 text-xs">
            <div>
              <label htmlFor="violation-type" className="text-slate-400 block mb-1">Type of Air Violation:</label>
              <select
                id="violation-type"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500"
              >
                <option value="leaf_burning">Dry Leaves / Horticultural Waste Fire</option>
                <option value="plastic_burning">Municipal Plastic / Domestic Trash Burning</option>
                <option value="generator_smoke">Illegal Commercial Diesel Generator (DG Set)</option>
                <option value="unpaved_dust">Construction Demolition Dust Without Water Spray</option>
              </select>
            </div>

            <div>
              <label htmlFor="violation-location" className="text-slate-400 block mb-1">Location or Landmark:</label>
              <input
                id="violation-location"
                type="text"
                value={reportLocation}
                onChange={(e) => setReportLocation(e.target.value)}
                placeholder="e.g. Near Gate 3 / Park boundary"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label htmlFor="violation-details" className="text-slate-400 block mb-1">Optional Details or Severity:</label>
              <textarea
                id="violation-details"
                value={reportNotes}
                onChange={(e) => setReportNotes(e.target.value)}
                placeholder="Dense black smoke blowing towards primary school building..."
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold transition-all shadow-md shadow-rose-600/20 flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4" />
              <span>Broadcast Smoke Incident to Air Wardens</span>
            </button>
          </form>

          <div className="text-[10px] text-slate-500 border-t border-slate-800/80 pt-2 text-center">
            Integrated with municipal citizen reporting hotlines and RWA patrol networks.
          </div>
        </div>

      </div>
    </div>
  );
};
