import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth: Auth | undefined;
  private baseURL = environment.baseURL;

  public get auth(): Auth {
    return this._auth!;
  }

  constructor(private http: HttpClient) {}

  checkLogin(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseURL}/usuarios/${token}`).pipe(
      map((usuario) => {
        this._auth = usuario;
        return true;
      })
    );
  }

  login() {
    return this.http.get<Auth>(`${this.baseURL}/usuarios/1`).pipe(
      tap((usuario) => (this._auth = usuario)),
      tap((usuario) => localStorage.setItem('token', usuario.id))
    );
  }
}
