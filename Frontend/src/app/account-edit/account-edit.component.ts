import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.css'
})
export class AccountEditComponent implements OnInit{
  accountForm: FormGroup;
  accountId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private accountService: AccountService
  ) {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      rememberMe: [false],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.accountId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadAccountData();
  }

  loadAccountData(): void {
    this.accountService.getAccountById(this.accountId).subscribe({
      next: (account) => {
        this.accountForm.patchValue({
          firstName: account.firstName,
          lastName: account.lastName,
          password: account.password
        });
      },
      error: (err) => {
        console.error('Error loading account:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const accountData: Account = {
        ...this.accountForm.value,
        account_ID: this.accountId
      };

      this.accountService.updateAccount(this.accountId, accountData).subscribe({
        next: () => {
          this.router.navigate(['/accounts']);
        },
        error: (err) => {
          console.error('Error updating account:', err);
        }
      });
    }
  }
}
