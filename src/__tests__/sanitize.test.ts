import { describe, it, expect } from 'vitest';
import { escapeHtml, sanitizeInput, parseSafeAssistantMarkdown } from '../utils/sanitize';

describe('sanitize utilities', () => {
  describe('escapeHtml', () => {
    it('escapes dangerous HTML characters', () => {
      const input = '<script>alert("XSS")</script>&foo=\'bar\'';
      const escaped = escapeHtml(input);
      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('&lt;script&gt;');
      expect(escaped).toContain('&quot;XSS&quot;');
      expect(escaped).toContain('&#x27;bar&#x27;');
    });

    it('handles empty or non-string inputs safely', () => {
      expect(escapeHtml('')).toBe('');
      // @ts-expect-error test invalid input
      expect(escapeHtml(null)).toBe('');
    });
  });

  describe('sanitizeInput', () => {
    it('trims whitespace and strips control characters', () => {
      const dirty = '   \u0000Hello World!\u0007   ';
      const clean = sanitizeInput(dirty);
      expect(clean).toBe('Hello World!');
    });

    it('respects maxLength limit', () => {
      const longStr = 'a'.repeat(200);
      const capped = sanitizeInput(longStr, 50);
      expect(capped.length).toBe(50);
    });
  });

  describe('parseSafeAssistantMarkdown', () => {
    it('parses bold tags safely into token objects', () => {
      const text = 'Air quality is **Severe** today.';
      const lines = parseSafeAssistantMarkdown(text);
      expect(lines.length).toBe(1);
      const parts = lines[0];
      expect(parts.some((p) => p.type === 'bold' && p.content === 'Severe')).toBe(true);
    });

    it('identifies bullet points', () => {
      const bulletText = '* Avoid outdoor exercise\n* Wear N95 mask';
      const lines = parseSafeAssistantMarkdown(bulletText);
      expect(lines.length).toBe(2);
      expect(lines[0][0].type).toBe('bullet');
    });
  });
});
