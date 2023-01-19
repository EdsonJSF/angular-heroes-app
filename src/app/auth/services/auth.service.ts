import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

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

  login() {
    return this.http
      .get<Auth>(`${this.baseURL}/usuarios/1`)
      .pipe(tap((usuario) => (this._auth = usuario)));
  }
}
