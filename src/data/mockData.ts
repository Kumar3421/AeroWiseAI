import { LocationData, RoutineSlot, IAQHack, SustainableAlternative, CommunityPod, FamilyProfile } from '../types';

export const DEFAULT_FAMILY_PROFILE: FamilyProfile = {
  name: "The Sharma Family",
  membersCount: 4,
  hasInfants: true,
  hasElderly: true,
  hasAsthmaOrRespiratory: true,
  hasPets: true,
  homeType: 'apartment',
  homeSizeSqFt: 1400,
  cookingFuel: 'piped_gas',
  heatingType: 'electric_convector',
  commuteMode: 'petrol_diesel_car',
  dailyCommuteDistanceKm: 24,
  budgetTier: 'moderate',
};

export const MOCK_LOCATIONS: LocationData[] = [
  {
    id: 'delhi',
    name: 'Delhi - Anand Vihar',
    region: 'National Capital Region',
    country: 'India',
    latitude: 28.6139,
    longitude: 77.2090,
    aqi: 482,
    pm25: 395,
    pm10: 540,
    no2: 88,
    so2: 24,
    co: 3.8,
    temperature: 12,
    humidity: 78,
    windSpeed: 3.2,
    inversionRisk: 'Severe Inversion Trapped',
    grapStage: 4,
    primarySources: ['Vehicular exhaust (38%)', 'Stubble burning regional drift (31%)', 'Local waste burning & unpaved dust (21%)', 'Industrial emissions (10%)'],
    lastUpdated: '10 mins ago',
    hourlyForecast: [
      { hour: '06:00', aqi: 495, pm25: 420, inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
      { hour: '08:00', aqi: 512, pm25: 440, inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
      { hour: '10:00', aqi: 460, pm25: 380, inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
      { hour: '12:00', aqi: 360, pm25: 290, inversionTrap: false, safeToVentilate: false, commuteSafety: 'caution' },
      { hour: '14:00', aqi: 310, pm25: 230, inversionTrap: false, safeToVentilate: true, commuteSafety: 'caution' },
      { hour: '16:00', aqi: 340, pm25: 260, inversionTrap: false, safeToVentilate: false, commuteSafety: 'caution' },
      { hour: '18:00', aqi: 440, pm25: 360, inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
      { hour: '20:00', aqi: 475, pm25: 395, inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
      { hour: '22:00', aqi: 490, pm25: 410, inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
      { hour: '00:00', aqi: 505, pm25: 430, inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
    ]
  },
  {
    id: 'lahore',
    name: 'Lahore - Gulberg & Mall Road',
    region: 'Punjab',
    country: 'Pakistan',
    latitude: 31.5204,
    longitude: 74.3587,
    aqi: 520,
    pm25: 435,
    pm10: 580,
    no2: 94,
    so2: 32,
    co: 4.2,
    temperature: 11,
    humidity: 82,
    windSpeed: 2.1,
    inversionRisk: 'Severe Inversion Trapped',
    grapStage: 4,
    primarySources: ['Low-grade fuel & 2-stroke rickshaws (43%)', 'Brick kilns (24%)', 'Crop residue burning (22%)', 'Industrial furnaces (11%)'],
    lastUpdated: '15 mins ago',
    hourlyForecast: [
      { hour: '06:00', aqi: 540, pm25: 460, inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
      { hour: '09:00', aqi: 530, pm25: 450, inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
      { hour: '12:00', aqi: 420, pm25: 340, inversionTrap: false, safeToVentilate: false, commuteSafety: 'caution' },
      { hour: '15:00', aqi: 350, pm25: 270, inversionTrap: false, safeToVentilate: true, commuteSafety: 'caution' },
      { hour: '18:00', aqi: 480, pm25: 400, inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
      { hour: '21:00', aqi: 515, pm25: 430, inversionTrap: true, safeToVentilate: false, commuteSafety: 'dangerous' },
    ]
  },
  {
    id: 'beijing',
    name: 'Beijing - Chaoyang District',
    region: 'Hebei Plain Basin',
    country: 'China',
    latitude: 39.9042,
    longitude: 116.4074,
    aqi: 228,
    pm25: 178,
    pm10: 240,
    no2: 52,
    so2: 14,
    co: 1.9,
    temperature: 1,
    humidity: 45,
    windSpeed: 4.8,
    inversionRisk: 'High',
    grapStage: 2,
    primarySources: ['Regional coal heating (35%)', 'Heavy diesel freight (28%)', 'Secondary aerosol formation (25%)', 'Construction (12%)'],
    lastUpdated: '22 mins ago',
    hourlyForecast: [
      { hour: '06:00', aqi: 245, pm25: 195, inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
      { hour: '10:00', aqi: 230, pm25: 180, inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
      { hour: '14:00', aqi: 185, pm25: 135, inversionTrap: false, safeToVentilate: true, commuteSafety: 'safe' },
      { hour: '18:00', aqi: 220, pm25: 170, inversionTrap: false, safeToVentilate: false, commuteSafety: 'caution' },
      { hour: '22:00', aqi: 250, pm25: 200, inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
    ]
  },
  {
    id: 'saltlake',
    name: 'Salt Lake City - Wasatch Basin',
    region: 'Utah',
    country: 'USA',
    latitude: 40.7608,
    longitude: -111.8910,
    aqi: 164,
    pm25: 81,
    pm10: 95,
    no2: 38,
    so2: 6,
    co: 1.1,
    temperature: -2,
    humidity: 62,
    windSpeed: 3.0,
    inversionRisk: 'Severe Inversion Trapped',
    grapStage: 2,
    primarySources: ['Cold-pool mountain valley inversion trapping mobile sources (48%)', 'Home wood/gas heating (34%)', 'Industrial point sources (18%)'],
    lastUpdated: '35 mins ago',
    hourlyForecast: [
      { hour: '07:00', aqi: 175, pm25: 90, inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
      { hour: '11:00', aqi: 165, pm25: 82, inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
      { hour: '15:00', aqi: 140, pm25: 65, inversionTrap: false, safeToVentilate: true, commuteSafety: 'safe' },
      { hour: '19:00', aqi: 168, pm25: 84, inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
      { hour: '23:00', aqi: 180, pm25: 94, inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
    ]
  },
  {
    id: 'krakow',
    name: 'Krakow - Old Town Basin',
    region: 'Lesser Poland',
    country: 'Poland',
    latitude: 50.0647,
    longitude: 19.9450,
    aqi: 188,
    pm25: 112,
    pm10: 160,
    no2: 44,
    so2: 18,
    co: 1.6,
    temperature: 3,
    humidity: 80,
    windSpeed: 4.1,
    inversionRisk: 'High',
    grapStage: 2,
    primarySources: ['Suburban residential solid fuel boilers "kopciuchy" (52%)', 'Urban diesel traffic (32%)', 'River valley topography trap (16%)'],
    lastUpdated: '18 mins ago',
    hourlyForecast: [
      { hour: '06:00', aqi: 210, pm25: 130, inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
      { hour: '12:00', aqi: 170, pm25: 98, inversionTrap: false, safeToVentilate: true, commuteSafety: 'safe' },
      { hour: '18:00', aqi: 195, pm25: 120, inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
      { hour: '22:00', aqi: 220, pm25: 140, inversionTrap: true, safeToVentilate: false, commuteSafety: 'caution' },
    ]
  },
  {
    id: 'london',
    name: 'London - Inner Ring & A40 Corridor',
    region: 'Greater London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    aqi: 98,
    pm25: 36,
    pm10: 55,
    no2: 42,
    so2: 5,
    co: 0.8,
    temperature: 6,
    humidity: 85,
    windSpeed: 8.5,
    inversionRisk: 'Moderate',
    grapStage: 1,
    primarySources: ['Domestic wood burners / eco-design stoves (38%)', 'Diesel road vehicles & brake dust (36%)', 'Commercial gas boilers (26%)'],
    lastUpdated: '8 mins ago',
    hourlyForecast: [
      { hour: '07:00', aqi: 110, pm25: 42, inversionTrap: true, safeToVentilate: false, commuteSafety: 'safe' },
      { hour: '13:00', aqi: 82, pm25: 28, inversionTrap: false, safeToVentilate: true, commuteSafety: 'safe' },
      { hour: '19:00', aqi: 105, pm25: 40, inversionTrap: false, safeToVentilate: false, commuteSafety: 'safe' },
    ]
  }
];

export const MOCK_ROUTINE_SLOTS: RoutineSlot[] = [
  {
    id: 'slot-1',
    timeWindow: '06:00 - 08:30 AM',
    period: 'Early Morning',
    title: 'Morning Ventilation & Exercise Trap',
    category: 'exercise',
    conventionalPractice: 'Opening windows for "fresh morning breeze" and going for early outdoor jog or walking elderly parents/pets.',
    lowEmissionSmartAction: 'STRICT WINDOW LOCKDOWN. Shift cardiovascular exercise indoors using a sealed room with HEPA running. Keep pets indoors or wipe coat after quick bathroom break.',
    exposureReductionPct: 88,
    emissionSavedKgCO2: 0,
    lungParticulateSavedUg: 310,
    scientificWhy: 'Thermal Inversion Traps: Overnight ground radiative cooling creates cold air stagnation beneath a warm lid. Outdoor pollution concentrations peak between 6:00 AM and 9:00 AM. Inhaling 40-60 L/min during running delivers deep alveolar particulate penetration equivalent to smoking 4-6 cigarettes in 30 minutes.',
    riskRating: 'critical_hazard',
    actionableChecklist: [
      'Keep all balcony and external windows sealed shut.',
      'Turn air purifiers to Medium/High boost in bedrooms.',
      'Postpone outdoor walking until 1:30 PM sun-break.',
      'For asthmatic members: ensure morning preventative inhalers are taken with spacer.'
    ]
  },
  {
    id: 'slot-2',
    timeWindow: '08:30 - 10:00 AM',
    period: 'Morning Rush',
    title: 'School Run & Commute Optimization',
    category: 'commute',
    conventionalPractice: 'Driving single-occupancy petrol/diesel car with windows rolled down or taking open two-wheeler/auto-rickshaw without seal.',
    lowEmissionSmartAction: 'Metro/Subway transit with N95 mask OR Carpool with Car AC set strictly to "INTERNAL RE-CIRCULATION" with cabin PM2.5 filter.',
    exposureReductionPct: 76,
    emissionSavedKgCO2: 4.8,
    lungParticulateSavedUg: 240,
    scientificWhy: 'Vehicular NOx and ultrafine soot from diesel tailpipes are highest in stop-and-go traffic. Internal re-circulation drops in-cabin particulate levels by 85% compared to fresh air intake mode. Switching 4 solo car trips into 1 shared carpool or metro cuts 4.8 kg CO2 and 18g soot.',
    riskRating: 'critical_hazard',
    actionableChecklist: [
      'Fit kids and adults with certified N95 / FFP2 masks (cloth/surgical masks block <20% of PM2.5).',
      'Check car AC: Toggle Internal Air Recirculation (button with curved arrow inside car).',
      'If using transit, enter underground concourses where filtered ventilation buffers peak road soot.',
      'Coordinate with 2 neighborhood parents for shared school drops.'
    ]
  },
  {
    id: 'slot-3',
    timeWindow: '12:30 - 02:30 PM',
    period: 'Midday',
    title: 'Solar Mixing & Micro-Ventilation Window',
    category: 'ventilation',
    conventionalPractice: 'Keeping house perpetually hermetically sealed all day, causing CO2 to climb over 2,200 ppm leading to brain fog, fatigue, and indoor VOC buildup.',
    lowEmissionSmartAction: '15-20 MINUTE CONTROLLED AIR FLUSH: Open leeward (sheltered) windows between 1:00 PM and 2:00 PM while running indoor exhaust, then seal and blast HEPA on Turbo for 15 minutes.',
    exposureReductionPct: 62,
    emissionSavedKgCO2: 0,
    lungParticulateSavedUg: 95,
    scientificWhy: 'Solar radiation breaks the surface inversion boundary layer between 12:30 PM and 3:00 PM, causing vertical turbulent mixing and dropping ground AQI by 30-45%. This is the safest window to flush trapped CO2 and indoor cooking VOCs without drowning the home in morning smog.',
    riskRating: 'safe_window',
    actionableChecklist: [
      'Open windows on the side of the home facing away from main roadways.',
      'Cross-ventilate for exactly 15 minutes to replace stale CO2 with oxygenated air.',
      'Reseal all windows securely.',
      'Ramp air purifiers to Turbo for 15 minutes to scrub the fresh air intake down to <15 ug/m3.'
    ]
  },
  {
    id: 'slot-4',
    timeWindow: '06:00 - 08:30 PM',
    period: 'Evening Rush',
    title: 'Dinner Prep & Smoke Backdraft Management',
    category: 'cooking',
    conventionalPractice: 'High-heat oil frying or searing on gas stove with powerful exhaust fan running while all doors/windows are locked tight.',
    lowEmissionSmartAction: 'INDUCTION STEAM/BAKE COOKING + POSITIVE PRESSURE HACK: Crack a small utility window near the kitchen before turning on the range hood to prevent vacuum backdraft from drawing sewer or corridor smog indoors.',
    exposureReductionPct: 70,
    emissionSavedKgCO2: 1.2,
    lungParticulateSavedUg: 180,
    scientificWhy: 'Cooking on unvented gas produces ultra-fine PM2.5 and 50-100 ppb NO2. Furthermore, a high-CFM kitchen chimney creates negative pressure in a sealed apartment, sucking dirty corridor air and chimney soot through window cracks. Balancing air intake near the stove prevents home-wide contamination.',
    riskRating: 'moderate',
    actionableChecklist: [
      'Switch high-smoke tadka/frying to induction or covered steaming.',
      'Always cover pots with lids to reduce aerosolized oil droplets by 80%.',
      'Crack kitchen utility window by 1 inch while range hood runs.',
      'Close kitchen door to isolate bedrooms and living room.'
    ]
  },
  {
    id: 'slot-5',
    timeWindow: '09:00 PM - 06:00 AM',
    period: 'Night',
    title: 'The Nocturnal Sanctuary & Sleep Bubble',
    category: 'rest',
    conventionalPractice: 'Sleeping with bedroom doors open, running electric coil heaters or wood burner, and keeping air purifier in sleep/silent mode across the entire 1400 sq ft flat.',
    lowEmissionSmartAction: 'BEDROOM CLEAN AIR BUBBLE: Close bedroom door to isolate 200 sq ft, run low-wattage oil radiator (no open heating elements), and position DIY/HEPA purifier within 1.5 meters of bed breathing zone on Medium speed.',
    exposureReductionPct: 92,
    emissionSavedKgCO2: 2.5,
    lungParticulateSavedUg: 410,
    scientificWhy: 'We spend 8 hours breathing continuously in sleep. An open 1400 sq ft flat dilutes purifier CADR, resulting in PM2.5 lingering at 90 ug/m3. Isolating a single bedroom drops PM2.5 to under 8 ug/m3 (WHO clean threshold), allowing nocturnal mucosal clearance and reducing night asthma attacks by 84%.',
    riskRating: 'safe_window',
    actionableChecklist: [
      'Place door sweep or rolled damp towel at bedroom door bottom gap.',
      'Position purifier outlet aiming clean air gently toward headboard.',
      'Maintain 40-50% relative humidity using a damp towel or cool-mist humidifier (dry winter air paralyzes respiratory cilia).',
      'Ensure no unvented gas or charcoal burners are used for heating.'
    ]
  }
];

export const MOCK_IAQ_HACKS: IAQHack[] = [
  {
    id: 'hack-corsi-box',
    title: 'The Corsi-Rosenthal (CR) Super Box',
    subtitle: 'High-CADR DIY Air Scrubber that Outperforms $500 Commercial Purifiers',
    category: 'diy_filtration',
    difficulty: 'Moderate (30 min)',
    costTier: '$30 - $60 (High CADR DIY)',
    cadrDeliveredCfm: 550,
    efficiencyRating: 98,
    heroBadge: 'Highest CADR/Dollar Ratio in Science',
    materialsNeeded: [
      '1x 20-inch Box Fan (standard 3-speed household box fan)',
      '4x MERV 13 (or F8 / HEPA-equivalent) HVAC air filters (20" x 20" x 2" or 1")',
      '1x Cardboard box base (20" x 20" sheet)',
      '1x Roll of heavy-duty duct tape or gaffer tape',
      '1x Cardboard shroud cutout (14-15" diameter circle cut to maximize fan blade efficiency)'
    ],
    steps: [
      {
        stepNumber: 1,
        heading: 'Construct the 4-Sided Filter Cube',
        detail: 'Stand the 4 MERV 13 filters upright to form an open square cube. Ensure the airflow arrows printed on all 4 filter frames point INWARD toward the center of the cube.'
      },
      {
        stepNumber: 2,
        heading: 'Seal the Base Plate',
        detail: 'Tape the bottom cardboard square securely to the bottom edges of the 4 filters using duct tape. Make sure all joints and corners are completely airtight.'
      },
      {
        stepNumber: 3,
        heading: 'Mount Box Fan on Top',
        detail: 'Place the box fan facing UPWARD on top of the 4 filters so air is pulled through the 4 filters and exhausted upward into the room. Tape all 4 top seams airtight.'
      },
      {
        stepNumber: 4,
        heading: 'Add the Critical Cardboard Shroud',
        detail: 'Cut a circular ring out of scrap cardboard that covers the dead outer corners of the box fan face (leaving a 15-inch center circle). Tape it to the front grille. This stops air back-circulating over blade tips and boosts airflow CFM by 40%!'
      }
    ],
    criticalRules: [
      'Always ensure filter arrows point INWARD toward the fan center.',
      'Never use MERV 8 filters (they only capture hair/coarse dust). Only MERV 13 or higher captures PM2.5 and viral aerosol particles.',
      'Run fan on Speed 1 or 2 for whisper-quiet continuous filtration that matches commercial CADR.'
    ],
    scientificMechanism: 'By using 4 filters simultaneously, the surface area is quadrupled (~16 sq ft). This drastically reduces air resistance (static pressure drop), allowing a low-cost box fan to push 550 CFM of clean air through MERV 13 media without motor overheating.'
  },
  {
    id: 'hack-negative-pressure',
    title: 'The Negative Pressure & Shaft Infiltration Trap',
    subtitle: 'Stop Kitchen & Bathroom Exhausts from Sucking Smog Inside Your Home',
    category: 'exhaust_management',
    difficulty: 'Easy (10 min)',
    costTier: 'Free / Zero-Cost',
    cadrDeliveredCfm: 0,
    efficiencyRating: 85,
    heroBadge: 'Zero-Cost Physics Fix',
    materialsNeeded: [
      'Kitchen exhaust fan / bathroom ventilation fan',
      'One small window or cracked door in utility area',
      'Draft stopper or weatherstrip strip'
    ],
    steps: [
      {
        stepNumber: 1,
        heading: 'Understand the Vacuum Effect',
        detail: 'When you turn on a 300 CFM kitchen chimney in an apartment with locked windows, your home becomes a vacuum (negative pressure). Smog is forcefully pulled through plumbing shafts, elevator shafts, and window hairline cracks.'
      },
      {
        stepNumber: 2,
        heading: 'Implement Makeup Air Balancing',
        detail: 'Whenever operating the kitchen exhaust fan, crack a small window in the adjacent balcony or utility area by 1-2 inches right next to the stove.'
      },
      {
        stepNumber: 3,
        heading: 'Isolate the Rest of the Living Quarters',
        detail: 'Keep the kitchen door closed to the main living area. The exhaust fan will evacuate frying oil smoke directly outside using the local make-up air without depressurizing your bedrooms.'
      }
    ],
    criticalRules: [
      'Never run continuous bathroom exhaust fans with windows sealed in winter unless a dedicated air intake is open.',
      'Check shared plumbing ducts for back-drafting sewer gas and winter smog particles.'
    ],
    scientificMechanism: 'Pascal air pressure differential dynamics: Air exhausted from an enclosed space must be replenished. Intentional make-up air prevents unfiltered atmospheric smog from penetrating residential perimeter envelope gaps.'
  },
  {
    id: 'hack-wet-mop-cleaning',
    title: 'Electrostatic Wet-Mopping vs Resuspension Hazard',
    subtitle: 'Why Traditional Broom Sweeping Multiplies Indoor PM2.5 by 300%',
    category: 'cleaning_protocol',
    difficulty: 'Easy (10 min)',
    costTier: '$10 - $25 (Budget)',
    cadrDeliveredCfm: 0,
    efficiencyRating: 92,
    heroBadge: 'Essential Daily Protocol',
    materialsNeeded: [
      'Microfiber flat mop (or cotton mop with damp cloth)',
      'Water with 1 capful mild eco-detergent or vinegar',
      'Damp microfiber dusting cloths (never dry feather dusters)'
    ],
    steps: [
      {
        stepNumber: 1,
        heading: 'Banish the Dry Broom & Non-HEPA Vacuum',
        detail: 'Dry sweeping mechanically launches settled sub-micron PM2.5 and PM10 particles into the air, keeping them airborne for 4 to 12 hours.'
      },
      {
        stepNumber: 2,
        heading: 'Two-Bucket Damp Mopping Method',
        detail: 'Use a damp microfiber mop in an "S-pattern" across hard floors. The capillary action of microfibers captures micro-particulate without aerosolizing it.'
      },
      {
        stepNumber: 3,
        heading: 'High-Touch Surface Damp Wipes',
        detail: 'Wipe windowsill tracks, doorframes, TV screens, and radiator surfaces with a damp cloth every 48 hours to remove black carbon soot.'
      }
    ],
    criticalRules: [
      'If using a vacuum cleaner, it MUST have a certified HEPA exhaust filter with sealed gasket. Regular vacuum bags spew ultrafine dust straight into room air.',
      'Mop floors between 11 AM and 1 PM to allow natural drying without trapped dampness.'
    ],
    scientificMechanism: 'Stokes Law of Particle Settling: Particles under 2.5 microns settle very slowly and are easily resuspended by airflow velocity >0.2 m/s. Liquid surface tension traps particles irreversibly.'
  },
  {
    id: 'hack-weatherstripping',
    title: 'Airtight Window Perimeter & Door Jamb Sealing',
    subtitle: 'Eliminate the 40% Leakage Rate in Modern Residential Windows',
    category: 'sealing_weatherproofing',
    difficulty: 'Easy (10 min)',
    costTier: '$10 - $25 (Budget)',
    cadrDeliveredCfm: 0,
    efficiencyRating: 94,
    heroBadge: 'High Energy & Air ROI',
    materialsNeeded: [
      'Self-adhesive D-shape / V-shape silicone weatherstrip tape (10-15 meters)',
      'Under-door sweep brush or twin draft stopper foam roll',
      'Rubbing alcohol and cloth for surface prep'
    ],
    steps: [
      {
        stepNumber: 1,
        heading: 'Clean Window Tracks with Alcohol',
        detail: 'Wipe all window frame rebate channels with isopropyl alcohol to remove soot and grease so adhesive sticks permanently.'
      },
      {
        stepNumber: 2,
        heading: 'Apply Silicone Weatherstripping',
        detail: 'Press the self-adhesive silicone seal firmly along all 4 contact perimeters of sliding and casement windows, focusing on where the sash locks.'
      },
      {
        stepNumber: 3,
        heading: 'Slide-On Door Bottom Draft Blocker',
        detail: 'Slip a twin-roll foam draft blocker under the main entrance door and balcony door to close the 0.5-inch gap facing outdoor corridors.'
      }
    ],
    criticalRules: [
      'Test seal using the "Dollar Bill Test": close window on a paper dollar. If it slides out with zero resistance, the gap is leaking smog.',
      'Ensure silicone strips do not jam window locking mechanisms.'
    ],
    scientificMechanism: 'Building Air Infiltration (ACH - Air Changes per Hour): Unsealed urban homes average 1.5 to 3.0 ACH, replacing entire indoor air volume with smog every 30 minutes. Weatherstripping lowers ACH to 0.4, allowing purifiers to easily maintain clean indoor air.'
  }
];

export const MOCK_SUSTAINABLE_ALTERNATIVES: SustainableAlternative[] = [
  {
    id: 'alt-heating',
    category: 'Heating & Warmth',
    title: 'Oil-Filled Radiator / Heat Pump vs Open Firewood & Angithi',
    conventionalMethod: 'Burning scrap wood, coal angithi, or unvented biomass/kerosene space heaters for winter warmth.',
    sustainableChoice: 'Closed-loop Oil-Filled Radiator (OFR) or Inverter Heat Pump / Reverse Cycle AC.',
    directLocalImpact: 'Zero indoor combustion emissions. Eliminates 99.8% of indoor carbon monoxide (CO), black carbon, and polycyclic aromatic hydrocarbons (PAHs).',
    annualCO2ReductionKg: 680,
    annualPM25ReductionGrams: 3400,
    healthSavingsEstUSD: 450,
    paybackTimeline: '1 Winter Season (Health & Medication Savings)',
    difficultyToAdopt: 'Easy',
    tags: ['Heating', 'Infants & Elderly', 'Zero Smoke', 'Fire Safe']
  },
  {
    id: 'alt-cooking',
    category: 'Cooking & Kitchen',
    title: 'Induction Cooktop & Covered Simmer vs Fossil Gas Flames',
    conventionalMethod: 'Open high-flame LPG/PNG piped gas stove without proper vent hood or solid fuel cookers.',
    sustainableChoice: 'Smart Electric Induction Cooktop (90% thermal efficiency vs 40% for gas).',
    directLocalImpact: 'Eliminates 100% of nitrogen dioxide (NO2) spikes (which frequently exceed 150 ppb during cooking) and indoor formaldehyde.',
    annualCO2ReductionKg: 240,
    annualPM25ReductionGrams: 850,
    healthSavingsEstUSD: 280,
    paybackTimeline: '8 Months in Gas Savings',
    difficultyToAdopt: 'Easy',
    tags: ['Kitchen IAQ', 'NO2 Elimination', 'Asthma Safe', 'Energy Efficient']
  },
  {
    id: 'alt-mobility',
    category: 'Urban Commute',
    title: 'Metro / E-Bus / Shared Carpool Pod vs Single Petrol/Diesel Car',
    conventionalMethod: 'Solo driving ICE car in 1.5 hr daily bumper-to-bumper traffic jams.',
    sustainableChoice: 'Electric Metro Rail, EV Shuttle Pod, or 3-Family Carpool Circle.',
    directLocalImpact: 'Reduces personal tailpipe emissions along school and residential corridors. Reduces brake-wear heavy metal dust dispersion.',
    annualCO2ReductionKg: 1420,
    annualPM25ReductionGrams: 2100,
    healthSavingsEstUSD: 600,
    paybackTimeline: 'Instant Fuel Cost Savings ($80 - $150/mo)',
    difficultyToAdopt: 'Instant',
    tags: ['Transit', 'Tailpipe Slashed', 'Community Pod', 'Cost Saving']
  },
  {
    id: 'alt-waste',
    category: 'Waste & Yard',
    title: 'Mulching & Bokashi Composting vs Leaf/Trash Open Burning',
    conventionalMethod: 'Sweeping dried autumn leaves and packaging waste into neighborhood piles and burning them at sunrise.',
    sustainableChoice: 'Dry leaf composting, community shredder mulch pits, and strict plastic segregation.',
    directLocalImpact: 'Prevents severe ground-level toxic dioxins, furans, and ultra-fine black soot clouds that trigger acute respiratory distress in neighbors.',
    annualCO2ReductionKg: 850,
    annualPM25ReductionGrams: 5200,
    healthSavingsEstUSD: 900,
    paybackTimeline: 'Free / Generates Rich Garden Fertilizer',
    difficultyToAdopt: 'Moderate Investment',
    tags: ['Anti-Burning', 'Society Level', 'High Particulate Cut', 'Community']
  }
];

export const MOCK_COMMUNITY_PODS: CommunityPod[] = [
  {
    id: 'pod-vasant-vihar',
    name: 'Vasant Vihar Clean Air Collective',
    location: 'South Delhi, India',
    members: 142,
    activePurifierShares: 18,
    carpoolRidersCount: 64,
    trashBurningReportsResolved: 29,
    currentCleanAirPledge: 'Zero Open Fires & 70% Staggered School Carpooling by Dec 1st',
    recentActivity: [
      {
        user: 'Pooja M. (Block C)',
        action: 'Shared 2 spare MERV-13 filters with elderly neighbor on ground floor',
        timestamp: '25m ago',
        impact: 'Safe sleep zone created for 78-yr-old COPD patient'
      },
      {
        user: 'Vikram S. & 3 parents',
        action: 'Consolidated DPS RK Puram school drop into single 4-child EV carpool',
        timestamp: '2h ago',
        impact: '3 ICE cars removed from morning smog gridlock'
      },
      {
        user: 'Rajesh K. (RWA Warden)',
        action: 'Reported & doused roadside horticultural waste fire at Park Lane',
        timestamp: '4h ago',
        impact: 'Prevented ~8.5 kg PM2.5 release directly upwind'
      }
    ]
  },
  {
    id: 'pod-gulberg',
    name: 'Gulberg Clean Sky Watch',
    location: 'Lahore, Pakistan',
    members: 98,
    activePurifierShares: 12,
    carpoolRidersCount: 38,
    trashBurningReportsResolved: 17,
    currentCleanAirPledge: 'Community Corsi-Rosenthal Box Build Workshop for Local Primary School',
    recentActivity: [
      {
        user: 'Dr. Tariq H.',
        action: 'Supplied 15 DIY Corsi-Rosenthal kits to Model Town Community Center',
        timestamp: '1h ago',
        impact: 'Delivered 8,250 CFM total clean air capacity'
      },
      {
        user: 'Amina B.',
        action: 'Transitioned family domestic help to electric induction hotplate',
        timestamp: '5h ago',
        impact: 'Zero indoor kerosene smoke exposure'
      }
    ]
  },
  {
    id: 'pod-wasatch',
    name: 'Wasatch Inversion Defense Coalition',
    location: 'Salt Lake City, Utah',
    members: 215,
    activePurifierShares: 26,
    carpoolRidersCount: 110,
    trashBurningReportsResolved: 8,
    currentCleanAirPledge: 'Voluntary "No Burn" Wood Stove Days during Red Air Alerts',
    recentActivity: [
      {
        user: 'Marcus L.',
        action: 'Organized ski-transit carpool pool from Sandy to Cottonwood Canyons',
        timestamp: '3h ago',
        impact: 'Saved 42 vehicle cold-starts'
      }
    ]
  }
];

export const GRAP_EMERGENCY_PROTOCOLS = {
  stage1: {
    title: 'Stage I: Moderate to Poor (AQI 201 - 300)',
    actionItems: [
      'Stop open burning of municipal solid waste.',
      'Regular mechanized road sweeping and water sprinkling.',
      'Enforce PUC (Pollution Under Control) norms for older vehicles.',
      'Family Action: Check weatherstripping and inspect HEPA filters.'
    ]
  },
  stage2: {
    title: 'Stage II: Very Poor (AQI 301 - 400)',
    actionItems: [
      'Ban on diesel generator sets for non-emergency operations.',
      'Enhance parking fees to discourage private vehicle usage.',
      'Augment CNG/Electric bus and metro frequencies.',
      'Family Action: Move high-intensity workouts strictly indoors; seal bedroom bubble.'
    ]
  },
  stage3: {
    title: 'Stage III: Severe (AQI 401 - 450)',
    actionItems: [
      'Ban on construction and demolition activities across urban zones.',
      'Restrictions on BS-III petrol and BS-IV diesel light commercial vehicles.',
      'Primary schools shift to hybrid or indoor-only recess modes.',
      'Family Action: Full N95 mask compliance outdoors; run air purifiers continuously on auto/medium.'
    ]
  },
  stage4: {
    title: 'Stage IV: Severe Plus / Emergency (AQI > 450)',
    actionItems: [
      'Ban on entry of truck traffic into city borders (except essential commodities/LNG/EV).',
      'Closure of middle/secondary schools; mandate 50% work-from-home for public/private offices.',
      'Odd-Even or emergency vehicle rationing invoked.',
      'Family Action: Emergency lockdown protocol: vulnerable family members remain inside sealed quarters; run CR boxes.'
    ]
  }
};
