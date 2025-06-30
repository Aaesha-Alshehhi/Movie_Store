import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { CartItem } from './cart';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  private apiUrl = 'http://localhost:8085'; // Update with your actual endpoint

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cartitems`);
  }

  

  addMovieToCart(movieId: number): Observable<CartItem> {
    return this.http.post<CartItem>(`http://localhost:8085/movie/cartitem/${movieId}`, {});
  }

  getAllCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cartitems`);
  }

  // Get single cart item by ID
  getCartItemById(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.apiUrl}/cartitem/${id}`);
  }

  // Add cart item to specific account
  addCartItemToAccount(accountId: number, cartData: any): Observable<CartItem> {
    const payload = {
      quantity: cartData.quantity,
      purchaseDate: cartData.purchaseDate,
      movie: {  // Send the full movie object
        movieID: cartData.movieID,
        name: cartData.movieName // Add other movie properties if needed
      }
    };
    
    return this.http.post<CartItem>(
      `${this.apiUrl}/accounts/${accountId}/cartitem`, 
      payload
    );
  }

  // Update existing cart item
  updateCartItem(id: number, cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(
      `${this.apiUrl}/cartitem/${id}`,
      {
        quantity: cartItem.quantity,
        purchaseDate: cartItem.purchaseDate
      }
    );
  }

  // Delete cart item
  deleteCartItem(id: number): Observable<CartItem> {
    return this.http.delete<CartItem>(`${this.apiUrl}/cartitem/${id}`);
  }

  getCartItemsByAccount(accountId: number): Observable<CartItem[]> {
    if (isNaN(accountId)) {
      return throwError(() => new Error('Invalid account ID'));
    }
    return this.http.get<CartItem[]>(`${this.apiUrl}/accounts/${accountId}/cartitems`);
  }
  
}
