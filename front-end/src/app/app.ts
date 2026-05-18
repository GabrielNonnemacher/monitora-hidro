import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from './components/toolbar/toolbar';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly themeService = inject(ThemeService);

  protected readonly isDarkTheme = signal<boolean>(false);
  protected readonly contrastActive = signal<boolean>(false);

  protected readonly classTheme = computed<string>(() => this.themeService.theme());
}
