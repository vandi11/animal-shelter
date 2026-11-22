import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPets } from './admin-pets';

describe('AdminPets', () => {
  let component: AdminPets;
  let fixture: ComponentFixture<AdminPets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPets],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
