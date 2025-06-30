import { Component } from '@angular/core';
import { Type } from '../type';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { TypeService } from '../type.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './movie-add.component.html',
  styleUrl: './movie-add.component.css'
})
export class MovieAddComponent {
  movieForm: FormGroup;
  types: Type[] = [];
  selectedTypeId?: number;
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

    this.loadTypes();
    this.checkForPreselectedType();
  }

  loadTypes(): void {
    this.typeService.getAllTypes().subscribe(types => {
      this.types = types;
    });
  }

  checkForPreselectedType(): void {
    this.route.queryParams.subscribe(params => {
      if (params['typeId']) {
        this.selectedTypeId = +params['typeId'];
      }
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid && this.selectedTypeId) {
      const movieData = this.movieForm.value;
      this.movieService.addMovieToType(this.selectedTypeId, movieData).subscribe({
        next: () => {
          this.router.navigate(['/types', this.selectedTypeId]);
        },
        error: (err) => {
          console.error('Error adding movie:', err);
        }
      });
    }
  }
}
