import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { CartItem } from '../cart';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-account-carts',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './account-carts.component.html',
  styleUrl: './account-carts.component.css'
})
export class AccountCartsComponent implements OnInit{
  accountId!: number;
  account!: Account;
  cartItems: CartItem[] = [];
  isLoading = true;
  movies: Movie[] = [];

  get accountFullName(): string {
    return this.account?.firstName && this.account?.lastName 
      ? `${this.account.firstName} ${this.account.lastName}`
      : 'Account';
  }

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private accountService: AccountService,
    private cartService: CartService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.accountId = +this.route.snapshot.params['accountId'];
    this.loadData();
    this.loadMovies;
  }

  loadData(): void {
    this.isLoading = true;
    
    this.accountService.getAccountById(this.accountId).subscribe({
      next: (account) => {
        this.account = account;
        this.loadCartItems();
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/accounts']);
      }
    });
  }

  loadCartItems(): void {
    this.cartService.getCartItemsByAccount(this.accountId).subscribe({
      next: (items) => {
        this.cartItems = items || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  addNewCart(): void {
    this.router.navigate(['/accounts', this.accountId, 'carts', 'add']);
  }

  editCart(cartId: number): void {
    this.router.navigate(['/accounts', this.accountId, 'carts', cartId, 'edit']);
  }

  deleteCart(cartId: number): void {
    if (confirm('Are you sure you want to delete this cart item?')) {
      this.cartService.deleteCartItem(cartId).subscribe({
        next: () => {
          this.cartItems = this.cartItems.filter(item => item.cartID !== cartId);
        },
        error: (err) => console.error('Error deleting cart item:', err)
      });
    }
  }

  getMovieName(movie: Movie): string {
    return movie?.name || 'Unknown Movie';
  }

  private loadMovies(): void {
    this.movieService.getAllMovies().subscribe(movies => {
      this.movies = movies;
    });
  }
}
