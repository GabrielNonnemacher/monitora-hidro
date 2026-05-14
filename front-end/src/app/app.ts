import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from './components/toolbar/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly isDarkTheme = signal<boolean>(false);
  protected readonly contrastActive = signal<boolean>(false);

  protected readonly classTheme = signal<string>('light');

  public constructor() {
    this.setThemeContrast();
    this.setThemeDarkOrLight();
  }

  private setThemeDarkOrLight(): void {
    effect(() => {
      this.isDarkTheme();
      !this.isDarkTheme();
      this.classTheme.set(this.isDarkTheme() ? 'dark' : 'light');
      this.contrastActive.set(false);
    });
  }

  private setThemeContrast(): void {
    effect(() => {
      this.contrastActive();
      this.classTheme.set(
        this.contrastActive() ? 'contrast' : this.isDarkTheme() ? 'dark' : 'light',
      );
    });
  }
}
