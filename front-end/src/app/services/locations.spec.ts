import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { LocationsService } from './locations';
import { environment } from '../../environments/environment';

describe('LocationsService', () => {
  let service: LocationsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(LocationsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get states from API and cache them', () => {
    const mockStates = [{ id: 1, name: 'Rio Grande do Sul' }];
    const mockResponse = { data: mockStates };

    service.getStates().subscribe((states) => {
      expect(states).toEqual(mockStates);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/states`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('x-api-key')).toBeTruthy();
    req.flush(mockResponse);

    service.getStates().subscribe((states) => {
      expect(states).toEqual(mockStates);
    });
  });

  it('should get cities by state ID', () => {
    const mockCities = [{ id: 1, name: 'Porto Alegre' }];
    const mockResponse = { data: mockCities };
    const stateId = '1';

    service.getCities(stateId).subscribe((cities) => {
      expect(cities).toEqual(mockCities);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/cities/${stateId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get location points by city ID', () => {
    const mockPoints = [{ id: 1, name: 'Ponto 1' }];
    const mockResponse = { data: mockPoints };
    const cityId = '1';

    service.getLocationsPoints(cityId).subscribe((points) => {
      expect(points).toEqual(mockPoints);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/locations/${cityId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
