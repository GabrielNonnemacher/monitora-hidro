import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from "./components/toolbar/toolbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly isDarkTheme = signal(false);
  protected readonly classTheme = computed<string>(() => this.isDarkTheme() ? 'dark': 'light')
}
