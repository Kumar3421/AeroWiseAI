import { LocationData, FamilyProfile } from '../types';

export interface GeminiConfig {
  apiKey?: string;
  model?: string;
}

const STORAGE_KEY = 'aerowise_gemini_api_key';

export function getStoredApiKey(): string {
  return localStorage.getItem(STORAGE_KEY) || '';
}

export function setStoredApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY, key.trim());
}

/**
 * Expert domain response generator when offline or no API key is set.
 * Provides rich, context-aware, actionable advice referencing location, AQI, and family profile.
 */
export function generateExpertSmogResponse(
  prompt: string,
  location: LocationData,
  profile: FamilyProfile
): string {
  const q = prompt.toLowerCase();
  const aqi = location.aqi;
  const pm25 = location.pm25;
  const hasVulnerable = profile.hasInfants || profile.hasElderly || profile.hasAsthmaOrRespiratory;

  if (q.includes('school') || q.includes('child') || q.includes('kid') || q.includes('cough')) {
    return `### 🏫 Pediatric Smog Advisory: School & Children Health Protocol
**Current Location:** ${location.name} (AQI: ${aqi} — ${location.inversionRisk})

#### 1. Clinical Risk Assessment for Children:
Children inhale **50% more air per pound of body weight** than adults and have narrower airways. At current outdoor PM2.5 levels of **${pm25} µg/m³**, 1 hour of outdoor morning exposure is equivalent to inhaling **~${(pm25 * 0.045).toFixed(1)} cigarettes** directly into developing alveoli.

#### 2. Immediate Action Directives:
* **Attendance Decision:** Under **GRAP Stage ${location.grapStage}**, physical attendance for pre-primary and primary grades should be paused or shifted hybrid. If school is open, confirm whether classrooms operate sealed filtration. If unsealed, keep sensitive children home.
* **School Commute Protocol:** If commuting, **do NOT use two-wheelers or open-window autorickshaws**. Use closed transit or carpool with car AC set to **Internal Recirculation**.
* **Mask Compliance:** Fit the child with a certified **well-fitting pediatric N95 / KF94 mask**. Cloth or surgical masks leak >70% around cheekbones.
* **Preventative Care:** For asthmatic children (${profile.hasAsthmaOrRespiratory ? 'Active in your household profile' : 'General recommendation'}), administer doctor-prescribed preventer inhalers *before* leaving the house using an aerochamber spacer.

*Calculated Impact:* Keeping the child in a sealed, filtered room (${profile.homeSizeSqFt} sq ft zone) avoids **${Math.round(pm25 * 10 * 0.85)} µg of deep alveolar particulate** today.`;
  }

  if (q.includes('corsi') || q.includes('diy') || q.includes('cr box') || q.includes('purifier') || q.includes('filter')) {
    return `### 🛠️ DIY Corsi-Rosenthal (CR) Box Engineering Guide
**Delivering 550+ CFM Clean Air for under $45 (vs $400 commercial units)**

#### Scientific Foundation:
Commercial HEPA units restrict airflow through a single small thick filter, demanding high motor pressure. A **4-filter Corsi-Rosenthal cube** quadruples filter surface area (~16 sq ft), dropping static pressure to near zero. A standard 20-inch box fan can thus clear air at **over 550 Clean Air Delivery Rate (CADR)**!

#### 4-Step Build Instructions:
1. **The Cube Frame:** Stand 4x **MERV 13** (20" x 20" x 2") filters into a square. **CRITICAL:** Ensure the airflow direction arrows printed on filter frames point **INWARD** toward the center.
2. **Base Seal:** Cut a 20" x 20" square of cardboard and duct tape it securely to the bottom edges. Make sure corner seams have zero air gaps.
3. **Fan Mounting:** Place your 20" box fan on top, blowing **UPWARD** towards the ceiling. Tape all 4 top perimeter joints.
4. **The Shroud Hack (Do Not Skip!):** Cut a cardboard donut/ring that covers the outer 2-3 inches of the box fan front grille, leaving a 14-inch circular opening in the center. This blocks aerodynamic back-circulation at the fan blade tips and boosts airflow output by **35-40%**!

#### Performance in Your Home (${profile.homeSizeSqFt} sq ft):
* In a 250 sq ft bedroom: Delivers **11 Air Changes per Hour (ACH)**.
* Time to drop bedroom PM2.5 from **${pm25} µg/m³ to <12 µg/m³**: **16 minutes**.`;
  }

  if (q.includes('kitchen') || q.includes('exhaust') || q.includes('cooking') || q.includes('negative pressure') || q.includes('smell')) {
    return `### 🍳 Kitchen Exhaust & Negative Pressure Infiltration Hack
**Why running your chimney or exhaust fan might be sucking smog inside!**

#### The Physics Explained:
When your kitchen range hood exhausts **300 to 500 CFM** of air from an apartment with locked windows, it creates a powerful **negative pressure vacuum**. 
To replace that expelled air, high-velocity outside smog is pulled inward through:
* Entry door jambs facing corridor shafts
* Bathroom drain and plumbing risers
* Window tracks and hairline gaps

#### The Solution: The "Makeup Air" Protocol
1. **Crack a Dedicated Intake:** Before flipping on the kitchen exhaust, crack open a small window in the utility balcony right adjacent to the stove by **1 to 2 inches**.
2. **Isolate Living Areas:** Close the kitchen door leading to the dining/living room.
3. **Pressure Neutrality:** The exhaust fan will now suck clean makeup air from that cracked opening and blow oil smoke outside, *without depressurizing the rest of the flat*.
4. **Induction Shift:** Transitioning your ${profile.cookingFuel} cooking to electric induction eliminates **100% of nitrogen dioxide (NO2)** indoor spikes, which otherwise reach toxic levels of 120-200 ppb during high-flame cooking.`;
  }

  if (q.includes('routine') || q.includes('schedule') || q.includes('plan') || q.includes('morning') || q.includes('walk')) {
    return `### ⏱️ Personalized Winter Smog Daily Protocol for ${profile.name}
**Tailored for: ${location.name} (AQI: ${aqi} | Temperature Inversion Risk: ${location.inversionRisk})**
**Household Specs:** ${profile.membersCount} members | ${hasVulnerable ? 'Includes vulnerable members (infants/elderly/asthma)' : 'Standard adult household'}

#### 🌅 06:00 - 09:00 AM: Ground Inversion Lockdown
* **Window Status:** Strictly CLOSED. Overnight radiative cooling has trapped diesel particulate and biomass smoke below 150m altitude.
* **Exercise:** Cancel all outdoor walks/jogs. Indoor yoga, stationary cycling, or stretches only in a room with HEPA running.
* **Asthma Care:** Morning saline nasal rinse + prescribed preventer inhaler before cold exposure.

#### ☀️ 12:30 - 02:30 PM: The Solar Mixing Window (Ventilation Safe)
* **Sunlight Effect:** Solar ground warming destabilizes the boundary layer, dispersing peak ground concentrations (AQI typically drops by ~35%).
* **Protocol:** Open cross-ventilation windows for **15 minutes** to evacuate accumulated carbon dioxide (CO2). Then seal and run air purifiers on High for 15 minutes.

#### 🌆 05:30 - 08:30 PM: Evening Traffic & Cooking Shield
* **Transit:** Avoid open two-wheelers. If in car, set HVAC strictly to **Internal Recirculation**.
* **Kitchen:** Cover frying pans with lids; follow the balanced makeup-air exhaust hack.

#### 🌙 09:00 PM - 06:00 AM: The Nocturnal Sleep Bubble
* **Zone Strategy:** Do not try to clean the entire ${profile.homeSizeSqFt} sq ft home at night. Close bedroom doors to create an isolated 200 sq ft bubble.
* **Purifier:** Place purifier within 1.5m of the bed on Medium speed. 
* **Humidity:** Keep bedroom humidity at 45% (dry cold air paralyzes cilia in your bronchial tubes).`;
  }

  if (q.includes('grap') || q.includes('stage') || q.includes('emergency') || q.includes('restrictions')) {
    return `### 🚨 Graded Response Action Plan (GRAP) Stage ${location.grapStage} Protocol
**Location Status:** ${location.name} is currently under **GRAP Stage ${location.grapStage} (${location.aqi > 450 ? 'Severe Plus / Emergency' : 'Severe'})**.

#### Mandatory Government Restrictions in Effect:
* **Vehicular Controls:** Ban on BS-III petrol and BS-IV diesel commercial 4-wheelers. Entry of non-essential heavy trucks prohibited into city zones.
* **Construction:** Complete halt on all demolition, earthwork, unpaved road construction, and stone crushing.
* **Industrial:** Diesel generator sets strictly prohibited for commercial and residential power backup (except essential hospitals/metro).
* **Education & Work:** Hybrid / remote schooling for elementary grades; advisory for 50% private office work-from-home (WFH).

#### Community Actions Your Family Should Take:
1. **Work From Home:** If feasible, exercise WFH to keep 1 ICE vehicle off arterial corridors.
2. **Community Watch:** Report any neighbor or security guard burning dry leaves or construction waste via local municipal apps or the Community Pod Hub.
3. **Delivery Consolidation:** Consolidate e-commerce and grocery deliveries into a single weekly drop to minimize delivery bike mileage in your neighborhood.`;
  }

  // Default intelligent response
  return `### 🌬️ AeroWise Environmental Health Advisory
**Location:** ${location.name} | **AQI:** ${aqi} (${location.inversionRisk})  
**Household Profile:** ${profile.name} (${profile.membersCount} people | ${profile.homeType})

#### 1. Particulate Exposure Science:
Today's outdoor PM2.5 level is **${pm25} µg/m³**, which is **${(pm25 / 15).toFixed(1)}x above the WHO 24-hour safety threshold**. Inhaling this unfiltered air for 24 hours delivers particulate mass equivalent to smoking **${(pm25 / 22).toFixed(1)} cigarettes**.

#### 2. Three Immediate Low-Emission Actions:
1. **Fortify the Sleeping Zone:** Seal bedroom doors with bottom draft stoppers and run your purifier on Medium speed. This drops overnight particulate exposure by **>90%**, allowing bronchial self-cleaning.
2. **Smart Travel Choice:** Avoid outdoor routes between 6-9 AM and 6-8 PM when ground thermal inversions trap toxic tailpipe NOx and diesel soot.
3. **Avoid Secondary Indoor Pollutants:** Do not light scented candles, incense sticks (agarbatti), or mosquito coils indoors today. A single incense stick emits PM2.5 equivalent to 2-3 cigarettes in an enclosed space!

Would you like me to generate a tailored **room-by-room audit**, explain the **Corsi-Rosenthal DIY build**, or optimize your family's **24-hour daily routine**?`;
}

