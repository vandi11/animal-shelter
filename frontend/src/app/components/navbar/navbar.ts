import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected readonly auth = inject(Auth);
  private readonly router = inject(Router);

  protected logout(): void {
    this.auth.logout().subscribe({
      complete: () => this.router.navigate(['/']),
      error: () => this.router.navigate(['/']),
    });
  }
}