import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInsertComponent } from './admin-insert.component';

describe('AdminInsertComponent', () => {
  let component: AdminInsertComponent;
  let fixture: ComponentFixture<AdminInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
