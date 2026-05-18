import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { LocalStorageService } from '../../services/local-storage';
import { ThemeService } from '../../services/theme';
import { LABELS_CHART_MONTHS } from '../../shared/constants/history.constants';
import { FilterChart } from '../../shared/types/filter-chart.type';

Chart.register(...registerables);

@Component({
  selector: 'chart',
  imports: [],
  templateUrl: './chart.html',
  styleUrl: './chart.scss',
})
export class ChartComponent implements AfterViewInit {
  private readonly themeService = inject(ThemeService);
  private readonly localStorageService = inject(LocalStorageService);

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('chart');
  private readonly charts = signal<Chart<'line', number[], string> | undefined>(undefined);

  protected readonly monthMode = signal<boolean>(true);
  protected readonly contrastActive = computed(() => this.themeService.theme() === 'contrast');
  protected readonly locationInfos = computed(() => {
    return this.localStorageService.get<any>('locale')?.locationInfos;
  });
  protected readonly labels = computed(() => {
    if (this.filter() === FilterChart.months) {
      return this.data().labels?.map((label: string) => LABELS_CHART_MONTHS[label]);
    }
    return this.data().labels;
  });

  public readonly data = input.required<{ labels: string[]; data: number[] }>();
  public readonly filter = input.required<FilterChart>();
  public readonly location = input.required<any>();

  private createChart(): void {
    this.charts.set(
      new Chart<'line', number[], string>(this.canvas()!.nativeElement, {
        type: 'line',
        data: {
          labels: this.labels(),
          datasets: [
            {
              label: 'Nível',
              data: this.data()?.data,
              fill: true,
              tension: 0,
              pointBackgroundColor: this.contrastActive() ? '#000000' : '#1976d2',
              borderColor: this.contrastActive() ? '#fff' : '#1976d2',
              backgroundColor: this.contrastActive() ? '#f0f0f0a5' : '#296fb4c4',
              borderWidth: 2,
            },
            {
              label: 'Normal',
              data: this.labels().map(() => this.locationInfos()?.default),
              borderColor: '#4CAF50',
              pointBackgroundColor: '#4CAF50',
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
            },
            {
              label: 'Alerta',
              data: this.labels().map(() => this.locationInfos()?.attention),
              borderColor: '#FFC107',
              pointBackgroundColor: '#FFC107',
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
            },
            {
              label: 'Inundação',
              data: this.labels().map(() => this.locationInfos()?.flood),
              borderColor: '#FF9800',
              pointBackgroundColor: '#FF9800',
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
            },
            {
              label: 'Extremo',
              data: this.labels().map(() => this.locationInfos()?.extreme),
              borderColor: '#F44336',
              pointBackgroundColor: '#F44336',
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                boxWidth: 8,
                boxHeight: 8,
                padding: 24,
                textAlign: 'center',
                font: {
                  size: 14,
                },
              },
              onClick: () => {},
              onHover: () => {},
            },
            title: {
              display: true,
              text: `Grafico do Nível (metros)`,
              font: {
                size: 18,
              },
              padding: 24,
              color: this.contrastActive() ? '#fff' : '#005cbb',
            },
          },
          scales: {},
        },
      }),
    );
  }

  protected updateMode(): void {
    this.monthMode.update((old) => !old);
    const chart = this.charts();
    if (chart) {
      const { attention, flood, extreme } = this.locationInfos() || {};
      chart.data.labels = this.labels();
      chart.data.datasets[0].data = this.data().data;
      chart.data.datasets[1].data = this.labels().map(() => this.locationInfos()?.default);
      chart.data.datasets[2].data = this.labels().map(() => attention);
      chart.data.datasets[3].data = this.labels().map(() => flood);
      chart.data.datasets[4].data = this.labels().map(() => extreme);
      chart.update();
    }
  }

  public ngAfterViewInit(): void {
    this.createChart();
  }
}
