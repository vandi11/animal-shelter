import { HttpErrorResponse } from '@angular/common/http';

export function errorMessage(err: HttpErrorResponse, fallback: string): string {
  if (err.status === 0) {
    return 'A szerver nem érhető el. Fut a backend?';
  }
  const errors = err.error?.errors as Record<string, string[]> | undefined;
  if (errors) {
    return Object.values(errors).flat().join(' ');
  }
  return err.error?.message ?? fallback;
}