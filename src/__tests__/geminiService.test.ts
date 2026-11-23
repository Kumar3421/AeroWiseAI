import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getStoredApiKey, setStoredApiKey } from '../services/geminiService';

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

describe('geminiService', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('API key storage', () => {
    it('returns empty string when no key stored', () => {
      expect(getStoredApiKey()).toBe('');
    });

    it('stores and retrieves API key correctly', () => {
      setStoredApiKey('AIzaSyTestKey123');
      expect(getStoredApiKey()).toBe('AIzaSyTestKey123');
    });

    it('handles clearing the API key', () => {
      setStoredApiKey('AIzaSyTestKey123');
      setStoredApiKey('');
      expect(getStoredApiKey()).toBe('');
    });
  });
});
