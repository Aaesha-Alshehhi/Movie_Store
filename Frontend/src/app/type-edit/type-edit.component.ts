import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeService } from '../type.service';
import { Type } from '../type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './type-edit.component.html',
  styleUrl: './type-edit.component.css'
})
export class TypeEditComponent {
  typeForm: FormGroup;
  typeId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private typeService: TypeService
  ) {
    this.typeForm = this.fb.group({
      typeID: [0],
      typeName: ['', Validators.required]
    });
    this.typeId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadTypeData();
  }

  loadTypeData(): void {
    this.typeService.getTypeWithMovies(this.typeId).subscribe({
      next: (type) => {
        this.typeForm.patchValue({
          typeID: type.typeID,
          typeName: type.typeName
        });
      },
      error: (err) => {
        console.error('Error loading type:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.typeForm.valid) {
      const typeData: Type = this.typeForm.value;
      this.typeService.updateType(this.typeId, typeData).subscribe({
        next: () => {
          this.router.navigate(['/types']);
        },
        error: (err) => {
          console.error('Error updating type:', err);
        }
      });
    }
  }
}
