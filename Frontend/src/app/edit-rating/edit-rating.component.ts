import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from '../rating';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-edit-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-rating.component.html',
  styleUrl: './edit-rating.component.css'
})
export class EditRatingComponent implements OnInit{

  movieId!: number;
  ratingId!: number;
  movie: any;
  rating: Rating = {
    rate: 0,
    comment: ''
  };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieId = +this.route.snapshot.params['movieId'];
    this.ratingId = +this.route.snapshot.params['ratingId'];
    
    this.loadMovie();
    this.loadRating();
  }

  loadMovie(): void {
    this.movieService.getMovieWithRatings(this.movieId).subscribe(movie => {
      this.movie = movie;
    });
  }

  loadRating(): void {
    this.movieService.getRatingById(this.ratingId).subscribe({
      next: (rating) => {
        this.rating = {
          rate: rating.rate,
          comment: rating.comment
        };
      },
      error: (err) => {
        console.error('Error loading rating:', err);
        this.goBack();
      }
    });
  }

  onSubmit(): void {
    this.movieService.updateRating(this.ratingId, this.rating).subscribe({
      next: () => {
        this.router.navigate(['/movies', this.movieId, 'ratings']);
      },
      error: (err) => {
        console.error('Error updating rating:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/movies', this.movieId, 'ratings']);
  }
}
