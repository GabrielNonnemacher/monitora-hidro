import { AsyncPipe } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ChartComponent } from '../../components/chart/chart';
import { EmptyStateComponent } from '../../components/empty-state/empty-state';
import { Loader } from '../../components/loader/loader';
import { BreakpointService } from '../../services/breakpoint.service';
import { LocalStorageService } from '../../services/local-storage';
import { MeasurementService } from '../../services/measurement';
import { ThemeService } from '../../services/theme';
import { FILTER_CHART_TYPES, LABEL_BUTTONS_CHART } from '../../shared/constants/history.constants';
import { FilterChart } from '../../shared/types/filter-chart.type';

@Component({
  selector: 'app-history',
  templateUrl: './history.html',
  styleUrl: './history.scss',
  standalone: true,
  imports: [
    ChartComponent,
    MatButtonModule,
    Loader,
    AsyncPipe,
    MatSelectModule,
    EmptyStateComponent,
  ],
})
export class HistoryPage implements OnInit {
  private readonly router = inject(Router);
  private readonly service = inject(MeasurementService);
  private readonly themeService = inject(ThemeService);
  private readonly breakpointService = inject(BreakpointService);
  private readonly localStorageService = inject(LocalStorageService);

  protected readonly typesButtons = FILTER_CHART_TYPES;
  protected readonly labelsButtons = LABEL_BUTTONS_CHART;
  protected readonly isMobile = this.breakpointService.isMobile;

  protected readonly loading = signal<boolean>(true);
  protected readonly themeLoading = signal<boolean>(false);
  protected readonly error = signal<boolean>(false);
  protected readonly filter = signal<FilterChart>(FilterChart.years);
  protected readonly location = signal<string>('6a009701f5ce5c5f11be2491');
  protected readonly data = signal<{ labels: string[]; data: number[] } | null>(null);

  protected readonly theme = computed(() => this.themeService.theme());

  public constructor() {
    effect(() => {
      this.themeService.theme();

      if (!!this.data()?.data?.length && !this.error() && !this.loading()) {
        this.themeLoading.set(true);
        setTimeout(() => {
          this.themeLoading.set(false);
        }, 800);
      }
    });
  }

  protected getData(filter: FilterChart): void {
    this.loading.set(true);
    this.filter.set(filter);

    this.service
      .getMeasurementDataChart(this.location(), filter)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ data }) => {
          this.data.set({
            data: data?.map((item: any) => item?.measurement),
            labels: data?.map((item: any) => item?.x),
          });
          this.error.set(data === null);
        },
        error: () => {
          this.error.set(true);
        },
      });
  }

  public ngOnInit(): void {
    const locale = this.localStorageService.get<any>('locale');

    if (locale) {
      this.location.set(locale.locationPoint as string);
      this.getData(this.filter());
    } else {
      this.router.navigate(['/']);
    }
  }
}
