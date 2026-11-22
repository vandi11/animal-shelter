import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AnimalList } from './pages/animal-list/animal-list';
import { AnimalDetails } from './pages/animal-details/animal-details';
import { Login } from './pages/login/login';
import { AdoptionRequest } from './pages/adoption-request/adoption-request';
import { AdminPets } from './pages/admin/admin-pets/admin-pets';
import { AdminPetForm } from './pages/admin/admin-pet-form/admin-pet-form';
import { AdminRequests } from './pages/admin/admin-requests/admin-requests';
import { authGuard } from './services/auth-guard';
import { adminGuard } from './services/admin-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'animals', component: AnimalList },
  { path: 'animals/:id', component: AnimalDetails },
  { path: 'my-requests', component: AdoptionRequest, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'admin/pets', component: AdminPets, canActivate: [adminGuard] },
  { path: 'admin/pets/new', component: AdminPetForm, canActivate: [adminGuard] },
  { path: 'admin/pets/:id/edit', component: AdminPetForm, canActivate: [adminGuard] },
  { path: 'admin/requests', component: AdminRequests, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' },
];