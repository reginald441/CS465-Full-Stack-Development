import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  submitted = false;
  errorMessage = '';

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';
    this.authenticationService.login({ email, name: '' }, password).subscribe({
      next: () => this.router.navigate(['/']),
      error: error => {
        this.errorMessage = error?.error?.message || 'Unable to sign in. Check your credentials.';
      }
    });
  }
}
