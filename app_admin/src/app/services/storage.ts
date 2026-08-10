import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly tokenKey = 'travlr-token';

  get(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  save(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  remove(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
