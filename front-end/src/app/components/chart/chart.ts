import { AfterViewInit, Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const normal = 8;
const alert = 12;
const flood = 15;
const extreme = 19;


@Component({
  selector: 'chart',
  imports: [],
  templateUrl: './chart.html',
  styleUrl: './chart.scss',
})
export class ChartComponent implements AfterViewInit {
  private readonly charts = signal<Chart<'line', number[], string> | undefined>(undefined);
  protected readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('chart');
  protected readonly monthMode = signal(true);
  readonly location = input<string>('Localização');
  protected readonly data = computed(() =>
    this.monthMode() ? [5, 18, 8, 14, 8, 22] : [13, 23, 15, 25, 70, 33],
  );
  protected readonly labels = computed(() =>
    this.monthMode()
      ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
      : ['2021', '2022', '2023', '2024', '2025', '2026'],
  );

  private createChart(): void {
    this.charts.set(
      new Chart<'line', number[], string>(this.canvas()!.nativeElement, {
        type: 'line',
        data: {
          labels: this.labels(),
          datasets: [
            {
              label: 'Nível',
              data: this.data(),
              fill: true,
              tension: 0,
              pointBackgroundColor: '#1976d2',
              borderColor: '#1976d2',
              backgroundColor: '#55a5f59c',
              borderWidth: 4,
            },
            {
              label: 'Normal',
              data: this.labels().map(() => normal),
              borderColor: '#4CAF50',
              pointBackgroundColor: '#4CAF50',
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
            },
            {
              label: 'Alerta',
              data: this.labels().map(() => alert),
              borderColor: '#FFC107',
              pointBackgroundColor: '#FFC107',
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
            },
            {
              label: 'Inundação',
              data: this.labels().map(() => flood),
              borderColor: '#FF9800',
              pointBackgroundColor: '#FF9800',
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
            },
            {
              label: 'Extremo',
              data: this.labels().map(() => extreme),
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
                }
              },
              onClick: () => { },
              onHover: () => { },
            },
            title: {
              display: true,
              text: `Grafico do Nível`,
              font: {
                size: 18,
              },
              padding: 24,
              color: "#005cbb"
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'metros',
              },
            },
          },
        },
      }),
    );
  }

  protected updateMode(): void {
    this.monthMode.update((old) => !old);
    const chart = this.charts();
    if (chart) {
      chart.data.labels = this.labels();
      chart.data.datasets[0].data = this.data();
      chart.data.datasets[1].data = this.labels().map(() => normal);
      chart.data.datasets[2].data = this.labels().map(() => alert);
      chart.data.datasets[3].data = this.labels().map(() => flood);
      chart.data.datasets[4].data = this.labels().map(() => extreme);
      chart.update();
    }
  }

  public ngAfterViewInit(): void {
    this.createChart();
  }
}
