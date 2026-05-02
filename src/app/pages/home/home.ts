import { Component, signal } from '@angular/core';
import { ChartComponent } from '../../components/chart/chart';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SelectLocale } from "../../components/select-locale/select-locale";

@Component({
  selector: 'app-home',
  imports: [ChartComponent, MatIconModule, MatButtonModule, SelectLocale],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
})
export class HomePage {
  protected readonly isEditing = signal<boolean>(true);

  protected onChangeEditing(value: boolean): void {
    this.isEditing.set(value);
  }
}
