import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  

  constructor(private cartService: CartService) {}

  cartItems: CartItem[] = [];

ngOnInit() {
  this.cartService.getCartItems().subscribe((items) => {
    this.cartItems = items;
  });
}

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
    });
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.cartService.updateCartItem(item.cartID!, item).subscribe({
      next: () => {
        console.log('Quantity updated successfully');
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
      }
    });
  }
  
  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCartItem(item.cartID!, item).subscribe({
        next: () => {
          console.log('Quantity updated successfully');
        },
        error: (err) => {
          console.error('Error updating quantity:', err);
        }
      });
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.deleteCartItem(item.cartID!).subscribe(() => {
      this.cartItems = this.cartItems.filter(ci => ci.cartID !== item.cartID);
    });
  }

  addMovieToCart(movieId: number) {
    this.cartService.addMovieToCart(movieId).subscribe(cartItem => {
      console.log('Movie added to cart:', cartItem);
      this.cartItems.push(cartItem);
    });
  }
}
