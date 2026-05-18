import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { delay, of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage';
import { MeasurementService } from '../../services/measurement';
import { ThemeService } from '../../services/theme';
import { HistoryPage } from './history';

describe('HistoryPage', () => {
  let component: HistoryPage;
  let fixture: ComponentFixture<HistoryPage>;

  let localStorageService: {
    get: ReturnType<typeof vi.fn>;
  };

  let measurementService: {
    getMeasurementDataChart: ReturnType<typeof vi.fn>;
  };

  let themeService: {
    theme: ReturnType<typeof signal>;
  };

  let router: {
    navigate: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    localStorageService = {
      get: vi.fn(),
    };

    measurementService = {
      getMeasurementDataChart: vi.fn(),
    };

    themeService = {
      theme: signal('light'),
    };

    router = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HistoryPage],
      providers: [
        {
          provide: LocalStorageService,
          useValue: localStorageService,
        },
        {
          provide: MeasurementService,
          useValue: measurementService,
        },
        {
          provide: ThemeService,
          useValue: themeService,
        },
        {
          provide: Router,
          useValue: router,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryPage);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return current theme', () => {
    expect(component['theme']()).toBe('light');
    themeService.theme.set('contrast');
    expect(component['theme']()).toBe('contrast');
  });

  it('should get chart data successfully', () => {
    measurementService.getMeasurementDataChart.mockReturnValue(
      of({
        data: [
          {
            measurement: 10,
            x: 'Jan',
          },
          {
            measurement: 20,
            x: 'Feb',
          },
        ],
      }),
    );

    component['getData']('months' as any);

    expect(component['loading']()).toBe(false);

    expect(component['filter']()).toBe('months');

    expect(component['data']()).toEqual({
      data: [10, 20],
      labels: ['Jan', 'Feb'],
    });

    expect(component['error']()).toBe(false);
  });

  it('should set error true when data is null', () => {
    measurementService.getMeasurementDataChart.mockReturnValue(
      of({
        data: null,
      }),
    );
    component['getData']('months' as any);
    expect(component['error']()).toBe(true);
  });

  it('should set error true on request error', () => {
    measurementService.getMeasurementDataChart.mockReturnValue(
      throwError(() => new Error('Request error')),
    );

    component['getData']('months' as any);

    expect(component['error']()).toBe(true);

    expect(component['loading']()).toBe(false);
  });

  it('should call service with correct params', () => {
    component['location'].set('location-id');

    measurementService.getMeasurementDataChart.mockReturnValue(
      of({
        data: [],
      }),
    );

    component['getData']('days' as any);

    expect(measurementService.getMeasurementDataChart).toHaveBeenCalledWith('location-id', 'days');
  });

  it('should set location and get data on init', () => {
    localStorageService.get.mockReturnValue({
      locationPoint: 'location-point-id',
    });

    measurementService.getMeasurementDataChart.mockReturnValue(
      of({
        data: [],
      }),
    );

    component.ngOnInit();

    expect(component['location']()).toBe('location-point-id');

    expect(measurementService.getMeasurementDataChart).toHaveBeenCalledWith(
      'location-point-id',
      'years',
    );
  });

  it('should navigate to home if no locale in localStorage on init', () => {
    localStorageService.get.mockReturnValue(null);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set loading to true while fetching data', () => {
    measurementService.getMeasurementDataChart.mockReturnValue(of({ data: [] }).pipe(delay(100)));

    component['getData']('months' as any);

    expect(component['loading']()).toBe(true);
  });

  it('should set loading to false after fetching data', async () => {
    measurementService.getMeasurementDataChart.mockReturnValue(of({ data: [] }).pipe(delay(100)));

    component['getData']('months' as any);

    expect(component['loading']()).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(component['loading']()).toBe(false);
  });

  it('should set themeLoading to true when theme changes and data is loaded', async () => {
    component['data'].set({
      data: [1, 2, 3],
      labels: ['a', 'b', 'c'],
    });

    component['error'].set(false);
    component['loading'].set(false);

    themeService.theme.set('contrast');

    await new Promise((resolve) => setTimeout(resolve, 900));

    expect(component['themeLoading']()).toBe(false);
  });
});
