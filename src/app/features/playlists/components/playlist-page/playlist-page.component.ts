import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shuf-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss']
})
export class PlaylistPageComponent implements OnInit {

  songs: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  add(song) {
    this.songs = [{title: song, author: '30 Seconds to Mars'}, ...this.songs];
  }
}
