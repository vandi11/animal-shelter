import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Adoption, AdoptionStatus } from '../../../models/adoption';
import { SPECIES_LABELS, STATUS_BADGES, STATUS_LABELS } from '../../../models/labels';
import { AdoptionApi } from '../../../services/adoption-api';
import { errorMessage } from '../../../utils/error-message';

@Component({
  selector: 'app-admin-requests',
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './admin-requests.html',
  styleUrl: './admin-requests.scss',
})
export class AdminRequests implements OnInit {
  private readonly api = inject(AdoptionApi);

  protected readonly speciesLabels = SPECIES_LABELS;
  protected readonly statusLabels = STATUS_LABELS;
  protected readonly statusBadges = STATUS_BADGES;

  protected readonly requests = signal<Adoption[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly busyId = signal<number | null>(null);
  protected readonly filter = signal<'' | AdoptionStatus>('pending');

  protected readonly visible = computed(() => {
    const status = this.filter();
    return status ? this.requests().filter((r) => r.status === status) : this.requests();
  });

  ngOnInit(): void {
    this.fetch();
  }

  protected setStatus(request: Adoption, status: 'approved' | 'rejected'): void {
    if (status === 'approved') {
      const message =
        'Jóváhagyod a kérelmet? Az állat örökbe fogadottá válik, ' +
        'az ugyanerre az állatra érkezett többi függő kérelem pedig elutasításra kerül.';
      if (!confirm(message)) {
        return;
      }
    }

    this.busyId.set(request.id);
    this.error.set(null);

    this.api.updateStatus(request.id, status).subscribe({
      next: () => {
        this.busyId.set(null);
        this.fetch();
      },
      error: (err: HttpErrorResponse) => {
        this.busyId.set(null);
        this.error.set(errorMessage(err, 'A státusz módosítása nem sikerült.'));
      },
    });
  }

  private fetch(): void {
    this.api.all().subscribe({
      next: (requests) => {
        this.requests.set(requests);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(errorMessage(err, 'A kérelmek betöltése nem sikerült.'));
        this.loading.set(false);
      },
    });
  }
}