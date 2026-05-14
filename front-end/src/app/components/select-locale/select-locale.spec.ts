import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { SelectLocale } from './select-locale';
import { LocationsService } from '../../services/locations';
import { LocalStorageService } from '../../services/local-storage';

describe('SelectLocale', () => {
  let component: SelectLocale;
  let fixture: ComponentFixture<SelectLocale>;
  let mockLocationsService: {
    getStates: ReturnType<typeof vi.fn>;
    getCities: ReturnType<typeof vi.fn>;
    getLocationsPoints: ReturnType<typeof vi.fn>;
  };
  let mockLocalStorageService: {
    get: ReturnType<typeof vi.fn>;
    set: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockLocationsService = {
      getStates: vi.fn(),
      getCities: vi.fn(),
      getLocationsPoints: vi.fn(),
    };

    mockLocalStorageService = {
      get: vi.fn(),
      set: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [SelectLocale],
      providers: [
        { provide: LocationsService, useValue: mockLocationsService },
        { provide: LocalStorageService, useValue: mockLocalStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectLocale);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get states on init', () => {
    const mockStates = [{ _id: '1', name: 'RS', active: true }];
    mockLocationsService.getStates.mockReturnValue(of(mockStates));

    component.ngOnInit();

    expect(mockLocationsService.getStates).toHaveBeenCalled();
  });
});
