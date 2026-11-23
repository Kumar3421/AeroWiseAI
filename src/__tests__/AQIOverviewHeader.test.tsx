import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AQIOverviewHeader } from '../components/AQIOverviewHeader';
import { MOCK_LOCATIONS, DEFAULT_FAMILY_PROFILE } from '../data/mockData';

describe('AQIOverviewHeader Component', () => {
  it('renders AQI value, PM2.5, and temperature', () => {
    const loc = MOCK_LOCATIONS[0];
    render(
      <AQIOverviewHeader
        location={loc}
        familyProfile={DEFAULT_FAMILY_PROFILE}
      />
    );

    expect(screen.getByText(String(loc.aqi))).toBeInTheDocument();
    expect(screen.getByText(/Air Quality Index/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${loc.pm25} µg/m³`, 'i'))).toBeInTheDocument();
  });

  it('calculates and displays cigarette equivalent metric', () => {
    render(
      <AQIOverviewHeader
        location={MOCK_LOCATIONS[0]}
        familyProfile={DEFAULT_FAMILY_PROFILE}
      />
    );

    expect(screen.getByText(/Inhalation Equivalent/i)).toBeInTheDocument();
    expect(screen.getByText(/cigarettes \/ day/i)).toBeInTheDocument();
  });

  it('displays the thermal inversion risk status', () => {
    render(
      <AQIOverviewHeader
        location={MOCK_LOCATIONS[0]}
        familyProfile={DEFAULT_FAMILY_PROFILE}
      />
    );

    expect(screen.getByText(/Thermal Inversion Trap/i)).toBeInTheDocument();
    expect(screen.getByText(MOCK_LOCATIONS[0].inversionRisk)).toBeInTheDocument();
  });
});
