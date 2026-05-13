import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private readonly BASE_URL = environment.apiUrl;
  private readonly BASE_KEY = environment.apiKey;

  private readonly http = inject(HttpClient);

  private readonly statesCache = signal<any[]>([]);

  public getStates(): Observable<any> {
    const cachedStatesHasData = this.statesCache()?.length;
    if (cachedStatesHasData) return of(this.statesCache());

    const headers = this.setHeaders();
    return this.http.get<any>(`${this.BASE_URL}/states`, { headers }).pipe(
      map(({ data }) => {
        this.statesCache.set(data);
        return data;
      }),
    );
  }

  public getCities(stateId: string): Observable<any> {
    const headers = this.setHeaders();
    return this.http
      .get<any>(`${this.BASE_URL}/cities/${stateId}`, { headers })
      .pipe(map(({ data }) => data));
  }

  public getLocationsPoints(cityId: string): Observable<any> {
    const headers = this.setHeaders();
    return this.http
      .get<any>(`${this.BASE_URL}/locations/${cityId}`, { headers })
      .pipe(map(({ data }) => data));
  }

  private setHeaders(): HttpHeaders {
    return new HttpHeaders({ 'x-api-key': this.BASE_KEY });
  }
}
