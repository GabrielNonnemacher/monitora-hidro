import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LocalStorageService } from './local-storage';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set item in localStorage', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem');

    service.set('user', { name: 'João' });

    expect(spy).toHaveBeenCalledWith('user', JSON.stringify({ name: 'João' }));
  });

  it('should get item from localStorage', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'João' }));

    const result = service.get<{ name: string }>('user');

    expect(result).toEqual({
      name: 'João',
    });
  });

  it('should return null when item does not exist', () => {
    const result = service.get('invalid');

    expect(result).toBeNull();
  });

  it('should remove item from localStorage', () => {
    localStorage.setItem('user', 'test');

    const spy = vi.spyOn(Storage.prototype, 'removeItem');

    service.remove('user');

    expect(spy).toHaveBeenCalledWith('user');

    expect(localStorage.getItem('user')).toBeNull();
  });

  it('should clear localStorage', () => {
    localStorage.setItem('a', '1');
    localStorage.setItem('b', '2');

    const spy = vi.spyOn(Storage.prototype, 'clear');

    service.clear();

    expect(spy).toHaveBeenCalled();

    expect(localStorage.length).toBe(0);
  });

  it('should return true when key exists', () => {
    localStorage.setItem('token', '123');

    const result = service.exists('token');

    expect(result).toBe(true);
  });

  it('should return false when key does not exist', () => {
    const result = service.exists('token');

    expect(result).toBe(false);
  });
});
