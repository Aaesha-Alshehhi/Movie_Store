import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { forkJoin } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { CartItem } from '../cart';

@Component({
  selector: 'app-list-movie',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './list-movie.component.html',
  styleUrl: './list-movie.component.css'
})
export class ListMovieComponent implements OnInit{
  movies: any[] = [];
  filteredMovies: any[] = [];
  types: any[] = [];
  selectedType: string = '';
  searchQuery: string = '';
  isLoading: boolean = true;
  cartItems: CartItem[] = [];

  constructor(private movieService: MovieService, public router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.isLoading = true;
    
    this.movieService.getMoviesWithTypesAndRatings().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.filteredMovies = [...movies];
        this.isLoading = false;
        
        // Extract unique types from movies
        this.types = this.getUniqueTypesFromMovies(movies);
        console.log('Loaded movies with types:', movies);
      },
      error: (err) => {
        console.error('Error loading movies:', err);
        this.isLoading = false;
      }
    });
  }

  private getUniqueTypesFromMovies(movies: any[]): any[] {
    const typeMap = new Map<number, any>();
    movies.forEach(movie => {
      if (movie.type) {
        if (!typeMap.has(movie.type.typeID)) {
          typeMap.set(movie.type.typeID, movie.type);
        }
      }
    });
    return Array.from(typeMap.values());
    
  }

  filterMovies(): void {
    this.filteredMovies = this.movies.filter(movie => {
      // Check if we have a type filter
      if (this.selectedType) {
        // Find the type object that matches the selected type name
        const selectedTypeObj = this.types.find(t => t.typeName === this.selectedType);
        
        // If movie doesn't have a type or doesn't match, exclude it
        if (!movie.type || !selectedTypeObj || movie.type.typeID !== selectedTypeObj.typeID) {
          return false;
        }
      }
      
      // Check search filter
      if (this.searchQuery) {
        const searchTerm = this.searchQuery.toLowerCase();
        return movie.name.toLowerCase().includes(searchTerm) || 
               movie.director.toLowerCase().includes(searchTerm);
      }
      
      return true;
    });
  }

  onTypeChange(): void {
    this.filterMovies();
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredMovies = [...this.movies];
    } else {
      this.movieService.searchMovies(this.searchQuery).subscribe(movies => {
        this.filteredMovies = movies;
      });
    }
  }

  getUniqueTypes(): string[] {
    const types = new Set<string>();
    this.movies.forEach(movie => {
      if (movie.type?.typeName) {
        types.add(movie.type.typeName);
      }
    });
    return Array.from(types);
  }
  
  getImageUrl(coverPhoto: string): string {
    if (!coverPhoto) {
      return 'assets/images/movies/default-movie.jpg'; // Fallback image
    }
    
    // For images stored in assets
    if (coverPhoto.endsWith('.png') || coverPhoto.endsWith('.jpg') || coverPhoto.endsWith('.jpeg')) {
      return `assets/images/movies/${coverPhoto}`;
    }
    
    // For full URLs (if you switch to web images later)
    if (coverPhoto.startsWith('http')) {
      return coverPhoto;
    }
    
    return 'assets/images/movies/default-movie.jpg';
    
  }
  
  getSafeImage(coverPhoto: string): string {
    const imagePath = `assets/images/movies/${coverPhoto}`;
    console.log('Trying to load image from:', imagePath); // Debug line
    return imagePath;
  }
  
  // Add this error handler
  handleImageError(event: Event) {
    console.error('Image failed to load:', (event.target as HTMLImageElement).src);
    (event.target as HTMLImageElement).src = 'assets/images/movies/default-movie.jpg';
  }

  addMovieToCart(movieId: number) {
    this.cartService.addMovieToCart(movieId).subscribe(cartItem => {
      console.log('Movie added to cart:', cartItem);
      this.cartItems.push(cartItem);
    }, error => {
      console.error('Error adding movie to cart:', error);
    });
  }


  viewRatings(movieId: number) {
    this.router.navigate(['/movies', movieId, 'ratings']);
  }
  
}
