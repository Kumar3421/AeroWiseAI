import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import { MOCK_LOCATIONS, DEFAULT_FAMILY_PROFILE } from '../data/mockData';

describe('Navbar Component', () => {
  const mockSelectTab = vi.fn();
  const mockSelectLocation = vi.fn();
  const mockOpenProfile = vi.fn();
  const mockOpenSettings = vi.fn();
  const mockOpenGrap = vi.fn();
  const mockOpenCitySearch = vi.fn();
  const mockOpenExport = vi.fn();
  const mockSyncLive = vi.fn();

  it('renders the brand title and current city AQI', () => {
    render(
      <Navbar
        currentLocation={MOCK_LOCATIONS[0]}
        allLocations={MOCK_LOCATIONS}
        onSelectLocation={mockSelectLocation}
        familyProfile={DEFAULT_FAMILY_PROFILE}
        activeTab="copilot"
        onSelectTab={mockSelectTab}
        onOpenProfileModal={mockOpenProfile}
        onOpenSettingsModal={mockOpenSettings}
        onOpenGrapModal={mockOpenGrap}
        onOpenCitySearch={mockOpenCitySearch}
        onOpenExportReport={mockOpenExport}
        onSyncLive={mockSyncLive}
        isLiveLoading={false}
        isLiveMode={false}
      />
    );

    expect(screen.getByText('AeroWise AI')).toBeInTheDocument();
    expect(screen.getByText(String(MOCK_LOCATIONS[0].aqi))).toBeInTheDocument();
  });

  it('renders all 6 navigation tabs with accessible tab roles', () => {
    render(
      <Navbar
        currentLocation={MOCK_LOCATIONS[0]}
        allLocations={MOCK_LOCATIONS}
        onSelectLocation={mockSelectLocation}
        familyProfile={DEFAULT_FAMILY_PROFILE}
        activeTab="copilot"
        onSelectTab={mockSelectTab}
        onOpenProfileModal={mockOpenProfile}
        onOpenSettingsModal={mockOpenSettings}
        onOpenGrapModal={mockOpenGrap}
        onOpenCitySearch={mockOpenCitySearch}
        onOpenExportReport={mockOpenExport}
      />
    );

    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(6);
    expect(screen.getByText('AI Smog Copilot')).toBeInTheDocument();
    expect(screen.getByText('Smart Routine')).toBeInTheDocument();
    expect(screen.getByText('IAQ Hacks & DIY')).toBeInTheDocument();
  });

  it('fires onSelectTab when a navigation tab is clicked', () => {
    render(
      <Navbar
        currentLocation={MOCK_LOCATIONS[0]}
        allLocations={MOCK_LOCATIONS}
        onSelectLocation={mockSelectLocation}
        familyProfile={DEFAULT_FAMILY_PROFILE}
        activeTab="copilot"
        onSelectTab={mockSelectTab}
        onOpenProfileModal={mockOpenProfile}
        onOpenSettingsModal={mockOpenSettings}
        onOpenGrapModal={mockOpenGrap}
        onOpenCitySearch={mockOpenCitySearch}
        onOpenExportReport={mockOpenExport}
      />
    );

    const routineTab = screen.getByText('Smart Routine');
    fireEvent.click(routineTab);
    expect(mockSelectTab).toHaveBeenCalledWith('routine');
  });

  it('triggers live sync when sync button is clicked', () => {
    render(
      <Navbar
        currentLocation={MOCK_LOCATIONS[0]}
        allLocations={MOCK_LOCATIONS}
        onSelectLocation={mockSelectLocation}
        familyProfile={DEFAULT_FAMILY_PROFILE}
        activeTab="copilot"
        onSelectTab={mockSelectTab}
        onOpenProfileModal={mockOpenProfile}
        onOpenSettingsModal={mockOpenSettings}
        onOpenGrapModal={mockOpenGrap}
        onOpenCitySearch={mockOpenCitySearch}
        onOpenExportReport={mockOpenExport}
        onSyncLive={mockSyncLive}
      />
    );

    const syncBtn = screen.getByText('Sync Live');
    fireEvent.click(syncBtn);
    expect(mockSyncLive).toHaveBeenCalled();
  });
});
