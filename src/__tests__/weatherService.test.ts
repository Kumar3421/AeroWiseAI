import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchLiveAirAndWeather,
  searchCityCoordinates,
  getStoredGoogleMapsKey,
  setStoredGoogleMapsKey,
  CITY_COORDINATES,
} from '../services/weatherService';

// Mock fetch globally
const mockFetch = vi.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).fetch = mockFetch;

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, val: string) => { store[key] = val; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, configurable: true });

describe('weatherService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  describe('CITY_COORDINATES', () => {
    it('contains coordinates for all 6 preset cities', () => {
      expect(CITY_COORDINATES).toHaveProperty('delhi');
      expect(CITY_COORDINATES).toHaveProperty('lahore');
      expect(CITY_COORDINATES).toHaveProperty('beijing');
      expect(CITY_COORDINATES).toHaveProperty('saltlake');
      expect(CITY_COORDINATES).toHaveProperty('krakow');
      expect(CITY_COORDINATES).toHaveProperty('london');
    });

    it('has valid lat/lon ranges for Delhi', () => {
      const delhi = CITY_COORDINATES.delhi;
      expect(delhi.lat).toBeCloseTo(28.6139, 1);
      expect(delhi.lon).toBeCloseTo(77.209, 1);
    });
  });

  describe('Google Maps key storage', () => {
    it('returns empty string when no key is stored', () => {
      expect(getStoredGoogleMapsKey()).toBe('');
    });

    it('stores and retrieves the key correctly', () => {
      setStoredGoogleMapsKey('test-key-123');
      expect(getStoredGoogleMapsKey()).toBe('test-key-123');
    });

    it('trims whitespace from stored key', () => {
      setStoredGoogleMapsKey('  key-with-spaces  ');
      expect(getStoredGoogleMapsKey()).toBe('key-with-spaces');
    });
  });

  describe('searchCityCoordinates', () => {
    it('returns null when API returns no results', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      });
      const result = await searchCityCoordinates('nonexistentcity');
      expect(result).toBeNull();
    });

    it('returns geocoding result for valid city', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          results: [{
            name: 'Delhi',
            country: 'India',
            admin1: 'Delhi',
            latitude: 28.6139,
            longitude: 77.209,
          }],
        }),
      });
      const result = await searchCityCoordinates('Delhi');
      expect(result).not.toBeNull();
      expect(result!.name).toBe('Delhi');
      expect(result!.latitude).toBeCloseTo(28.6139, 1);
    });

    it('handles network errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      const result = await searchCityCoordinates('Delhi');
      expect(result).toBeNull();
    });
  });

  describe('fetchLiveAirAndWeather', () => {
    it('returns LocationData with required fields', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          current: {
            temperature_2m: 15,
            relative_humidity_2m: 65,
            wind_speed_10m: 4.5,
            us_aqi: 180,
            pm2_5: 90,
            pm10: 120,
            nitrogen_dioxide: 40,
            sulphur_dioxide: 15,
            carbon_monoxide: 1200,
          },
          hourly: { time: [], us_aqi: [], pm2_5: [] },
        }),
      });

      const result = await fetchLiveAirAndWeather(28.6, 77.2, 'Delhi', 'India', 'NCR');

      expect(result).toHaveProperty('aqi');
      expect(result).toHaveProperty('pm25');
      expect(result).toHaveProperty('temperature');
      expect(result).toHaveProperty('humidity');
      expect(result).toHaveProperty('windSpeed');
      expect(result).toHaveProperty('hourlyForecast');
      expect(result).toHaveProperty('inversionRisk');
      expect(result).toHaveProperty('grapStage');
      expect(result.isLive).toBe(true);
      expect(result.name).toBe('Delhi');
    });

    it('derives correct GRAP stage from AQI', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          current: {
            temperature_2m: 10, relative_humidity_2m: 80,
            wind_speed_10m: 3, us_aqi: 480, pm2_5: 400,
            pm10: 500, nitrogen_dioxide: 80, sulphur_dioxide: 20,
            carbon_monoxide: 3000,
          },
          hourly: { time: [], us_aqi: [], pm2_5: [] },
        }),
      });

      const result = await fetchLiveAirAndWeather(28.6, 77.2, 'Delhi', 'India', 'NCR');
      expect(result.grapStage).toBe(4); // AQI > 450 = Stage 4
    });
  });
});
