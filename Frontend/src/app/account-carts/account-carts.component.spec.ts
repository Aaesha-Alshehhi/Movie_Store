import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCartsComponent } from './account-carts.component';

describe('AccountCartsComponent', () => {
  let component: AccountCartsComponent;
  let fixture: ComponentFixture<AccountCartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
