import { describe, it, expect } from 'vitest';
import {
  getAQIColorClasses,
  getAQILabel,
  calculateCigaretteEquivalency,
  getThermalInversionExplanation,
} from '../utils/airQualityUtils';

describe('airQualityUtils', () => {
  describe('getAQILabel', () => {
    it('returns "Good" for AQI 0-50', () => {
      expect(getAQILabel(25)).toBe('Good');
      expect(getAQILabel(50)).toBe('Good');
    });

    it('returns "Moderate" for AQI 51-100', () => {
      expect(getAQILabel(75)).toBe('Moderate');
      expect(getAQILabel(100)).toBe('Moderate');
    });

    it('returns "Unhealthy for Sensitive Groups" for AQI 101-150', () => {
      expect(getAQILabel(125)).toBe('Unhealthy for Sensitive Groups');
    });

    it('returns "Unhealthy" for AQI 151-200', () => {
      expect(getAQILabel(175)).toBe('Unhealthy');
    });

    it('returns "Very Unhealthy" for AQI 201-300', () => {
      expect(getAQILabel(250)).toBe('Very Unhealthy');
    });

    it('returns hazardous labels for AQI above 300', () => {
      const label400 = getAQILabel(400);
      expect(['Hazardous / Severe', 'Severe Plus / Emergency']).toContain(label400);
    });
  });

  describe('getAQIColorClasses', () => {
    it('returns an object with text, bg, and border fields', () => {
      const result = getAQIColorClasses(100);
      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('bg');
      expect(result).toHaveProperty('border');
    });

    it('returns different colors for different AQI ranges', () => {
      const good = getAQIColorClasses(25);
      const hazardous = getAQIColorClasses(450);
      expect(good.text).not.toBe(hazardous.text);
    });
  });

  describe('calculateCigaretteEquivalency', () => {
    it('returns a number greater than 0 for PM2.5 above 0', () => {
      const cigs = calculateCigaretteEquivalency(100);
      expect(cigs).toBeGreaterThan(0);
    });

    it('returns higher equivalency for higher PM2.5', () => {
      const low = calculateCigaretteEquivalency(50);
      const high = calculateCigaretteEquivalency(400);
      expect(high).toBeGreaterThan(low);
    });

    it('returns 0 or near 0 for clean air', () => {
      const clean = calculateCigaretteEquivalency(0);
      expect(clean).toBeLessThanOrEqual(1);
    });
  });

  describe('getThermalInversionExplanation', () => {
    it('returns critical status for cold calm conditions', () => {
      const result = getThermalInversionExplanation(5, 2);
      expect(result.status).toBe('Critical Inversion');
      expect(result.trapRating).toBeGreaterThan(70);
    });

    it('returns lower trap rating for warm windy conditions', () => {
      const result = getThermalInversionExplanation(25, 15);
      expect(result.trapRating).toBeLessThan(50);
    });

    it('always includes a description string', () => {
      const result = getThermalInversionExplanation(10, 5);
      expect(result.description).toBeTruthy();
      expect(typeof result.description).toBe('string');
    });
  });
});
