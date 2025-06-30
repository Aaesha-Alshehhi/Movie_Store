import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Movie } from './movie';
import { CartItem } from './cart';
import { Rating } from './rating';
import { Type } from './type';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) { }

  // Existing methods
  getAllMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/movies`);
  }

  // New methods for catalog
  getMoviesWithTypesAndRatings(): Observable<any[]> {
    return forkJoin([
      this.http.get<any[]>(`${this.apiUrl}/movies`),
      this.http.get<any[]>(`${this.apiUrl}/types`),
      this.http.get<any[]>(`${this.apiUrl}/ratings`)
    ]).pipe(
      map(([movies, types, ratings]) => {
        // Create a map of movies by ID for quick lookup
        const movieMap = new Map<number, any>();
        movies.forEach(movie => {
          movieMap.set(movie.movieID, { ...movie, type: null });
        });
  
        // Assign types to movies
        types.forEach(type => {
          type.movies.forEach((movie: any) => {
            if (movieMap.has(movie.movieID)) {
              movieMap.get(movie.movieID).type = {
                typeID: type.typeID,
                typeName: type.typeName
              };
            }
          });
        });
  
        // Calculate average ratings
        return Array.from(movieMap.values()).map(movie => {
          const movieRatings = ratings.filter(r => r.movie?.movieID === movie.movieID);
          const avgRating = movieRatings.length ? 
            movieRatings.reduce((sum, r) => sum + r.rate, 0) / movieRatings.length : 0;
          return { ...movie, averageRating: avgRating };
        });
      })
    );
  }

  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/types`);
  }

  searchMovies(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/movies?q=${query}`);
  }
  
  changeMovieType(movieId: number, typeId: number): Observable<Movie> {
    return this.http.put<Movie>(
      `${this.apiUrl}/movie/${movieId}/type/${typeId}`,
      {}
    );
  }

  addToCart(cartId: number, movieId: number) {
    return this.http.post<CartItem>(`${this.apiUrl}/cartitem/${cartId}/movie/${movieId}`, {});
  }
  
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cartitems`);
  }

  updateCartItem(cartId: number, value: any): Observable<Object>{
    return this.http.put(this.apiUrl  +'/cartitem/'+cartId,value);
  }

  addMovieToCart(movieId: number): Observable<CartItem> {
    return this.http.post<CartItem>(`http://localhost:8085/movie/cartitem/${movieId}`, {});
  }

  getMovieWithRatings(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${movieId}`);
  }
  
  getMovieRatings(movieId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/movies/${movieId}/ratings`);
  }

  addRatingToMovie(movieId: number, rating: Omit<Rating, 'ratingID' | 'ratingDate' | 'movie'>): Observable<Rating> {
    return this.http.post<Rating>(
      `${this.apiUrl}/movies/${movieId}/ratings`,
      rating
    );
  }

  updateRating(ratingId: number, ratingData: Partial<Rating>): Observable<Rating> {
    return this.http.put<Rating>(
      `${this.apiUrl}/ratings/${ratingId}`,
      ratingData
    );
  }
  
  deleteRating(ratingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ratings/${ratingId}`);
  }

  getRatingById(ratingId: number): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiUrl}/ratings/${ratingId}`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}`);
  }

  addMovieToType(typeId: number, movie: Movie): Observable<Type> {
    return this.http.post<Type>(`${this.apiUrl}/type/add/${typeId}`, movie);
  }
  
  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/movie/${id}`, movie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/movie/${id}`);
  }
  
}
