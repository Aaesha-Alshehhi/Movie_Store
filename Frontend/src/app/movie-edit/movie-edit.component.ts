import { Component, OnInit } from '@angular/core';
import { Type } from '../type';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { TypeService } from '../type.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent implements OnInit{
  movieForm: FormGroup;
  movieId: number;
  types: Type[] = [];
  currentTypeId?: number;
  currentYear = new Date().getFullYear()

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private typeService: TypeService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      publicationYear: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      director: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      coverPhoto: ['']
    });
    this.movieId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadTypes();
    this.loadMovieData();
  }

  loadTypes(): void {
    this.typeService.getAllTypes().subscribe(types => {
      this.types = types;
    });
  }

  loadMovieData(): void {
    this.movieService.getMovieById(this.movieId).subscribe({
      next: (movie) => {
        this.currentTypeId = movie.type?.typeID;
        this.movieForm.patchValue({
          name: movie.name,
          description: movie.description,
          publicationYear: movie.publicationYear,
          director: movie.director,
          price: movie.price,
          coverPhoto: movie.coverPhoto
        });
      },
      error: (err) => {
        console.error('Error loading movie:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const movieData = this.movieForm.value;
      this.movieService.updateMovie(this.movieId, movieData).subscribe({
        next: () => {
          this.router.navigate(['/types', this.currentTypeId]);
        },
        error: (err) => {
          console.error('Error updating movie:', err);
        }
      });
    }
  }
}
