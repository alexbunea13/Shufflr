import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistFeedbackComponent } from './playlist-feedback.component';

describe('PlaylistFeedbackComponent', () => {
  let component: PlaylistFeedbackComponent;
  let fixture: ComponentFixture<PlaylistFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
