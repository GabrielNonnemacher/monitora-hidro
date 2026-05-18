import { vi } from 'vitest';

vi.mock('chart.js', () => {
  class MockChart {
    data = {
      labels: [],
      datasets: [{ data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }],
    };

    update = vi.fn();

    static register = vi.fn();
  }

  return {
    Chart: MockChart,
    registerables: [],
  };
});

import { ElementRef, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { LocalStorageService } from '../../services/local-storage';
import { ThemeService } from '../../services/theme';
import { ChartComponent } from './chart';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  const mockThemeService = {
    theme: signal('light'),
  };

  const mockLocalStorageService = {
    get: vi.fn().mockReturnValue({
      locationInfos: {
        default: 1,
        attention: 2,
        flood: 3,
        extreme: 4,
      },
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
      providers: [
        {
          provide: ThemeService,
          useValue: mockThemeService,
        },
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('data', {
      labels: ['1', '2', '3'],
      data: [10, 20, 30],
    });

    fixture.componentRef.setInput('filter', 'months' as any);

    fixture.componentRef.setInput('location', {});

    vi.spyOn(component as any, 'canvas').mockReturnValue(
      new ElementRef(document.createElement('canvas')),
    );
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create chart after view init', () => {
    component.ngAfterViewInit();

    expect(component['charts']()).toBeDefined();
  });

  it('should compute contrastActive correctly', () => {
    mockThemeService.theme.set('contrast');

    expect(component['contrastActive']()).toBe(true);

    mockThemeService.theme.set('light');

    expect(component['contrastActive']()).toBe(false);
  });

  it('should get locationInfos from localStorage', () => {
    expect(component['locationInfos']()).toEqual({
      default: 1,
      attention: 2,
      flood: 3,
      extreme: 4,
    });
  });

  it('should toggle monthMode', () => {
    const initial = component['monthMode']();

    component['updateMode']();

    expect(component['monthMode']()).toBe(!initial);
  });

  it('should update chart data', () => {
    component.ngAfterViewInit();

    component['updateMode']();

    const chart = component['charts']();

    expect(chart?.update).toHaveBeenCalled();

    expect(chart?.data.datasets[0].data).toEqual([10, 20, 30]);
  });

  it('should update chart labels', () => {
    component.ngAfterViewInit();

    component['updateMode']();

    const chart = component['charts']();

    expect(chart?.update).toHaveBeenCalled();
  });
});
