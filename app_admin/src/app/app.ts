import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Travlr Getaways Admin';

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
