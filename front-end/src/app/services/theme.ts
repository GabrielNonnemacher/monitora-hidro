import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly localStorageService = inject(LocalStorageService);
  public readonly theme = signal<string>(this.localStorageService.get('theme') || 'light');

  public setTheme(theme: string): void {
    this.theme.set(theme);
    this.localStorageService.set('theme', theme);
  }
}
