import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Type } from '../type';
import { Movie } from '../movie';
import { TypeService } from '../type.service';
import { MovieService } from '../movie.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-type-movies-management',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule, RouterModule],
  templateUrl: './type-movies-management.component.html',
  styleUrl: './type-movies-management.component.css'
})
export class TypeMoviesManagementComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'director', 'year', 'actions'];
  type: Type | null = null;
  isLoading = true;
  @Input() movies: Movie[] = [];
  @Output() deleteMovie = new EventEmitter<number>();
  isDeleting = false;
  currentDeletingId?: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private typeService: TypeService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const typeId = +this.route.snapshot.params['id'];
    this.loadTypeDetails(typeId);
  }

  loadTypeDetails(typeId: number): void {
    this.typeService.getTypeWithMovies(typeId).subscribe({
      next: (type) => {
        this.type = type;
        this.movies = type.movies || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading type details:', err);
        this.isLoading = false;
      }
    });
  }

  onDeleteMovie(movieId: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.isDeleting = true;
      this.currentDeletingId = movieId;
      
      this.movieService.deleteMovie(movieId).subscribe({
        next: () => {
          this.deleteMovie.emit(movieId);
          this.isDeleting = false;
          this.currentDeletingId = undefined;
        },
        error: (err) => {
          console.error('Error deleting movie:', err);
          this.isDeleting = false;
          this.currentDeletingId = undefined;
        }
      });
    }
  }

  addNewMovie(): void {
    this.router.navigate(['/movies/add'], { 
      queryParams: { typeId: this.type?.typeID } 
    });
  }

}
