import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilterChart } from '../shared/types/filter-chart.type';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  private readonly BASE_URL = environment.apiUrl;
  private readonly BASE_KEY = environment.apiKey;

  private readonly http = inject(HttpClient);

  public getLatestMeasurement(locationId: string): Observable<any> {
    const headers = this.setHeaders();
    return this.http
      .get<any>(`${this.BASE_URL}/measurements/${locationId}/last`, { headers })
      .pipe(map(({ data }) => data));
  }

  public getMeasurementDataChart(locationId: string, filter: FilterChart): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<any>(`${this.BASE_URL}/measurements/${locationId}/dashboard/${filter}`, { headers });
  }

  private setHeaders(): HttpHeaders {
    return new HttpHeaders({ 'x-api-key': this.BASE_KEY });
  }
}
