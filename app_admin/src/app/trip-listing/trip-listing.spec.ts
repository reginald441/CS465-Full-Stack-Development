import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { TripListing } from './trip-listing';
import { Trip } from '../models/trip';

describe('TripListing', () => {
  let fixture: ComponentFixture<TripListing>;
  let httpTesting: HttpTestingController;

  const trips: Trip[] = [
    {
      code: 'GALR210214',
      name: 'Gale Reef',
      length: '4 nights / 5 days',
      start: '2021-02-14T08:00:00Z',
      resort: 'Emerald Bay, 3 stars',
      perPerson: '799.00',
      image: 'reef1.jpg',
      description: 'Gale Reef description'
    },
    {
      code: 'DAWR210315',
      name: "Dawson's Reef",
      length: '4 nights / 5 days',
      start: '2021-03-15T08:00:00Z',
      resort: 'Blue Lagoon, 4 stars',
      perPerson: '1199.00',
      image: 'reef2.jpg',
      description: "Dawson's Reef description"
    },
    {
      code: 'CLAR210621',
      name: "Claire's Reef",
      length: '4 nights / 5 days',
      start: '2021-06-21T08:00:00Z',
      resort: 'Coral Sands, 5 stars',
      perPerson: '1399.00',
      image: 'reef3.jpg',
      description: "Claire's Reef description"
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripListing],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(TripListing);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('renders a card and Edit Trip button for every API trip', async () => {
    fixture.detectChanges();

    const request = httpTesting.expectOne('http://localhost:3000/api/trips');
    expect(request.request.method).toBe('GET');
    request.flush(trips);

    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(fixture.componentInstance.trips().length).toBe(3);
    expect(element.querySelectorAll('app-trip-card').length).toBe(3);
    expect(element.textContent).toContain('Gale Reef');
    expect(element.textContent).toContain("Dawson's Reef");
    expect(element.textContent).toContain("Claire's Reef");
    expect(element.querySelectorAll('button').length).toBe(3);
  });
});
