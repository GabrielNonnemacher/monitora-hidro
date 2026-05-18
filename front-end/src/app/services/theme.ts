import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public readonly theme = signal<string>('light');

  public setTheme(theme: string): void {
    this.theme.set(theme);
  }
}
