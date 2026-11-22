import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Key, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Trash2,
  Globe
} from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../services/geminiService';
import { getStoredGoogleMapsKey, setStoredGoogleMapsKey } from '../services/weatherService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeyUpdated: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onApiKeyUpdated,
}) => {
  const [keyInput, setKeyInput] = useState<string>(getStoredApiKey());
  const [mapsKeyInput, setMapsKeyInput] = useState<string>(getStoredGoogleMapsKey());
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    if (!keyInput.trim()) {
      setTestResult({ success: false, message: 'Please enter a Gemini API key first.' });
      return;
    }
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyInput.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Hello, respond with: OK' }] }]
        })
      });

      if (res.ok) {
        setTestResult({ success: true, message: 'API key verified! Connected to Google Gemini 1.5 Flash.' });
      } else {
        const err = await res.json().catch(() => ({}));
        setTestResult({ success: false, message: `Verification failed: ${err.error?.message || res.statusText}. Built-in expert engine will remain active.` });
      }
    } catch (e: any) {
      setTestResult({ success: false, message: `Network request error: ${e.message || 'Check connection'}.` });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredApiKey(keyInput);
    setStoredGoogleMapsKey(mapsKeyInput);
    setSaveSuccess(true);
    onApiKeyUpdated();
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setKeyInput('');
    setStoredApiKey('');
    setMapsKeyInput('');
    setStoredGoogleMapsKey('');
    onApiKeyUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="glass-panel border border-white/10 rounded-[24px] w-full max-w-lg p-6 space-y-5 shadow-2xl animate-mac-pop max-h-[90vh] overflow-y-auto">
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
                <Settings className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-100 tracking-tight">
                AeroWise AI Preferences
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

        {/* Engine Status Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2 text-xs shadow-inner">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-300">Active Intelligence Engine:</span>
            {keyInput.trim() ? (
              <span className="text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Live Gemini 1.5 Flash Connected
              </span>
            ) : (
              <span className="text-cyan-400 font-mono bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Built-in Smog AI Active
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {keyInput.trim()
              ? 'Multi-turn reasoning powered directly by Google Generative AI with personalized prompt grounding.'
              : 'Our zero-latency atmospheric and pediatric health engine provides instant domain-accurate answers without requiring an external API key.'}
          </p>
        </div>

        {/* API Key Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {/* Gemini API Key */}
          <div>
            <label className="text-slate-300 block mb-1 font-semibold flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google Gemini API Key (Optional):</span>
            </label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-900/90 border border-white/10 rounded-xl p-2.5 text-slate-200 outline-none focus:border-cyan-400 font-mono"
            />
            <div className="flex items-center justify-between mt-1.5">
              <p className="text-[10px] text-slate-500">
                Powers the AI Smog Copilot chat with live Gemini reasoning.
              </p>
              <button
                type="button"
                onClick={handleTestKey}
                disabled={isTesting || !keyInput.trim()}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-white/10 text-[11px] font-semibold transition-colors disabled:opacity-40"
              >
                {isTesting ? 'Verifying...' : 'Test Connection'}
              </button>
            </div>
          </div>

          {testResult && (
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              testResult.success 
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
            }`}>
              {testResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> : <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />}
              <span className="leading-snug">{testResult.message}</span>
            </div>
          )}

          {/* Google Maps / Air Quality API Key */}
          <div className="pt-2 border-t border-white/[0.08]">
            <label className="text-slate-300 block mb-1 font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>Google Maps Platform API Key (Optional):</span>
            </label>
            <input
              type="password"
              value={mapsKeyInput}
              onChange={(e) => setMapsKeyInput(e.target.value)}
              placeholder="AIzaSy... (Air Quality API enabled)"
              className="w-full bg-slate-900/90 border border-white/10 rounded-xl p-2.5 text-slate-200 outline-none focus:border-teal-400 font-mono"
            />
            <div className="mt-1.5 p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
              <p className="text-[10px] text-slate-500 leading-relaxed">
                <strong className="text-teal-400">Not required!</strong> AeroWise AI uses <strong className="text-slate-300">Open-Meteo</strong> (free, no key) for live weather, AQI, PM2.5, and hourly forecasts by default. 
                Adding a Google Maps Platform key provides premium pollutant data as an optional upgrade.
              </p>
            </div>
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Settings saved successfully!</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={handleClear}
              className="text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors text-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Keys</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-semibold border border-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-slate-950 font-bold shadow-md shadow-cyan-600/20 active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
