import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {

  public editForm!: FormGroup;
  submitted = false;
  tripCode = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripData
  ) {}

  ngOnInit(): void {

    this.tripCode = localStorage.getItem('tripCode') || '';

    this.editForm = this.formBuilder.group({
      _id: [''],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    if (this.tripCode) {
      this.tripService.getTrip(this.tripCode)
        .subscribe({
          next: (data: Trip[]) => {
            if (data.length > 0) {
              this.editForm.patchValue(data[0]);
            }
          },
          error: (error: any) => {
            console.error('Unable to load trip', error);
          }
        });
    }
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.error('Unable to update trip', error);
          }
        });
    }
  }

  get f() {
    return this.editForm.controls;
  }

}
