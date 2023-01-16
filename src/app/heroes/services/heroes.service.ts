import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseURL}/heroes`);
  }

  getHeroeById(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseURL}/heroes/${id}`);
  }

  searchHeroe(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(
      `${this.baseURL}/heroes/?q=${termino}&_limit=5`
    );
  }

  createHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseURL}/heroes`, heroe);
  }

  updateHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseURL}/heroes/${heroe.id}`, heroe);
  }
}
