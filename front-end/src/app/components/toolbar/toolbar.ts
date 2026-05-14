import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AsyncPipe } from '@angular/common';
import { BreakpointService } from '../../services/breakpoint.service';

@Component({
  selector: 'toolbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    AsyncPipe,
    MatDividerModule,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  private readonly router = inject(Router);
  private readonly breakpointService = inject(BreakpointService);

  protected readonly sidenavOpened = signal(false);
  protected readonly isMobile = this.breakpointService.isMobile;

  public readonly contrastActive = model<boolean>();
  public readonly isDarkTheme = model<boolean>();

  protected readonly icon = computed<string>(() =>
    this.isDarkTheme() ? 'light_mode' : 'dark_mode',
  );

  protected onChangeTheme(): void {
    this.isDarkTheme.update((value) => !value);
  }

  protected onChangeContrast(): void {
    this.contrastActive.update((value) => !value);
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
    this.sidenavOpened.update((value) => !value);
  }
}
