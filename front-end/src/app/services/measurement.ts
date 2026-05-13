import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  private readonly BASE_URL = process.env['API_URL'] ?? '';
  private readonly BASE_KEY = process.env['API_KEY'] ?? '';

  private readonly http = inject(HttpClient);

  public getLatestMeasurement(locationId: string): Observable<any> {
    const headers = this.setHeaders();
    return this.http
      .get<any>(`${this.BASE_URL}/measurements/${locationId}/last`, { headers })
      .pipe(map(({ data }) => data));
  }

  private setHeaders(): HttpHeaders {
    return new HttpHeaders({ 'x-api-key': this.BASE_KEY });
  }
}
