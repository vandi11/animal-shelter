import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Adoption } from '../models/adoption';

interface DataWrapper<T> {
  data: T;
}

@Injectable({ providedIn: 'root' })
export class AdoptionApi {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl;

  create(petId: number): Observable<Adoption> {
    return this.http
      .post<DataWrapper<Adoption>>(`${this.url}/adoption-requests`, { pet_id: petId })
      .pipe(map((response) => response.data));
  }

  mine(): Observable<Adoption[]> {
    return this.http
      .get<DataWrapper<Adoption[]>>(`${this.url}/my-adoption-requests`)
      .pipe(map((response) => response.data));
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.url}/adoption-requests/${id}`);
  }
}