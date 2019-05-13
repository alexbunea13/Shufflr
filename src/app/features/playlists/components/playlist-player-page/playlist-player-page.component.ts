import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PlaylistsService } from '../../services/playlists.service';

interface Song {
  playlistId: number;
  title: string;
  youtubeId: string;
  thumbnail: string;
  channelTitle: string;
  id: number;
}

interface Playlist {
  title: string;
  songs: Song[];
}

@Component({
  selector: 'shuf-playlist-player-page',
  templateUrl: './playlist-player-page.component.html',
  styleUrls: ['./playlist-player-page.component.scss']
})
export class PlaylistPlayerPageComponent implements AfterViewInit {
  playlist: Playlist;
  isPlaying = true;

  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly route: ActivatedRoute,
  ) { }

  ngAfterViewInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.playlistsService
          .get(params.get('playlistId'))
          .subscribe(playlist => this.playlist = playlist);
      });
  }
}
