import { TestBed } from '@angular/core/testing';
import { PetApi } from './pet-api';

describe('PetApi', () => {
  let service: PetApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
