# Security Policy

## Overview
AeroWise AI takes application security, privacy, and defensive engineering seriously. As an AI-powered environmental health copilot, user trust and data privacy are paramount.

## Architecture & Security Posture

### 1. Client-Side Zero Knowledge Architecture
- **No Remote Telemetry or Tracking:** AeroWise AI does not send personal user information, location coordinates, or family health records to third-party tracking services or analytics databases.
- **Client-Side API Key Storage:** User API keys (Gemini API, Google Maps) are stored exclusively in the browser's isolated `localStorage` or session memory. Keys never traverse any AeroWise backend or intermediary proxy.
- **Direct Origin Communication:** All API calls are executed directly from the user's browser client to official Google and Open-Meteo REST APIs over TLS 1.3 / HTTPS.

### 2. Content Security Policy (CSP)
AeroWise AI implements a strict Content Security Policy meta-declaration in `index.html`:
- Restricted `script-src` and `object-src 'none'` to block arbitrary script execution.
- Whitelisted `connect-src` limited to verified endpoints:
  - `https://api.open-meteo.com` (Weather metrics)
  - `https://air-quality-api.open-meteo.com` (Atmospheric chemistry data)
  - `https://geocoding-api.open-meteo.com` (City geocoding)
  - `https://generativelanguage.googleapis.com` (Google Gemini GenAI)
  - `https://airquality.googleapis.com` (Google Air Quality API)
- Fonts and styles restricted to official Google Fonts and local Vite assets.

### 3. XSS and Injection Defenses
- **Sanitized Markdown Rendering:** The AI Chat Assistant eliminates raw HTML injection via `dangerouslySetInnerHTML`. Instead, all inbound prompt responses are parsed through tokenized, HTML-escaped parsing utilities (`src/utils/sanitize.ts`).
- **Input Validation:** User text inputs across the City Search, Family Profile, and Chat Assistant are length-bounded, stripped of unprintable control characters, and typed via TypeScript strict checking.

### 4. Dependency Vulnerability Management
- All dependencies are regularly audited via `npm audit`.
- Peer dependencies and pinned development dependencies are locked in `package-lock.json`.

## Reporting a Vulnerability
If you discover a security vulnerability within AeroWise AI, please open a private GitHub advisory or email:
- **Maintainer:** `kumar3421`
- **Response SLA:** Within 48 hours
- **Resolution Timeline:** Critical patches dispatched within 7 days

Thank you for helping keep AeroWise AI safe and secure.
