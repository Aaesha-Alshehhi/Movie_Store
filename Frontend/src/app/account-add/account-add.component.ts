import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account-add.component.html',
  styleUrl: './account-add.component.css'
})
export class AccountAddComponent {
  accountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    public router: Router
  ) {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      rememberMe: [false],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      this.accountService.createAccount(this.accountForm.value).subscribe({
        next: () => {
          this.router.navigate(['/accounts']);
        },
        error: (err) => {
          console.error('Error creating account:', err);
        }
      });
    }
  }
}
