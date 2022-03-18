import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoInsertComponent } from './video-insert.component';

describe('VideoInsertComponent', () => {
  let component: VideoInsertComponent;
  let fixture: ComponentFixture<VideoInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
