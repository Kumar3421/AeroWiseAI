import React, { useMemo } from 'react';
import { 
  Wind, 
  Cigarette, 
  Layers, 
  Thermometer, 
  Droplets, 
  Gauge, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Activity
} from 'lucide-react';
import { LocationData, FamilyProfile } from '../types';
import { 
  getAQIColorClasses, 
  getAQILabel, 
  calculateCigaretteEquivalency, 
  getThermalInversionExplanation 
} from '../utils/airQualityUtils';

interface AQIOverviewHeaderProps {
  location: LocationData;
  familyProfile: FamilyProfile;
}

const AQIOverviewHeaderComponent: React.FC<AQIOverviewHeaderProps> = ({
  location,
  familyProfile,
}) => {
  const aqiColors = getAQIColorClasses(location.aqi);
  const aqiLabel = getAQILabel(location.aqi);
  const cigarettesDaily = useMemo(
    () => calculateCigaretteEquivalency(location.pm25),
    [location.pm25]
  );
  const inversion = useMemo(
    () => getThermalInversionExplanation(location.temperature, location.windSpeed),
    [location.temperature, location.windSpeed]
  );

  // Find safest ventilation hour
  const safeHour = location.hourlyForecast.find(h => h.safeToVentilate);

  return (
    <div className="bg-gradient-to-b from-slate-900/90 to-slate-950 border-b border-slate-800/80 px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Overview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Live AQI & Critical Status */}
          <div
            aria-live="polite"
            className={`p-4 rounded-2xl border ${aqiColors.border} ${aqiColors.bg} flex flex-col justify-between relative overflow-hidden`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                Air Quality Index (AQI)
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${aqiColors.badge}`}>
                {location.inversionRisk}
              </span>
            </div>

            <div className="my-3 flex items-baseline gap-3">
              <span className={`text-4xl sm:text-5xl font-black tracking-tight ${aqiColors.text}`}>
                {location.aqi}
              </span>
              <div>
                <span className={`text-base font-bold ${aqiColors.text} block leading-tight`}>
                  {aqiLabel}
                </span>
                <span className="text-xs text-slate-400">
                  PM2.5: <strong className="text-slate-200">{location.pm25} µg/m³</strong> (WHO limit: 15)
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-300 border-t border-slate-800/80 pt-2 flex items-center justify-between">
              <span>PM10: <strong>{location.pm10} µg</strong></span>
              <span>NO2: <strong>{location.no2} ppb</strong></span>
              <span>CO: <strong>{location.co} ppm</strong></span>
            </div>
          </div>

          {/* Card 2: Berkeley Earth Cigarette Inhalation Equivalent */}
          <div className="p-4 rounded-2xl border border-rose-900/40 bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <Cigarette className="w-4 h-4 text-rose-400" />
                Inhalation Equivalent
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                Berkeley Earth Metric
              </span>
            </div>

            <div className="my-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-rose-400">
                  {cigarettesDaily}
                </span>
                <span className="text-sm font-semibold text-rose-200">
                  cigarettes / day
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                24-hr outdoor unfiltered exposure in {location.name} equals smoking {cigarettesDaily} cigarettes.
                {familyProfile.hasInfants && (
                  <span className="text-amber-300 font-medium block mt-0.5">
                    ⚠️ Infants inhale ~50% more air per kg bodyweight!
                  </span>
                )}
              </p>
            </div>

            <div className="text-[11px] text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-800/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Sealed home with HEPA avoids ~{(cigarettesDaily * 0.88).toFixed(1)} cigs/day</span>
            </div>
          </div>

          {/* Card 3: Thermal Inversion Physics Status */}
          <div className="p-4 rounded-2xl border border-indigo-900/40 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-400" />
                Thermal Inversion Trap
              </span>
              <span className="text-[10px] font-bold text-indigo-300 bg-indigo-900/40 px-2 py-0.5 rounded border border-indigo-700/50">
                {inversion.trapRating}% Stagnant
              </span>
            </div>

            <div className="my-2">
              <div className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <span>{inversion.status}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                {inversion.description}
              </p>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-cyan-400" />
                {location.temperature}°C
              </span>
              <span className="flex items-center gap-1">
                <Droplets className="w-3 h-3 text-cyan-400" />
                {location.humidity}% Humid
              </span>
              <span className="flex items-center gap-1">
                <Wind className="w-3 h-3 text-cyan-400" />
                {location.windSpeed} km/h Wind
              </span>
            </div>
          </div>

          {/* Card 4: Daily Ventilation & Commute Guidance */}
          <div className="p-4 rounded-2xl border border-cyan-900/40 bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-950 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                Optimal Ventilation Window
              </span>
              <span className="text-[10px] font-bold text-cyan-300 bg-cyan-900/40 px-2 py-0.5 rounded border border-cyan-700/40">
                Solar Mixing
              </span>
            </div>

            <div className="my-2">
              <div className="text-base font-extrabold text-cyan-300 flex items-center gap-1.5">
                <span>{safeHour ? `${safeHour.hour} - 02:30 PM` : '1:00 PM - 2:30 PM'}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Midday sunshine breaks ground inversion. Safe to briefly flush indoor CO2 for 15 mins, then reseal and run HEPA on boost.
              </p>
            </div>

            <div className="text-[11px] text-rose-300 bg-rose-950/40 px-2.5 py-1 rounded-lg border border-rose-800/30 flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>DO NOT ventilate at 6-9 AM or 7-10 PM (Peak Trap)</span>
            </div>
          </div>

        </div>

        {/* 24-Hour Smog Inversion Curve & Ventilation Safety Track */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                24-Hour Smog Trapping Curve & Outdoor Safety Timeline
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Hourly exposure hazard reflecting temperature inversion boundary dynamics.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                Hazardous / Inversion Trapped
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Caution / Mask Mandatory
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Safe Window for 15-min Air Flush
              </span>
            </div>
          </div>

          {/* Timeline Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
            {location.hourlyForecast.map((hourData, idx) => {
              const hourAqiColors = getAQIColorClasses(hourData.aqi);
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    hourData.safeToVentilate 
                      ? 'bg-emerald-950/40 border-emerald-500/50 shadow-sm shadow-emerald-500/20' 
                      : hourData.commuteSafety === 'dangerous'
                        ? 'bg-rose-950/30 border-rose-800/40'
                        : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="text-[11px] font-mono text-slate-400 mb-1">
                    {hourData.hour}
                  </div>
                  <div className={`text-base font-extrabold ${hourAqiColors.text}`}>
                    {hourData.aqi}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {hourData.pm25} µg
                  </div>

                  <div className="mt-2 pt-1 border-t border-slate-800 text-[9px] font-medium">
                    {hourData.safeToVentilate ? (
                      <span className="text-emerald-400 flex items-center justify-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Vent Window
                      </span>
                    ) : hourData.inversionTrap ? (
                      <span className="text-rose-400 flex items-center justify-center gap-0.5">
                        <AlertCircle className="w-2.5 h-2.5" />
                        Trapped
                      </span>
                    ) : (
                      <span className="text-amber-400">Caution</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Primary Pollution Sources Footer */}
          <div className="mt-3 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 font-medium">
              Primary Regional Pollution Contributors:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {location.primarySources.map((source, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/60 text-slate-300 text-[11px]"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export const AQIOverviewHeader = React.memo(AQIOverviewHeaderComponent);
