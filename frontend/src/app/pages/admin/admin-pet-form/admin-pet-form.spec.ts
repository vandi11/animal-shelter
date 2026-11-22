import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPetForm } from './admin-pet-form';

describe('AdminPetForm', () => {
  let component: AdminPetForm;
  let fixture: ComponentFixture<AdminPetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPetForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPetForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
