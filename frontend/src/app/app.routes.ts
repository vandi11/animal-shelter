import { Routes } from '@angular/router';
import{ Home } from './pages/home/home';
import { AnimalList } from './pages/animal-list/animal-list';
import { AnimalDetails } from './pages/animal-details/animal-details';
import { Login } from './pages/login/login';
import { AdoptionRequest } from './pages/adoption-request/adoption-request';


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'animals', component: AnimalList },
    { path: 'animals/:id', component: AnimalDetails },
    { path: 'adoption-request', component: AdoptionRequest },
    { path: 'login', component: Login },
    { path: '**', redirectTo: '' },
];
