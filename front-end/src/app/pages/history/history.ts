import { Component, inject, OnInit, signal } from '@angular/core';
import { ChartComponent } from "../../components/chart/chart";
import { LocalStorageService } from "../../services/local-storage";

@Component({
  selector: 'app-history',      
  templateUrl: './history.html',
  styleUrl: './history.scss',
  standalone: true,
  imports: [ChartComponent],
})
export class HistoryPage implements OnInit {
  private readonly localStorageService = inject(LocalStorageService);
  protected readonly location = signal<string>('Localização');

  public ngOnInit(): void {
    const locale = this.localStorageService.get<any>('locale');
    if (locale) {
      this.location.set(locale.locationPointDescription);
    }
  }
}
