import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  const testKey = 'test-key';
  const testValue = { name: 'Test', value: 123 };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get an item', () => {
    service.set(testKey, testValue);
    const result = service.get(testKey);
    expect(result).toEqual(testValue);
  });

  it('should return null when getting a non-existent item', () => {
    const result = service.get('non-existent-key');
    expect(result).toBeNull();
  });

  it('should remove an item', () => {
    service.set(testKey, testValue);
    service.remove(testKey);
    const result = service.get(testKey);
    expect(result).toBeNull();
  });

  it('should clear all items', () => {
    service.set('key1', 'value1');
    service.set('key2', 'value2');
    service.clear();
    expect(service.get('key1')).toBeNull();
    expect(service.get('key2')).toBeNull();
  });

  it('should check if an item exists', () => {
    service.set(testKey, testValue);
    expect(service.exists(testKey)).toBeTruthy();
    service.remove(testKey);
    expect(service.exists(testKey)).toBeFalsy();
  });
});
