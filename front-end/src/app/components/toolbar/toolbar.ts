import { Component, computed, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'toolbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule, AsyncPipe, MatDividerModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  private readonly router = inject(Router);
  private readonly breakpointObserver = inject(BreakpointObserver);
  public readonly isDarkTheme = model<boolean>();
  public readonly isMobile = this.breakpointObserver.observe('(max-width: 725px)').pipe(map(result => result.matches));
  public readonly sidenavOpened = signal(false);

  protected readonly icon = computed<string>(() =>
    this.isDarkTheme() ? 'light_mode' : 'dark_mode',
  );

  protected onChangeTheme(): void {
    this.isDarkTheme.update((value) => !value);
  }

  public onHistoryClick(): void {
    this.router.navigate(['/history']);
    this.sidenavOpened.set(false);
  }

  public onAlertsClick(): void {
    this.router.navigate(['/alerts']);
    this.sidenavOpened.set(false);
  }

  public onNewsClick(): void {
    this.router.navigate(['/news']);
    this.sidenavOpened.set(false);
  }

  public onUsefulLinksClick(): void {
    this.router.navigate(['/useful-links']);
    this.sidenavOpened.set(false);
  }

  public onAboutClick(): void {
    this.router.navigate(['/about']);
    this.sidenavOpened.set(false);
  }

  public onHomeClick(): void {
    this.router.navigate(['/']);
    this.sidenavOpened.set(false);
  }

  public toggleSidenav(): void {
    this.sidenavOpened.update(value => !value);
  }
}
