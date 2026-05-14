import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Toolbar } from './toolbar';

describe('Toolbar', () => {
  let component: Toolbar;
  let fixture: ComponentFixture<Toolbar>;
  let mockRouter: { navigate: ReturnType<typeof vi.fn> };
  let mockBreakpointObserver: { observe: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockRouter = {
      navigate: vi.fn(),
    };

    mockBreakpointObserver = {
      observe: vi.fn().mockReturnValue(of({ matches: false })),
    };

    await TestBed.configureTestingModule({
      imports: [Toolbar],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
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
});
