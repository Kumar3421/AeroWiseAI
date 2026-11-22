# 🌬️ AeroWise AI — Winter Smog & Community Clean Air Copilot

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://aerowise-ai.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Kumar3421/AeroWiseAI)

> **Live Deployment:** **[https://aerowise-ai.vercel.app](https://aerowise-ai.vercel.app)**  
> **GitHub Repository:** **[https://github.com/Kumar3421/AeroWiseAI](https://github.com/Kumar3421/AeroWiseAI)**  

---

> **A GenAI-powered environmental health assistant helping families and urban communities navigate severe winter smog, thermal inversions, and hazardous PM2.5 pollution through low-emission daily routines, high-CADR indoor air hacks, sustainable lifestyle alternatives, and transparent direct-impact explainability.**

---

## 🌟 Overview & Purpose

Severe winter smog episodes across major urban basins (such as Delhi-NCR, Lahore, Beijing, Salt Lake City, and Krakow) represent severe public health emergencies. During winter, **thermal boundary layer inversions** trap vehicular exhaust, biomass smoke, and dust close to the ground beneath a cold, stagnant air ceiling.

**AeroWise AI** bridges the gap between atmospheric science and daily family life. Rather than merely presenting raw sensor numbers, it functions as an intelligent, context-aware copilot that:
1. **Translates Atmospheric Physics into Safe Daily Action:** Guides families on exact hours to stay locked down versus the midday solar mixing window when it is safe to flush indoor CO2.
2. **Empowers High-Impact DIY Filtration:** Delivers the interactive **Corsi-Rosenthal Box Engineering Calculator**, proving how ~$45 of DIY materials out-cleans a $500 commercial HEPA purifier.
3. **Optimizes Low-Emission Household Routines:** Replaces high-exposure habits with smart low-emission routines across morning exercise, school commutes, kitchen prep, and nocturnal sleep.
4. **Calculates Direct Quantitative Health & Airshed Impact:** Explains the science of choices using Berkeley Earth cigarette equivalency, lung particulate deposition avoided, and the **Community Multiplier Effect**.
5. **Mobilizes Neighborhood Mutual Aid:** Connects communities via shared filter banks, school carpooling, and an instant smoke/illegal open fire reporting dispatch.

---

## 🚀 Key Modules & Capabilities

### 1. 🤖 AeroWise GenAI Copilot
* **Multimodal Atmospheric Copilot:** Powered by **Google Gemini 1.5/2.0 API** with seamless zero-cloud local domain fallback.
* **Household Grounding:** Answers are dynamically grounded in the family’s specific profile (e.g., presence of infants, asthmatic elders, pets, home size, cooking fuel, and commute mode).
* **Pediatric & Pulmonology Expertise:** Explains why children inhale 50% more air per pound of body weight and provides actionable guidance on masks, hybrid schooling, and emergency inhaler protocols.
* **Interactive Speech Synthesis:** Browser-native audio readout for hands-free listening while on the go.

### 2. ⏱️ Smog-Smart 24-Hour Routine Optimizer
* **Atmospheric Inversion Synchronization:** Aligns daily family schedules with ground temperature inversion curves.
* **Side-by-Side Habit Contrast:** Directly compares conventional risky practices with low-emission smart alternatives.
* **Interactive Adoption Tracking:** Checkboxes to mark habits as "Adopted," instantly updating personal daily PM2.5 avoidance and CO2 reduction scorecards.
* **Exportable Action Plan:** Printable summary for family bulletin boards or school schedules.

### 3. 🛠️ Indoor Air Quality (IAQ) Lab & Engineering Hacks
* **Interactive Corsi-Rosenthal Box CADR Simulator:**
  * Adjust room floor area, ceiling height, fan speed, filter rating (MERV 13), and cardboard shroud.
  * Real-time calculation of **Clean Air Delivery Rate (CADR in CFM)**, **Air Changes per Hour (ACH)**, and minutes required to drop room PM2.5 from 350 µg/m³ to &lt;15 µg/m³.
* **Room-by-Room IAQ Vulnerability Diagnostic:**
  * Interactive audit across Entrance, Kitchen, Master Bedroom, and Living areas.
  * Checks for negative-pressure chimney backdrafts, unsealed door sweeps, dry broom dust resuspension, and open flame heating.
  * Generates an instant **IAQ Safety Rating (%)** and customized physics remedies.
* **Curated DIY Hack Guides:** Step-by-step building guides, critical mistakes to avoid, and the fluid dynamics principles behind each hack.

### 4. 🌿 Sustainable Alternatives Catalog
* **High-Impact Lifestyle Swaps:**
  * **Clean Heating:** Oil-filled radiators and inverter heat pumps vs. toxic open wood/coal burning.
  * **Zero-NO2 Cooking:** Electric induction cooktops vs. fossil gas flames.
  * **Green Commuting:** Subways, EV shuttles, and 3-family carpool circles vs. single-occupancy ICE cars.
  * **Zero Waste & Mulch:** Dry leaf composting vs. roadside open waste burning.
* **Transparent Metrics:** Annual CO2 savings (kg), annual PM2.5 prevented (grams), estimated health/medication savings ($/yr), and payback timelines.

### 5. 📊 Direct Impact & Atmospheric Science Engine
* **Berkeley Earth Cigarette Inhalation Equivalent:** Translates outdoor and indoor PM2.5 into equivalent cigarettes inhaled/avoided daily ($1\text{ cig} \approx 22\ \mu\text{g/m}^3\text{ PM}_{2.5}\text{ over 24h}$).
* **Pulmonary Particulate Deposition:** Calculates micrograms of deep alveolar particulate cleared from the family's lungs based on 15 m³/day respiration.
* **Clinical Respiratory Risk Reduction:** Shows the 72% reduction in nocturnal asthma attacks achieved by maintaining a clean bedroom bubble (&lt;15 µg/m³).
* **The Community Multiplier Effect Slider:** Interactive scale (1 to 500 households) showing collective tons of CO2 averted, kg of soot removed from the neighborhood airshed, and pediatric emergency room visits prevented.

### 6. 👥 Community Smog Defense Hub
* **Neighborhood Clean Air Pods:** Mutual aid collectives sharing spare filters, coordinating school runs, and pooling bulk DIY air scrubber materials.
* **Smoke & Waste Burning Incident Dispatch:** Real-time logging of open leaf/trash fires with immediate notification dispatched to local air wardens and society patrols.
* **Society Clean Air Pledge Tracker:** Collective commitments to eliminate burning and reduce cold-start vehicle idling.

### 7. 🚨 Graded Response Action Plan (GRAP) Stage IV Tracker
* Explains statutory emergency restrictions: bans on diesel generators, construction halts, BS-III/IV vehicle restrictions, and mandatory work-from-home advisories.

---

## 🛠️ Technology Stack

* **Frontend Framework:** React 18, TypeScript, Vite
* **Styling & UI:** Tailwind CSS, Lucide Icons, Glassmorphic Design System
* **Atmospheric & Health Modeling:** Fluid dynamics equations (Stokes settling law, ACH calculation, CADR airflow models, Berkeley Earth PM2.5 equivalents)
* **GenAI Engine:** Google Gemini API (`gemini-1.5-flash` / `gemini-2.0`) with local expert fallback
* **Build System:** Vite with pure WebAssembly Rollup engine (`@rollup/wasm-node`) for cross-platform reliability
* **Production Server:** Built-in zero-dependency Node.js HTTP server (`serve.js`)

---

## 💻 Running the Application

### 1. Development Mode
```bash
npm run dev
```
Launches Vite development server on `http://localhost:3000`.

### 2. Production Build
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory.

### 3. Production Preview / Standalone Server
```bash
npm run serve
# or
node serve.js
```
Runs the standalone production server on port 3000.

---

## 📚 Scientific References & Standards

1. **World Health Organization (WHO):** *Global Air Quality Guidelines (2021)* — Annual PM2.5 threshold: $5\ \mu\text{g/m}^3$; 24-hour interim threshold: $15\ \mu\text{g/m}^3$.
2. **Berkeley Earth:** Muller, R. A., & Muller, E. A. (2015). *Air Pollution and Cigarette Equivalence*.
3. **Corsi-Rosenthal Foundation:** Jim Rosenthal and Dr. Richard Corsi (2020) — *Comparative CADR & Particle Clearance of Box-Fan Array Filters*.
4. **CDC & ASHRAE Standard 62.1 / 62.2:** *Ventilation and Acceptable Indoor Air Quality in Residential Buildings*.
5. **Commission for Air Quality Management (CAQM):** *Graded Response Action Plan (GRAP) for NCR & Adjoining Areas*.

---

*AeroWise AI — Breathing clean air is a human right, protected through collective community intelligence.*
