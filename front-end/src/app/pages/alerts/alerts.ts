import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.html',
  styleUrl: './alerts.scss',
  standalone: true,
  imports: [MatIconModule],
})
export class AlertsPage {}
