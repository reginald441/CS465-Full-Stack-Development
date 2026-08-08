import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {

  readonly trips = signal<Trip[]>([]);
  message = '';

  constructor(private tripData: TripData) {}

  ngOnInit(): void {
    this.tripData.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips.set(value);
        if (value.length > 0) {
          this.message = 'Trips retrieved successfully';
        } else {
          this.message = 'No trips found';
        }
      },
      error: (error: any) => {
        console.error('Unable to load trips', error);
      }
    });
  }
}
