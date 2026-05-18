import { Component, inject, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LocalStorageService } from '../../services/local-storage';
import { LocationsService } from '../../services/locations';
import { formatterLocationPointDescription } from '../../shared/utils/formatter.util';
import { LOCALES_DATA } from './constants';

@Component({
  selector: 'select-locale',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './select-locale.html',
  styleUrl: './select-locale.scss',
})
export class SelectLocale implements OnInit {
  private readonly locationService = inject(LocationsService);
  private readonly localStorageService = inject(LocalStorageService);

  private readonly state = signal<any>(null);
  private readonly city = signal<any>(null);
  private readonly locationPoint = signal<any>(null);

  protected readonly data = LOCALES_DATA;
  protected readonly states = signal<any[]>([]);
  protected readonly cities = signal<any[]>([]);
  protected readonly locationPoints = signal<any[]>([]);

  protected readonly stateId = signal<string | null>(null);
  protected readonly cityId = signal<string | null>(null);
  protected readonly locationPointId = signal<string | null>(null);

  public readonly confirm = output<void>();

  public ngOnInit(): void {
    this.getStates();
  }

  protected onStateChange(stateId: string): void {
    this.stateId.set(stateId);
    this.state.set(this.states().find((state) => state.value === stateId));
    this.cityId.set(null);
    this.city.set(null);
    this.getCities(stateId);
  }

  protected onCityChange(cityId: string): void {
    this.cityId.set(cityId);
    this.city.set(this.cities().find((city) => city.value === cityId));
    this.locationPointId.set(null);
    this.locationPoint.set(null);
    this.getLocationsPoints(cityId);
  }

  protected onLocationPointChange(locationPointId: string): void {
    this.locationPointId.set(locationPointId);
    this.locationPoint.set(
      this.locationPoints().find((location) => location.value === locationPointId),
    );
  }

  protected onSubmit(): void {
    this.localStorageService.set('locale', {
      state: this.stateId(),
      city: this.cityId(),
      locationPoint: this.locationPointId(),
      locationPointDescription: this.getLocationPointDescription(),
      locationInfos: this.locationPoint(),
    });

    this.confirm.emit();
  }

  private getStates(): void {
    this.locationService.getStates().subscribe((data) => {
      const states = data.map((state: any) => ({
        value: state._id,
        viewValue: state.name,
        active: state.active,
      }));
      this.states.set(states);
    });
  }

  private getCities(stateId: string): void {
    this.locationService.getCities(stateId).subscribe((data) => {
      const cities = data.map((city: any) => ({
        value: city._id,
        viewValue: city.name,
        active: city.active,
      }));
      this.cities.set(cities);
    });
  }

  private getLocationsPoints(cityId: string): void {
    this.locationService.getLocationsPoints(cityId).subscribe((data) => {
      const locations = data.map((location: any) => ({
        value: location._id,
        viewValue: location.name,
        active: location.active,
        default: location.default,
        flood: location.flood,
        extreme: location.extreme,
        attention: location.attention,
      }));
      this.locationPoints.set(locations);
    });
  }

  private getLocationPointDescription(): string {
    const locationPointName = this.locationPoint()?.viewValue || '';
    const cityName = this.city()?.viewValue || '';
    const stateName = this.state()?.viewValue || '';
    return formatterLocationPointDescription(stateName, cityName, locationPointName);
  }
}
