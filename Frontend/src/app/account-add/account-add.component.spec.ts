import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddComponent } from './account-add.component';

describe('AccountAddComponent', () => {
  let component: AccountAddComponent;
  let fixture: ComponentFixture<AccountAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
