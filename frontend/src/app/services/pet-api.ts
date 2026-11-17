import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pet, PetFilters } from '../models/pet';

interface DataWrapper<T> {
  data: T;
}

@Injectable({ providedIn: 'root' })
export class PetApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/pets`;

  getAll(filters: PetFilters = {}): Observable<Pet[]> {
    let params = new HttpParams();
    
    if (filters.species) {
    params = params.set('species', filters.species);
    }
    if (filters.gender) {
      params = params.set('gender', filters.gender);
    }
    if (filters.adopted !== undefined) {
      params = params.set('adopted', String(filters.adopted));
    }
    return this.http
      .get<DataWrapper<Pet[]>>(this.url, { params })
      .pipe(map((response) => response.data));
  }

  getById(id: number): Observable<Pet> {
    return this.http
      .get<DataWrapper<Pet>>(`${this.url}/${id}`)
      .pipe(map((response) => response.data));
  }

  photoUrl(pet: Pet): string | null {
    if (!pet.photo_path) {
      return null;
    }
    return pet.photo_path.startsWith('http')
      ? pet.photo_path
      : `${environment.storageUrl}/${pet.photo_path}`;
  }
}