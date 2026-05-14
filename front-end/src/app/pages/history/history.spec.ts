import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { LocalStorageService } from '../../services/local-storage';
import { HistoryPage } from './history';

describe('HistoryPage', () => {
  let component: HistoryPage;
  let fixture: ComponentFixture<HistoryPage>;
  let localStorageService: { get: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    localStorageService = {
      get: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HistoryPage],
      providers: [{ provide: LocalStorageService, useValue: localStorageService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set location from localStorage on init', () => {
    const mockLocale = { locationPointDescription: 'Test Location' };
    localStorageService.get.mockReturnValue(mockLocale);

    component.ngOnInit();

    expect(localStorageService.get).toHaveBeenCalledWith('locale');
  });

  it('should keep default location when localStorage has no value', () => {
    localStorageService.get.mockReturnValue(null);

    component.ngOnInit();

    expect(localStorageService.get).toHaveBeenCalledWith('locale');
  });
});
