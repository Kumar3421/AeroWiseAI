export type AQILevel = 'good' | 'moderate' | 'unhealthySensitive' | 'unhealthy' | 'veryUnhealthy' | 'hazardous' | 'severePlus';

export interface LocationData {
  id: string;
  name: string;
  region: string;
  country: string;
  aqi: number;
  pm25: number; // ug/m3
  pm10: number; // ug/m3
  no2: number;  // ppb
  so2: number;  // ppb
  co: number;   // ppm
  temperature: number; // Celsius
  humidity: number;    // %
  windSpeed: number;   // km/h
  inversionRisk: 'Low' | 'Moderate' | 'High' | 'Severe Inversion Trapped';
  grapStage: 1 | 2 | 3 | 4; // Graded Response Action Plan
  primarySources: string[];
  lastUpdated: string;
  hourlyForecast: {
    hour: string;
    aqi: number;
    pm25: number;
    inversionTrap: boolean;
    safeToVentilate: boolean;
    commuteSafety: 'safe' | 'caution' | 'dangerous';
  }[];
}

export interface FamilyProfile {
  name: string;
  membersCount: number;
  hasInfants: boolean;
  hasElderly: boolean;
  hasAsthmaOrRespiratory: boolean;
  hasPets: boolean;
  homeType: 'apartment' | 'independent_house' | 'builder_floor';
  homeSizeSqFt: number;
  cookingFuel: 'lpg' | 'piped_gas' | 'induction' | 'biomass_wood';
  heatingType: 'electric_convector' | 'oil_radiator' | 'wood_fireplace' | 'reverse_cycle_ac' | 'none';
  commuteMode: 'metro_transit' | 'ev' | 'petrol_diesel_car' | 'two_wheeler_bike' | 'walk_cycle';
  dailyCommuteDistanceKm: number;
  budgetTier: 'budget_friendly' | 'moderate' | 'premium';
}

export interface RoutineSlot {
  id: string;
  timeWindow: string;
  period: 'Early Morning' | 'Morning Rush' | 'Midday' | 'Late Afternoon' | 'Evening Rush' | 'Night';
  title: string;
  category: 'ventilation' | 'commute' | 'exercise' | 'cooking' | 'school' | 'rest';
  conventionalPractice: string;
  lowEmissionSmartAction: string;
  exposureReductionPct: number;
  emissionSavedKgCO2: number;
  lungParticulateSavedUg: number;
  scientificWhy: string;
  riskRating: 'critical_hazard' | 'moderate' | 'safe_window';
  actionableChecklist: string[];
}

export interface IAQHack {
  id: string;
  title: string;
  subtitle: string;
  category: 'diy_filtration' | 'sealing_weatherproofing' | 'cleaning_protocol' | 'exhaust_management' | 'plants_moisture';
  difficulty: 'Easy (10 min)' | 'Moderate (30 min)' | 'Craftsman (1 hr)';
  costTier: 'Free / Zero-Cost' | '$10 - $25 (Budget)' | '$30 - $60 (High CADR DIY)';
  cadrDeliveredCfm?: number;
  efficiencyRating: number; // 0 - 100
  heroBadge: string;
  materialsNeeded: string[];
  steps: { stepNumber: number; heading: string; detail: string }[];
  criticalRules: string[];
  scientificMechanism: string;
}

export interface SustainableAlternative {
  id: string;
  category: 'Heating & Warmth' | 'Cooking & Kitchen' | 'Urban Commute' | 'Waste & Yard' | 'Community Energy';
  title: string;
  conventionalMethod: string;
  sustainableChoice: string;
  directLocalImpact: string;
  annualCO2ReductionKg: number;
  annualPM25ReductionGrams: number;
  healthSavingsEstUSD: number;
  paybackTimeline: string;
  difficultyToAdopt: 'Instant' | 'Easy' | 'Moderate Investment';
  tags: string[];
}

export interface CommunityPod {
  id: string;
  name: string;
  location: string;
  members: number;
  activePurifierShares: number;
  carpoolRidersCount: number;
  trashBurningReportsResolved: number;
  currentCleanAirPledge: string;
  recentActivity: {
    user: string;
    action: string;
    timestamp: string;
    impact: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  richCard?: {
    type: 'routine' | 'hack' | 'emergency_grap' | 'impact_stat';
    title: string;
    data: any;
  };
}
