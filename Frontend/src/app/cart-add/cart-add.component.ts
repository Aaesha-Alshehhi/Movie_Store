import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../cart';
import { CartService } from '../cart.service';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-add.component.html',
  styleUrl: './cart-add.component.css'
})
export class CartAddComponent implements OnInit {
  accountId!: number;
  movies: Movie[] = [];
  cartItem: Omit<CartItem, 'cartID'> = {
    quantity: 1,
    purchaseDate: new Date().toISOString().substring(0, 10),
    movie: {} as Movie 
  };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private cartService: CartService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.accountId = +this.route.snapshot.params['accountId'];
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe(movies => {
      this.movies = movies;
      if (movies.length > 0) {
        this.cartItem.movie = movies[0];
      }
    });
  }
  
  onSubmit(): void {
    // Convert purchaseDate to string if it's a Date object
    const payload: CartItem = {
      ...this.cartItem,
      purchaseDate: typeof this.cartItem.purchaseDate === 'string' 
        ? this.cartItem.purchaseDate 
        : this.cartItem.purchaseDate.toISOString()
    };
  
    this.cartService.addCartItemToAccount(this.accountId, payload).subscribe({
      next: () => this.router.navigate(['/accounts', this.accountId, 'carts']),
      error: (err) => console.error('Error adding cart item:', err)
    });
  }
}
