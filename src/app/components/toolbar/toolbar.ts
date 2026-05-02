import { Component, computed, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'toolbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  public readonly isDarkTheme = model<boolean>();

  protected readonly icon = computed<string>(() =>
    this.isDarkTheme() ? 'light_mode' : 'dark_mode',
  );

  protected onChangeTheme(): void {
    this.isDarkTheme.update((value) => !value);
  }
}
