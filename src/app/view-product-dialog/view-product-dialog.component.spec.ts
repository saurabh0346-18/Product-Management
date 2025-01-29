import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductDialogComponent } from './view-product-dialog.component';

describe('ViewProductDialogComponent', () => {
  let component: ViewProductDialogComponent;
  let fixture: ComponentFixture<ViewProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProductDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
