import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Adoption } from '../../models/adoption';
import { SPECIES_LABELS, STATUS_BADGES, STATUS_LABELS } from '../../models/labels';
import { AdoptionApi } from '../../services/adoption-api';

@Component({
  selector: 'app-adoption-request',
  imports: [RouterLink, DatePipe],
  templateUrl: './adoption-request.html',
  styleUrl: './adoption-request.scss',
})
export class AdoptionRequest implements OnInit {
  private readonly api = inject(AdoptionApi);

  protected readonly speciesLabels = SPECIES_LABELS;
  protected readonly statusLabels = STATUS_LABELS;
  protected readonly statusBadges = STATUS_BADGES;

  protected readonly requests = signal<Adoption[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.api.mine().subscribe({
      next: (requests) => {
        this.requests.set(requests);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('A kérelmek betöltése nem sikerült.');
        this.loading.set(false);
      },
    });
  }

  protected withdraw(request: Adoption): void {
    if (!confirm('Biztosan visszavonod a kérelmet?')) {
      return;
    }
    this.api.remove(request.id).subscribe({
      next: () => this.requests.update((list) => list.filter((r) => r.id !== request.id)),
      error: (err: HttpErrorResponse) =>
        this.error.set(err.error?.message ?? 'A kérelem visszavonása nem sikerült.'),
    });
  }
}