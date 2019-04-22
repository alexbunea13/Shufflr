import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlaylistPageComponent } from './new-playlist-page.component';

describe('NewPlaylistPageComponent', () => {
  let component: NewPlaylistPageComponent;
  let fixture: ComponentFixture<NewPlaylistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlaylistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlaylistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
