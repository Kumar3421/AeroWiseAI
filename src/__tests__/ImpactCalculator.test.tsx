import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImpactCalculator } from '../components/ImpactCalculator';
import { MOCK_LOCATIONS, DEFAULT_FAMILY_PROFILE } from '../data/mockData';

describe('ImpactCalculator Component', () => {
  it('renders health and particulate impact metrics', () => {
    render(
      <ImpactCalculator
        location={MOCK_LOCATIONS[0]}
        familyProfile={DEFAULT_FAMILY_PROFILE}
        adoptedRoutineCount={3}
        adoptedSwapCount={2}
      />
    );

    expect(screen.getByText(/Direct Atmospheric & Health Impact Engine/i)).toBeInTheDocument();
    expect(screen.getByText(/Daily Particulate Lung Deposition/i)).toBeInTheDocument();
  });

  it('updates community scale multiplier via slider input', () => {
    render(
      <ImpactCalculator
        location={MOCK_LOCATIONS[0]}
        familyProfile={DEFAULT_FAMILY_PROFILE}
        adoptedRoutineCount={3}
        adoptedSwapCount={2}
      />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: '100' } });
    expect(slider).toHaveValue('100');
  });
});
