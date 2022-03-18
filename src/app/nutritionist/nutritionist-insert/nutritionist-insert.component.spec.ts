import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistInsertComponent } from './nutritionist-insert.component';

describe('NutritionistInsertComponent', () => {
  let component: NutritionistInsertComponent;
  let fixture: ComponentFixture<NutritionistInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionistInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionistInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
