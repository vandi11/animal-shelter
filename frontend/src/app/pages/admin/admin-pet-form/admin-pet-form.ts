import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Gender, PetPayload } from '../../../models/pet';
import { PetApi } from '../../../services/pet-api';
import { errorMessage } from '../../../utils/error-message';

@Component({
  selector: 'app-admin-pet-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-pet-form.html',
  styleUrl: './admin-pet-form.scss',
})
export class AdminPetForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(PetApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly petId = signal<number | null>(null);
  protected readonly loading = signal(false);
  protected readonly submitting = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    species: ['dog', [Validators.required]],
    gender: ['unknown' as Gender, [Validators.required]],
    birth_date: [''],
    weight: [null as number | null, [Validators.min(0), Validators.max(999.99)]],
    color: [''],
    health_status: [''],
    sterilized: [false],
    arrival_date: [''],
    photo_path: [''],
    description: [''],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.petId.set(Number(id));
    this.loading.set(true);

    this.api.getById(Number(id)).subscribe({
      next: (pet) => {
        this.form.patchValue({
          name: pet.name,
          species: pet.species,
          gender: pet.gender,
          birth_date: pet.birth_date ?? '',
          weight: pet.weight === null ? null : Number(pet.weight),
          color: pet.color ?? '',
          health_status: pet.health_status ?? '',
          sterilized: pet.sterilized,
          arrival_date: pet.arrival_date ?? '',
          photo_path: pet.photo_path ?? '',
          description: pet.description ?? '',
        });
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(errorMessage(err, 'Az állat betöltése nem sikerült.'));
        this.loading.set(false);
      },
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    const id = this.petId();
    const payload = this.buildPayload();
    const request = id ? this.api.update(id, payload) : this.api.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/admin/pets']),
      error: (err: HttpErrorResponse) => {
        this.submitting.set(false);
        this.error.set(errorMessage(err, 'A mentés nem sikerült.'));
      },
    });
  }

  private buildPayload(): PetPayload {
    const value = this.form.getRawValue();
    return {
      name: value.name.trim(),
      species: value.species,
      gender: value.gender,
      birth_date: value.birth_date || null,
      weight: value.weight,
      color: value.color.trim() || null,
      health_status: value.health_status || null,
      sterilized: value.sterilized,
      arrival_date: value.arrival_date || null,
      photo_path: value.photo_path.trim() || null,
      description: value.description.trim() || null,
    };
  }
}