import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdoptionRequest } from './adoption-request';

describe('AdoptionRequest', () => {
  let component: AdoptionRequest;
  let fixture: ComponentFixture<AdoptionRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionRequest],
    }).compileComponents();

    fixture = TestBed.createComponent(AdoptionRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
