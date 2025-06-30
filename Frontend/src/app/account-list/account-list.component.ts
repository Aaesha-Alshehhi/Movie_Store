import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit{
  accounts: Account[] = [];
  isLoading = true;

  constructor(
    private accountService: AccountService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading accounts:', err);
        this.isLoading = false;
      }
    });
  }

  editAccount(id: number): void {
    this.router.navigate(['/accounts', id, 'edit']);
  }

  deleteAccount(id: number | undefined): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(id!).subscribe({
        next: () => {
          this.accounts = this.accounts.filter(a => a.accountID !== id);
        },
        error: (err) => {
          console.error('Error deleting account:', err);
        }
      });
    }
  }

  viewAccountCarts(accountId: number | undefined): void {
    if (accountId === undefined || isNaN(accountId)) {
      console.error('Invalid account ID');
      return;
    }
    this.router.navigate(['/accounts', accountId, 'carts']);
  }
}
