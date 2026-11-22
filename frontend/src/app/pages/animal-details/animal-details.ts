import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pet } from '../../models/pet';
import { GENDER_LABELS, HEALTH_LABELS, SPECIES_LABELS } from '../../models/labels';
import { PetApi } from '../../services/pet-api';
import { AdoptionApi } from '../../services/adoption-api';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-animal-details',
  imports: [RouterLink, DatePipe],
  templateUrl: './animal-details.html',
  styleUrl: './animal-details.scss',
})
export class AnimalDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly adoptions = inject(AdoptionApi);
  protected readonly api = inject(PetApi);
  protected readonly auth = inject(Auth);

  protected readonly speciesLabels = SPECIES_LABELS;
  protected readonly genderLabels = GENDER_LABELS;
  protected readonly healthLabels = HEALTH_LABELS;

  protected readonly pet = signal<Pet | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly submitting = signal(false);
  protected readonly requested = signal(false);
  protected readonly requestError = signal<string | null>(null);

  protected readonly age = computed(() => {
    const birthDate = this.pet()?.birth_date;
    if (!birthDate) {
      return null;
    }
    const birth = new Date(birthDate);
    const now = new Date();
    let months =
      (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth();
    if (now.getDate() < birth.getDate()) {
      months--;
    }
    if (months < 0) {
      return null;
    }
    const years = Math.floor(months / 12);
    const rest = months % 12;
    if (years === 0) {
      return `${rest} hónap`;
    }
    return rest ? `${years} év ${rest} hónap` : `${years} év`;
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getById(id).subscribe({
      next: (pet) => {
        this.pet.set(pet);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(
          err.status === 404 ? 'Az állat nem található.' : 'Az állat betöltése nem sikerült.',
        );
        this.loading.set(false);
      },
    });
  }

  protected adopt(): void {
    const pet = this.pet();
    if (!pet) {
      return;
    }
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.submitting.set(true);
    this.requestError.set(null);

    this.adoptions.create(pet.id).subscribe({
      next: () => {
        this.submitting.set(false);
        this.requested.set(true);
      },
      error: (err: HttpErrorResponse) => {
        this.submitting.set(false);
        this.requestError.set(this.errorMessage(err));
      },
    });
  }

  private errorMessage(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return 'A szerver nem érhető el. Fut a backend?';
    }
    const errors = err.error?.errors as Record<string, string[]> | undefined;
    if (errors) {
      return Object.values(errors).flat().join(' ');
    }
    return err.error?.message ?? 'A kérelem leadása nem sikerült.';
  }
}