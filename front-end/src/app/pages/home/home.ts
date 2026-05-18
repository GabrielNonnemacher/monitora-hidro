import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { finalize, interval, switchMap } from 'rxjs';
import { Divider } from '../../components/divider/divider';
import { Loader } from '../../components/loader/loader';
import { SelectLocale } from '../../components/select-locale/select-locale';
import { LocalStorageService } from '../../services/local-storage';
import { MeasurementService } from '../../services/measurement';
import { DecimalCommaPipe } from '../../shared/pipes/number-pipe';
import { formatterNumberToPtBr, formatterToDate } from '../../shared/utils/formatter.util';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    MatButtonModule,
    SelectLocale,
    Divider,
    NgClass,
    MatListModule,
    Loader,
    DecimalCommaPipe,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
})
export class HomePage implements OnInit {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly measurementService = inject(MeasurementService);

  protected readonly loading = signal<boolean>(false);
  protected readonly isEditing = signal<boolean>(true);
  protected readonly latestMeasurement = signal<any>(null);
  protected readonly locale = signal<any>(null);
  protected readonly severity = computed(() => {
    const data = this.latestMeasurement();
    if (!data) return 'normal';
    const level = parseFloat(data.measurement.replace(',', '.'));
    return this.getSeverity(level);
  });
  protected readonly locationInfos = computed(() => {
    return this.localStorageService.get<any>('locale')?.locationInfos;
  });

  public ngOnInit(): void {
    this.checkLocale();
  }

  protected onChangeEditing(): void {
    this.loading.set(true);
    this.checkLocale();
  }

  protected getSeverity(level: number): string {
    if (level <= this.locationInfos()?.attention) return 'normal';
    if (level <= this.locationInfos()?.flood) return 'alert';
    if (level <= this.locationInfos()?.extreme) return 'flood';
    return 'extreme';
  }

  protected getSeverityIcon(severity: string): string {
    switch (severity) {
      case 'normal':
        return 'check_circle';
      case 'alert':
        return 'warning';
      case 'flood':
        return 'error';
      case 'extreme':
        return 'dangerous';
      default:
        return 'info';
    }
  }

  protected getSeverityLabel(severity: string): string {
    switch (severity) {
      case 'normal':
        return 'Normal';
      case 'alert':
        return 'Alerta';
      case 'flood':
        return 'Inundação';
      case 'extreme':
        return 'Extremo';
      default:
        return 'Desconhecido';
    }
  }

  private checkLocale(): void {
    const locale = this.localStorageService.get<any>('locale');
    this.locale.set(locale);

    if (locale) {
      this.loading.set(true);
      this.isEditing.set(false);
      this.firstGetLastestMeasurement(locale.locationPoint);
      this.getLastestMeasurement(locale.locationPoint);
    } else {
      this.isEditing.set(true);
      this.loading.set(false);
    }
  }

  private getLastestMeasurement(locationId: string, timeInterval: number = 120000): void {
    interval(timeInterval)
      .pipe(
        switchMap(() =>
          this.measurementService
            .getLatestMeasurement(locationId)
            .pipe(finalize(() => this.loading.set(false))),
        ),
      )
      .subscribe({
        next: (data) => {
          this.latestMeasurement.set({
            ...data,
            measurement: formatterNumberToPtBr(data.measurement),
            dateDescription: formatterToDate(data.date),
          });
          this.localStorageService.set('latestMeasurement', data);
        },
      });
  }

  private firstGetLastestMeasurement(locationId: string): void {
    this.loading.set(true);

    this.measurementService
      .getLatestMeasurement(locationId)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          this.latestMeasurement.set({
            ...data,
            measurement: formatterNumberToPtBr(data.measurement),
            dateDescription: formatterToDate(data.date),
          });
          this.localStorageService.set('latestMeasurement', data);
        },
      });
  }
}
