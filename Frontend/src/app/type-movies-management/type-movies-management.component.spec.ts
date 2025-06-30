import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMoviesManagementComponent } from './type-movies-management.component';

describe('TypeMoviesManagementComponent', () => {
  let component: TypeMoviesManagementComponent;
  let fixture: ComponentFixture<TypeMoviesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeMoviesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeMoviesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
