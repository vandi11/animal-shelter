import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { GENDER_LABELS, SPECIES_LABELS } from '../../../models/labels';
import { Pet } from '../../../models/pet';
import { PetApi } from '../../../services/pet-api';
import { errorMessage } from '../../../utils/error-message';

@Component({
  selector: 'app-admin-pets',
  imports: [RouterLink],
  templateUrl: './admin-pets.html',
  styleUrl: './admin-pets.scss',
})
export class AdminPets implements OnInit {
  private readonly api = inject(PetApi);

  protected readonly speciesLabels = SPECIES_LABELS;
  protected readonly genderLabels = GENDER_LABELS;

  protected readonly pets = signal<Pet[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.api.getAll().subscribe({
      next: (pets) => {
        this.pets.set(pets);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(errorMessage(err, 'Az állatok betöltése nem sikerült.'));
        this.loading.set(false);
      },
    });
  }

  protected remove(pet: Pet): void {
    const message = `Biztosan törlöd: ${pet.name}? A hozzá tartozó kérelmek is törlődnek.`;
    if (!confirm(message)) {
      return;
    }
    this.error.set(null);
    this.api.remove(pet.id).subscribe({
      next: () => this.pets.update((list) => list.filter((p) => p.id !== pet.id)),
      error: (err: HttpErrorResponse) =>
        this.error.set(errorMessage(err, 'Az állat törlése nem sikerült.')),
    });
  }
}