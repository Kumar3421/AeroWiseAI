import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DailyRoutineOptimizer } from '../components/DailyRoutineOptimizer';
import { MOCK_LOCATIONS, DEFAULT_FAMILY_PROFILE } from '../data/mockData';

describe('DailyRoutineOptimizer Component', () => {
  const mockToggleAdopt = vi.fn();

  it('renders routine time slots and habit contrasts', () => {
    render(
      <DailyRoutineOptimizer
        location={MOCK_LOCATIONS[0]}
        familyProfile={DEFAULT_FAMILY_PROFILE}
        adoptedRoutineIds={['slot-1']}
        onToggleAdoptRoutine={mockToggleAdopt}
      />
    );

    expect(screen.getByText(/Smog-Smart 24-Hour Routine Optimizer/i)).toBeInTheDocument();
    expect(screen.getByText(/Morning Ventilation & Exercise Trap/i)).toBeInTheDocument();
  });

  it('allows adopting/unadopting routine habits via toggle buttons', () => {
    render(
      <DailyRoutineOptimizer
        location={MOCK_LOCATIONS[0]}
        familyProfile={DEFAULT_FAMILY_PROFILE}
        adoptedRoutineIds={[]}
        onToggleAdoptRoutine={mockToggleAdopt}
      />
    );

    const adoptBtn = screen.getByText(/Adopt This Habit/i);
    expect(adoptBtn).toBeInTheDocument();
    fireEvent.click(adoptBtn);
    expect(mockToggleAdopt).toHaveBeenCalledWith('slot-1');
  });
});
