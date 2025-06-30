import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeService } from '../type.service';
import { Router } from '@angular/router';
import { Type } from '../type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './type-add.component.html',
  styleUrl: './type-add.component.css'
})
export class TypeAddComponent {
  typeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private typeService: TypeService,
    public router: Router
  ) {
    this.typeForm = this.fb.group({
      typeName: ['', Validators.required],
      typeID: [0]
    });
  }

  onSubmit(): void {
    if (this.typeForm.valid) {
      this.typeService.createType(this.typeForm.value).subscribe({
        next: () => {
          this.router.navigate(['/types']);
        },
        error: (err) => {
          console.error('Error creating type:', err);
        }
      });
    }
  }
}
