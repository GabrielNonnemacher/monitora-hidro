import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Toolbar } from './toolbar';
import { BreakpointService } from '../../services/breakpoint.service';

describe('Toolbar', () => {
  let component: Toolbar;
  let fixture: ComponentFixture<Toolbar>;
  let mockRouter: { navigate: ReturnType<typeof vi.fn> };
  let mockBreakpointService: { isMobile: any };

  beforeEach(async () => {
    mockRouter = {
      navigate: vi.fn(),
    };

    mockBreakpointService = {
      isMobile: of(false),
    };

    await TestBed.configureTestingModule({
      imports: [Toolbar],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: BreakpointService, useValue: mockBreakpointService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Toolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to history', () => {
    component.onHistoryClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/history']);
  });

  it('should navigate to alerts', () => {
    component.onAlertsClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/alerts']);
  });

  it('should navigate to news', () => {
    component.onNewsClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/news']);
  });

  it('should navigate to useful links', () => {
    component.onUsefulLinksClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/useful-links']);
  });

  it('should navigate to about', () => {
    component.onAboutClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/about']);
  });

  it('should navigate to home', () => {
    component.onHomeClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should toggle sidenav', () => {
    const initial = component['sidenavOpened']();
    component.toggleSidenav();
    expect(component['sidenavOpened']()).toBe(!initial);
  });

  it('should toggle theme', () => {
    const initial = component.isDarkTheme();
    component['onChangeTheme']();
    expect(component.isDarkTheme()).toBe(!initial);
  });

  it('should toggle contrast', () => {
    const initial = component.contrastActive();
    component['onChangeContrast']();
    expect(component.contrastActive()).toBe(!initial);
  });

  it('should toggle sidenav', () => {
    const initial = component['sidenavOpened']();
    component.toggleSidenav();
    expect(component['sidenavOpened']()).toBe(!initial);
  });

  it('should return correct icon for dark theme', () => {
    component.isDarkTheme.set(true);
    expect(component['icon']()).toBe('light_mode');
  });

  it('should return correct icon for light theme', () => {
    component.isDarkTheme.set(false);
    expect(component['icon']()).toBe('dark_mode');
  });
});
