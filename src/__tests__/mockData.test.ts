import { describe, it, expect } from 'vitest';
import { MOCK_LOCATIONS, DEFAULT_FAMILY_PROFILE, MOCK_ROUTINE_SLOTS, MOCK_IAQ_HACKS, MOCK_SUSTAINABLE_ALTERNATIVES, MOCK_COMMUNITY_PODS, GRAP_EMERGENCY_PROTOCOLS } from '../data/mockData';

describe('mockData integrity', () => {
  describe('MOCK_LOCATIONS', () => {
    it('contains exactly 6 preset cities', () => {
      expect(MOCK_LOCATIONS).toHaveLength(6);
    });

    it('every location has required fields', () => {
      MOCK_LOCATIONS.forEach((loc) => {
        expect(loc).toHaveProperty('id');
        expect(loc).toHaveProperty('name');
        expect(loc).toHaveProperty('aqi');
        expect(loc).toHaveProperty('pm25');
        expect(loc).toHaveProperty('latitude');
        expect(loc).toHaveProperty('longitude');
        expect(loc).toHaveProperty('hourlyForecast');
        expect(loc.hourlyForecast.length).toBeGreaterThan(0);
      });
    });

    it('AQI values are within valid range (0-500+)', () => {
      MOCK_LOCATIONS.forEach((loc) => {
        expect(loc.aqi).toBeGreaterThanOrEqual(0);
        expect(loc.aqi).toBeLessThanOrEqual(600);
      });
    });

    it('coordinates are within valid ranges', () => {
      MOCK_LOCATIONS.forEach((loc) => {
        expect(loc.latitude).toBeGreaterThanOrEqual(-90);
        expect(loc.latitude).toBeLessThanOrEqual(90);
        expect(loc.longitude).toBeGreaterThanOrEqual(-180);
        expect(loc.longitude).toBeLessThanOrEqual(180);
      });
    });
  });

  describe('DEFAULT_FAMILY_PROFILE', () => {
    it('has all required profile fields', () => {
      expect(DEFAULT_FAMILY_PROFILE).toHaveProperty('name');
      expect(DEFAULT_FAMILY_PROFILE).toHaveProperty('membersCount');
      expect(DEFAULT_FAMILY_PROFILE).toHaveProperty('hasInfants');
      expect(DEFAULT_FAMILY_PROFILE).toHaveProperty('hasElderly');
      expect(DEFAULT_FAMILY_PROFILE).toHaveProperty('hasAsthmaOrRespiratory');
      expect(DEFAULT_FAMILY_PROFILE).toHaveProperty('cookingFuel');
      expect(DEFAULT_FAMILY_PROFILE).toHaveProperty('heatingType');
      expect(DEFAULT_FAMILY_PROFILE).toHaveProperty('commuteMode');
    });
  });

  describe('MOCK_ROUTINE_SLOTS', () => {
    it('covers all 5 daily time periods', () => {
      expect(MOCK_ROUTINE_SLOTS.length).toBeGreaterThanOrEqual(5);
      MOCK_ROUTINE_SLOTS.forEach((slot) => {
        expect(slot.exposureReductionPct).toBeGreaterThan(0);
        expect(slot.exposureReductionPct).toBeLessThanOrEqual(100);
        expect(slot.actionableChecklist.length).toBeGreaterThan(0);
      });
    });
  });

  describe('GRAP_EMERGENCY_PROTOCOLS', () => {
    it('defines all 4 stages', () => {
      expect(GRAP_EMERGENCY_PROTOCOLS).toHaveProperty('stage1');
      expect(GRAP_EMERGENCY_PROTOCOLS).toHaveProperty('stage2');
      expect(GRAP_EMERGENCY_PROTOCOLS).toHaveProperty('stage3');
      expect(GRAP_EMERGENCY_PROTOCOLS).toHaveProperty('stage4');
    });

    it('each stage has actionItems array', () => {
      Object.values(GRAP_EMERGENCY_PROTOCOLS).forEach((stage) => {
        expect(stage.actionItems).toBeDefined();
        expect(stage.actionItems.length).toBeGreaterThan(0);
      });
    });
  });
});
