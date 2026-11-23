import { describe, it, expect } from 'vitest';
import type { LocationData, FamilyProfile, RoutineSlot, ChatMessage } from '../types';

describe('TypeScript type definitions', () => {
  it('LocationData type accepts valid data', () => {
    const loc: LocationData = {
      id: 'test',
      name: 'Test City',
      region: 'Region',
      country: 'Country',
      aqi: 150,
      pm25: 80,
      pm10: 120,
      no2: 40,
      so2: 15,
      co: 1.5,
      temperature: 20,
      humidity: 60,
      windSpeed: 5,
      inversionRisk: 'High',
      grapStage: 2,
      primarySources: ['traffic', 'heating'],
      lastUpdated: 'just now',
      hourlyForecast: [
        { hour: '06:00', aqi: 160, pm25: 85, inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
      ],
    };
    expect(loc.id).toBe('test');
    expect(loc.aqi).toBe(150);
    expect(loc.hourlyForecast).toHaveLength(1);
  });

  it('FamilyProfile type accepts valid data', () => {
    const profile: FamilyProfile = {
      name: 'Test Family',
      membersCount: 4,
      hasInfants: true,
      hasElderly: false,
      hasAsthmaOrRespiratory: true,
      hasPets: false,
      homeType: 'apartment',
      homeSizeSqFt: 1200,
      cookingFuel: 'induction',
      heatingType: 'electric_convector',
      commuteMode: 'metro_transit',
      dailyCommuteDistanceKm: 15,
      budgetTier: 'moderate',
    };
    expect(profile.name).toBe('Test Family');
    expect(profile.hasInfants).toBe(true);
  });

  it('ChatMessage type accepts valid message', () => {
    const msg: ChatMessage = {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello',
      timestamp: '12:00',
      suggestedPrompts: ['test prompt'],
    };
    expect(msg.sender).toBe('assistant');
  });
});
