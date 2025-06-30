import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rating } from '../rating';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-rating.component.html',
  styleUrl: './add-rating.component.css'
})
export class AddRatingComponent implements OnInit{
  movieId!: number;
  movie: any;
  rating: Rating = {
    rate: 5,  // Default value
    comment: '' // Empty string by default
  };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieId = +this.route.snapshot.params['id'];
    this.loadMovie();
  }

  loadMovie(): void {
    this.movieService.getMovieWithRatings(this.movieId).subscribe(movie => {
      this.movie = movie;
    });
  }

  onSubmit(): void {
    // No need for separate payload - rating is already properly typed
    this.movieService.addRatingToMovie(this.movieId, this.rating).subscribe({
      next: () => this.router.navigate(['/movies', this.movieId, 'ratings']),
      error: (err) => console.error('Error adding rating:', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/movies', this.movieId, 'ratings']);
  }
}
