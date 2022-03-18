import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubInsertComponent } from './club-insert.component';

describe('ClubInsertComponent', () => {
  let component: ClubInsertComponent;
  let fixture: ComponentFixture<ClubInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
