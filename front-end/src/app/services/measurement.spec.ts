import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { MeasurementService } from './measurement';
import { environment } from '../../environments/environment';

describe('MeasurementService', () => {
  let service: MeasurementService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MeasurementService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get latest measurement by location ID', () => {
    const mockMeasurement = { id: 1, value: 100 };
    const mockResponse = { data: mockMeasurement };
    const locationId = '1';

    service.getLatestMeasurement(locationId).subscribe((measurement) => {
      expect(measurement).toEqual(mockMeasurement);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/measurements/${locationId}/last`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('x-api-key')).toBeTruthy();
    req.flush(mockResponse);
  });
});
