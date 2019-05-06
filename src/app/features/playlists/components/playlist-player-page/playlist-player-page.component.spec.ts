import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistPlayerPageComponent } from './playlist-player-page.component';

describe('PlaylistPlayerPageComponent', () => {
  let component: PlaylistPlayerPageComponent;
  let fixture: ComponentFixture<PlaylistPlayerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistPlayerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistPlayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
