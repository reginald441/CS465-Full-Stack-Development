import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class TripData {

  private apiUrl = 'http://localhost:3000/api';
  private url = `${this.apiUrl}/trips`;

  constructor(private http: HttpClient) {}

  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  public addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  public getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.url}/${tripCode}`
    );
  }

  public updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.url}/${formData.code}`,
      formData
    );
  }

  public login(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {
      email: user.email,
      password
    });
  }

  public register(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      name: user.name,
      email: user.email,
      password
    });
  }
}
