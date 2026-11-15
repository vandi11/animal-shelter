import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PetApi } from '../../services/pet-api';
import { Gender, Pet } from '../../models/pet';

@Component({
  selector: 'app-animal-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './animal-list.html',
  styleUrl: './animal-list.scss',
})
export class AnimalList implements OnInit {
  protected readonly api = inject(PetApi);

  protected readonly pets = signal<Pet[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly gender = signal<'' | Gender>('');
  protected readonly adopted = signal<'' | 'true' | 'false'>('false');

  protected readonly genderLabels: Record<Gender, string> = {
    male: 'Hím',
    female: 'Nőstény',
    unknown: 'Ismeretlen',
  };

  ngOnInit(): void {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set(null);

    const gender = this.gender();
    const adopted = this.adopted();

    this.api
      .getAll({
        gender: gender || undefined,
        adopted: adopted === '' ? undefined : adopted === 'true',
      })
      .subscribe({
        next: (pets) => {
          this.pets.set(pets);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Az állatok betöltése nem sikerült.');
          this.loading.set(false);
        },
      });
  }
}