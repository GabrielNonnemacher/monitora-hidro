import { Component, computed, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LOCALES_DATA } from './constants';
import { City, State } from './models';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'select-locale',
  imports: [MatInputModule, MatSelectModule, MatFormFieldModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './select-locale.html',
  styleUrl: './select-locale.scss',
})
export class SelectLocale {
  public readonly confirm = output<void>();

  protected readonly data = LOCALES_DATA;
  protected readonly states = Object.keys(LOCALES_DATA);
  protected readonly cities = computed(() =>
    this.state() ? Object.keys(this.data[this.state()!]) : [],
  );
  protected readonly neighborhoods = computed(() =>
    this.state() && this.city() ? this.data[this.state()!][this.city()!] : [],
  );

  protected readonly state = signal<State | null>(null);
  protected readonly city = signal<City<State> | null>(null);
  protected readonly neighborhood = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.state();
      this.city.set(null);
      this.neighborhood.set(null);
    });

    effect(() => {
      this.city();
      this.neighborhood.set(null);
    });
  }

  protected onSubmit(): void {
    this.confirm.emit();
  }
}
