import { TestBed } from '@angular/core/testing';
import { AdoptionApi } from './adoption-api';

describe('AdoptionApi', () => {
  let service: AdoptionApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptionApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
