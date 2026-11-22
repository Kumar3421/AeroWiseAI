import { AQILevel } from '../types';

export function getAQILevel(aqi: number): AQILevel {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'unhealthySensitive';
  if (aqi <= 200) return 'unhealthy';
  if (aqi <= 300) return 'veryUnhealthy';
  if (aqi <= 400) return 'hazardous';
  return 'severePlus';
}

export function getAQILabel(aqi: number): string {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  if (aqi <= 400) return 'Hazardous / Severe';
  return 'Severe Plus / Emergency';
}

export function getAQIColorClasses(aqi: number): {
  bg: string;
  text: string;
  border: string;
  badge: string;
  glow: string;
} {
  const level = getAQILevel(aqi);
  switch (level) {
    case 'good':
      return {
        bg: 'bg-emerald-950/60',
        text: 'text-emerald-400',
        border: 'border-emerald-500/40',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        glow: 'shadow-emerald-500/20',
      };
    case 'moderate':
      return {
        bg: 'bg-amber-950/60',
        text: 'text-amber-400',
        border: 'border-amber-500/40',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        glow: 'shadow-amber-500/20',
      };
    case 'unhealthySensitive':
      return {
        bg: 'bg-orange-950/60',
        text: 'text-orange-400',
        border: 'border-orange-500/40',
        badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        glow: 'shadow-orange-500/20',
      };
    case 'unhealthy':
      return {
        bg: 'bg-red-950/60',
        text: 'text-red-400',
        border: 'border-red-500/40',
        badge: 'bg-red-500/20 text-red-300 border-red-500/30',
        glow: 'shadow-red-500/20',
      };
    case 'veryUnhealthy':
      return {
        bg: 'bg-purple-950/60',
        text: 'text-purple-400',
        border: 'border-purple-500/40',
        badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        glow: 'shadow-purple-500/20',
      };
    case 'hazardous':
      return {
        bg: 'bg-rose-950/80',
        text: 'text-rose-400',
        border: 'border-rose-600/50',
        badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        glow: 'shadow-rose-600/30',
      };
    case 'severePlus':
    default:
      return {
        bg: 'bg-fuchsia-950/90',
        text: 'text-fuchsia-300',
        border: 'border-fuchsia-600/60',
        badge: 'bg-fuchsia-500/30 text-fuchsia-200 border-fuchsia-400/50',
        glow: 'shadow-fuchsia-600/40',
      };
  }
}

/**
 * Berkeley Earth Rule of Thumb:
 * 1 cigarette ~ 22 ug/m3 of PM2.5 inhaled over 24 hours.
 * Cigarettes = (PM2.5 in ug/m3) / 22
 */
export function calculateCigaretteEquivalency(pm25: number): number {
  return Number((pm25 / 22).toFixed(1));
}

/**
 * Micrograms of PM2.5 inhaled per 24 hours:
 * Average human respiring ~15 cubic meters of air per day.
 * Total inhaled PM2.5 (ug) = PM2.5 (ug/m3) * 15 m3
 */
export function calculateInhaledParticulateDaily(pm25: number, indoorFilterEffPct = 0): {
  totalUgInhaled: number;
  avoidedUg: number;
} {
  const baseInhaled = pm25 * 15;
  const filtered = baseInhaled * (1 - indoorFilterEffPct / 100);
  return {
    totalUgInhaled: Math.round(filtered),
    avoidedUg: Math.round(baseInhaled - filtered),
  };
}

/**
 * Thermal Inversion Index explanation:
 * Explains why winter air is stagnant and traps ground emissions
 */
export function getThermalInversionExplanation(temp: number, windSpeed: number): {
  status: 'Critical Inversion' | 'Moderate Stagnation' | 'Normal Dispersion';
  description: string;
  trapRating: number; // 0 to 100
} {
  if (temp < 15 && windSpeed < 5) {
    return {
      status: 'Critical Inversion',
      description: 'Severe temperature inversion layer acts like a atmospheric lid, trapping vehicular exhaust, biomass smoke, and dust within 100-200m of the ground.',
      trapRating: 92,
    };
  }
  if (temp < 20 && windSpeed < 10) {
    return {
      status: 'Moderate Stagnation',
      description: 'Cool nighttime and morning air boundary layers restrict upward thermal convection, causing particulate build-up during peak hours.',
      trapRating: 64,
    };
  }
  return {
    status: 'Normal Dispersion',
    description: 'Adequate thermal mixing and ambient wind speeds facilitate horizontal and vertical atmospheric dispersion of pollutants.',
    trapRating: 25,
  };
}
