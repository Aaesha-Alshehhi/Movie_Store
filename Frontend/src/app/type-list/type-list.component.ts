import { Component, OnInit } from '@angular/core';
import { Type } from '../type';
import { TypeService } from '../type.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-type-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './type-list.component.html',
  styleUrl: './type-list.component.css'
})
export class TypeListComponent implements OnInit{
  types: Type[] = [];
  isLoading = true;

  constructor(
    private typeService: TypeService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadTypes();
  }

  loadTypes(): void {
    this.typeService.getAllTypes().subscribe({
      next: (types) => {
        this.types = types;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading types:', err);
        this.isLoading = false;
      }
    });
  }

  deleteType(id: number): void {
    if (confirm('Are you sure you want to delete this type?')) {
      this.typeService.deleteType(id).subscribe({
        next: () => {
          this.types = this.types.filter(t => t.typeID !== id);
        },
        error: (err) => {
          console.error('Error deleting type:', err);
        }
      });
    }
  }

  viewTypeDetails(typeId: number): void {
    this.router.navigate(['/types', typeId]);
  }
}