/**
 * Call live Gemini API if user provided an API key, otherwise fallback smoothly to high-fidelity expert generator.
 */
export async function askGeminiSmogAssistant(
  userPrompt: string,
  location: LocationData,
  profile: FamilyProfile,
  conversationHistory: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
): Promise<string> {
  const apiKey = getStoredApiKey();

  if (!apiKey) {
    // Return high-fidelity local expert response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateExpertSmogResponse(userPrompt, location, profile));
      }, 700);
    });
  }

  // Real Gemini API Call using v1beta generateContent
  const systemInstruction = `You are AeroWise AI, the world's foremost atmospheric health scientist, environmental engineer, and pediatric pulmonologist advising families navigating severe winter smog, thermal inversions, and high urban air pollution (PM2.5, PM10, NO2).
User Location Context:
- City: ${location.name}, ${location.country}
- Current AQI: ${location.aqi}
- PM2.5: ${location.pm25} µg/m³
- Thermal Inversion Status: ${location.inversionRisk}
- GRAP Stage: Stage ${location.grapStage}
- Primary Pollution Sources: ${location.primarySources.join(', ')}

Family Household Profile:
- Family Name: ${profile.name}
- Family Size: ${profile.membersCount} members
- Vulnerabilities: Infants (${profile.hasInfants}), Elderly (${profile.hasElderly}), Asthma/Respiratory (${profile.hasAsthmaOrRespiratory}), Pets (${profile.hasPets})
- Home: ${profile.homeType}, ${profile.homeSizeSqFt} sq ft
- Cooking: ${profile.cookingFuel} | Heating: ${profile.heatingType}
- Commute: ${profile.commuteMode} (${profile.dailyCommuteDistanceKm} km daily)

Guidelines:
1. Provide scientifically rigorous, practical, low-cost and high-impact guidance.
2. Explain the direct "why" (e.g. thermal inversion mechanics, alveolar lung deposition, negative-pressure vacuum effects in apartments, Berkeley Earth cigarette equivalencies).
3. Suggest low-emission daily routines and sustainable alternatives that protect family health while reducing community emissions.
4. Format with clean, readable Markdown (headings, bullet points, bold key actions).`;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const contents = [
      ...conversationHistory,
      {
        role: 'user',
        parts: [
          {
            text: `${systemInstruction}\n\nUser Question:\n${userPrompt}`
          }
        ]
      }
    ];

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1200,
        }
      })
    });

    if (!response.ok) {
      console.warn('Gemini API call returned non-200, falling back to expert simulated engine:', response.statusText);
      return generateExpertSmogResponse(userPrompt, location, profile);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidateText) {
      return candidateText;
    }
    return generateExpertSmogResponse(userPrompt, location, profile);
  } catch (error) {
    console.warn('Gemini API request failed, using expert local engine:', error);
    return generateExpertSmogResponse(userPrompt, location, profile);
  }
}
