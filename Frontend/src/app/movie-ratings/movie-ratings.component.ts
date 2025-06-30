import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Rating } from '../rating';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-movie-ratings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-ratings.component.html',
  styleUrl: './movie-ratings.component.css'
})
export class MovieRatingsComponent implements OnInit{
  movie!: Movie;
  ratings: Rating[] = [];
  isLoading = true;
  calculatedAverage: number = 0;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id'];
    this.loadMovieData(movieId);
  }

  loadMovieData(movieId: number): void {
    forkJoin([
      this.movieService.getMovieWithRatings(movieId),
      this.movieService.getMovieRatings(movieId)
    ]).subscribe({
      next: ([movie, ratings]) => {
        this.movie = movie;
        this.ratings = ratings || []; // Handle potential null
        this.calculateAverageRating();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
      }
    });
  }

  calculateAverageRating(): void {
    if (this.ratings.length > 0) {
      const sum = this.ratings.reduce((total, rating) => total + rating.rate, 0);
      this.calculatedAverage = sum / this.ratings.length;
    }
  }

  addRating(): void {
    this.router.navigate(['/movies', this.movie.movieID, 'add-rating']);
  }
  
  goBack(): void {
    this.router.navigate(['/list-movies']);
  }

  editRating(rating: Rating): void {
    // Navigate to edit page or open modal
    this.router.navigate(['/movies', this.movie.movieID, 'ratings', rating.ratingID, 'edit']);
  }

  deleteRating(ratingID: number): void {
    if (confirm('Are you sure you want to delete this rating?')) {
      this.movieService.deleteRating(ratingID).subscribe({
        next: () => {
          // CORRECTED: Keep ratings where ID DOESN'T match
          this.ratings = this.ratings.filter(r => r.ratingID !== ratingID);
          this.calculateAverageRating();
        },
        error: (err) => {
          console.error('Error deleting rating:', err);
          alert('Failed to delete rating');
        }
      });
    }
  }

}