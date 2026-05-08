import { AfterViewInit, Component, computed, ElementRef, signal, viewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

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
  protected readonly data = computed(() =>
    this.monthMode() ? [5, 15, 8, 12, 8, 16] : [13, 23, 15, 25, 70, 33],
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
              label: 'Acessos',
              data: this.data(),
              fill: true,
              tension: 0,
              pointBackgroundColor: '#FFF',
              borderColor: '#1976d2',
              backgroundColor: '#1976d29c',
            },
          ],
        },
      }),
    );
  }

  protected updateMode(): void {
    this.monthMode.update((old) => !old);
    console.log(this.charts());

    /* this.charts.update((old: Chart<'line', number[], string> | undefined) => {
      return !!old?.data ? { ...old, data: { ...old?.data, labels: this.labels() } } : undefined;
    }); */
  }

  public ngAfterViewInit(): void {
    this.createChart();
  }
}
