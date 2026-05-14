import { Injectable, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private readonly breakpointObserver = inject(BreakpointObserver);

  public readonly isMobile: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 725px)')
    .pipe(map((result) => result.matches));
}
