import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { CartItem } from '../cart';
import { CommonModule } from '@angular/common';
import { Type } from '../type';

@Component({
  selector: 'app-cart-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cart-edit.component.html',
  styleUrl: './cart-edit.component.css'
})
export class CartEditComponent implements OnInit {
  accountId!: number;
  cartId!: number;
  movies: Movie[] = [];
  cartItem!: CartItem;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private cartService: CartService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.accountId = +this.route.snapshot.params['accountId'];
    this.cartId = +this.route.snapshot.params['cartId'];
    this.loadMovies();
    this.loadCartItem();
  }

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  loadCartItem(): void {
    this.cartService.getCartItemById(this.cartId).subscribe({
      next: (item) => {
        this.cartItem = {
          ...item,
          purchaseDate: new Date(item.purchaseDate)
        };
      },
      error: (err) => console.error('Error loading cart item:', err)
    });
  }
  
  onSubmit(): void {
    const payload: CartItem = {
      ...this.cartItem,
      purchaseDate: typeof this.cartItem.purchaseDate === 'string' 
        ? this.cartItem.purchaseDate 
        : this.cartItem.purchaseDate.toISOString()
    };
  
    this.cartService.updateCartItem(this.cartId, payload).subscribe({
      next: () => this.router.navigate(['/accounts', this.accountId, 'carts']),
      error: (err) => console.error('Error updating cart item:', err)
    });
  }
}