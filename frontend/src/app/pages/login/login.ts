import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  protected readonly registerMode = signal(false);
  protected readonly submitting = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password_confirmation: [''],
  });

  protected toggleMode(): void {
    this.registerMode.update((value) => !value);
    this.error.set(null);
  }

  protected submit(): void {
    this.error.set(null);

    const { name, email, password, password_confirmation } = this.form.getRawValue();
    const register = this.registerMode();

    if (this.form.controls.email.invalid || !password) {
      this.form.markAllAsTouched();
      return;
    }
    if (register && (!name.trim() || password !== password_confirmation)) {
      this.error.set(!name.trim() ? 'Add meg a neved.' : 'A két jelszó nem egyezik.');
      return;
    }

    this.submitting.set(true);

    const request = register
      ? this.auth.register({ name, email, password, password_confirmation })
      : this.auth.login(email, password);

    request.subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/animals']);
      },
      error: (err: HttpErrorResponse) => {
        this.submitting.set(false);
        this.error.set(this.errorMessage(err));
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
    return err.error?.message ?? 'Ismeretlen hiba történt.';
  }
}