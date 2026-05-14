import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { HomePage } from './home';
import { MeasurementService } from '../../services/measurement';
import { LocalStorageService } from '../../services/local-storage';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockMeasurementService: { getLatestMeasurement: ReturnType<typeof vi.fn> };
  let mockLocalStorageService: { get: ReturnType<typeof vi.fn>, set: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockMeasurementService = {
      getLatestMeasurement: vi.fn(),
    };

    mockLocalStorageService = {
      get: vi.fn(),
      set: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        { provide: MeasurementService, useValue: mockMeasurementService },
        { provide: LocalStorageService, useValue: mockLocalStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check locale on init with no locale', () => {
    mockLocalStorageService.get.mockReturnValue(null);
    component.ngOnInit();
    expect(mockLocalStorageService.get).toHaveBeenCalledWith('locale');
  });

  it('should check locale on init with locale', () => {
    const mockLocale = { locationPoint: '123' };
    const mockMeasurement = { 
      id: '1', 
      measurement: 5.5, 
      date: '2024-01-01' 
    };
    
    mockLocalStorageService.get.mockReturnValue(mockLocale);
    mockMeasurementService.getLatestMeasurement.mockReturnValue(of(mockMeasurement));
    component.ngOnInit();
    
    expect(mockLocalStorageService.get).toHaveBeenCalledWith('locale');
    expect(mockMeasurementService.getLatestMeasurement).toHaveBeenCalledWith('123');
  });
});
