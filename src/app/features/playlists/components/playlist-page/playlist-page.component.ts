import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shuf-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss']
})
export class PlaylistPageComponent implements OnInit {

  playlists: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  add(playlist) {
    this.playlists.push(playlist);
  }
}
