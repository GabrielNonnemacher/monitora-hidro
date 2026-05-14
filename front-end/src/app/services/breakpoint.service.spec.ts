import { BreakpointObserver } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { BreakpointService } from './breakpoint.service';

describe('BreakpointService', () => {
  let service: BreakpointService;
  let mockBreakpointObserver: { observe: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockBreakpointObserver = {
      observe: vi.fn().mockReturnValue(of({ matches: false })),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: BreakpointObserver, useValue: mockBreakpointObserver }],
    });
    service = TestBed.inject(BreakpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should observe (max-width: 725px)', () => {
    expect(mockBreakpointObserver.observe).toHaveBeenCalledWith('(max-width: 725px)');
  });

  it('should emit false when not mobile', () => {
    service.isMobile.subscribe((isMobile) => {
      expect(isMobile).toBe(false);
    });
  });
});
