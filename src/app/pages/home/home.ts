import { Component } from '@angular/core';
import { ChartComponent } from '../../components/chart/chart';

@Component({
  selector: 'app-home',
  imports: [ChartComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
})
export class HomePage {}
