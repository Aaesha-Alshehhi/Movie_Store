import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRatingComponent } from './edit-rating.component';

describe('EditRatingComponent', () => {
  let component: EditRatingComponent;
  let fixture: ComponentFixture<EditRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
