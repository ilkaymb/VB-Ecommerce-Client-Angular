import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUpdatePageComponent } from './product-update-page.component';

describe('ProductUpdatePageComponent', () => {
  let component: ProductUpdatePageComponent;
  let fixture: ComponentFixture<ProductUpdatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductUpdatePageComponent]
    });
    fixture = TestBed.createComponent(ProductUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
