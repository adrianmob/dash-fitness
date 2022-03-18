import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachInsertComponent } from './coach-insert.component';

describe('CoachInsertComponent', () => {
  let component: CoachInsertComponent;
  let fixture: ComponentFixture<CoachInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
