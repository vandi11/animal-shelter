import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse, RegisterPayload, User } from '../models/user';

const TOKEN_KEY = 'shelter_token';
const USER_KEY = 'shelter_user';

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly http = inject(HttpClient);

  private readonly tokenState = signal<string | null>(this.readToken());
  private readonly userState = signal<User | null>(this.readUser());

  readonly token = this.tokenState.asReadonly();
  readonly user = this.userState.asReadonly();
  readonly isLoggedIn = computed(() => this.tokenState() !== null);
  readonly isAdmin = computed(() => this.userState()?.is_admin === true);

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/login`, { email, password })
      .pipe(tap((response) => this.saveSession(response)));
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/register`, payload)
      .pipe(tap((response) => this.saveSession(response)));
  }

  logout(): Observable<unknown> {
    return this.http
      .post(`${environment.apiUrl}/logout`, {})
      .pipe(finalize(() => this.clearSession()));
  }

  clearSession(): void {
    this.tokenState.set(null);
    this.userState.set(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
      // a tárhely nem elérhető, a memóriában már törölve van
    }
  }

  private saveSession(response: AuthResponse): void {
    this.tokenState.set(response.token);
    this.userState.set(response.data);
    try {
      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    } catch {
      // a munkamenet ekkor csak az oldal újratöltéséig él
    }
  }

  private readToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  private readUser(): User | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
}