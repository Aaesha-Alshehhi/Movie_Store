import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAddComponent } from './type-add.component';

describe('TypeAddComponent', () => {
  let component: TypeAddComponent;
  let fixture: ComponentFixture<TypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
