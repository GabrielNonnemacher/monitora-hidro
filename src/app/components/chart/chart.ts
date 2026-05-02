import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'chart',
  imports: [],
  templateUrl: './chart.html',
  styleUrl: './chart.scss',
})
export class ChartComponent implements AfterViewInit {
  protected readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('chart');

  private createChart(): void {
    new Chart<"line", number[], string>(this.canvas()!.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Acessos',
            data: [5, 15, 8, 12, 8, 16],
            fill: true,
            tension: 0,
            pointBackgroundColor: '#FFF',
            borderColor: '#1976d2',
            backgroundColor: '#1976d29c',
          },
        ],
      },
    });
  }

  public ngAfterViewInit(): void {
    this.createChart();
  }
}
