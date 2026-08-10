import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { StorageService } from './storage';
import { TripData } from './trip-data';

interface JwtPayload extends User {
  exp: number;
  _id?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(
    private storage: StorageService,
    private tripData: TripData
  ) {}

  getToken(): string | null {
    return this.storage.get();
  }

  saveToken(token: string): void {
    this.storage.save(token);
  }

  logout(): void {
    this.storage.remove();
  }

  isLoggedIn(): boolean {
    const payload = this.decodeToken(this.getToken());
    if (!payload || typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now()) {
      if (this.getToken()) this.logout();
      return false;
    }
    return true;
  }

  getCurrentUser(): User | null {
    if (!this.isLoggedIn()) return null;
    const payload = this.decodeToken(this.getToken());
    return payload ? { email: payload.email, name: payload.name } : null;
  }

  login(user: User, password: string): Observable<AuthResponse> {
    return this.tripData.login(user, password).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  register(user: User, password: string): Observable<AuthResponse> {
    return this.tripData.register(user, password).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  private decodeToken(token: string | null): JwtPayload | null {
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const decoded = decodeURIComponent(
        atob(base64).split('').map(char =>
          `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`
        ).join('')
      );
      const payload = JSON.parse(decoded) as JwtPayload;
      return payload && typeof payload.email === 'string' && typeof payload.name === 'string'
        ? payload
        : null;
    } catch {
      return null;
    }
  }
}
