import { Component, AfterViewInit, EventEmitter, NgZone } from '@angular/core';
import { switchMap, pluck, map, tap, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { PlaylistsService } from '../../services/playlists.service';
import { interval } from 'rxjs/internal/observable/interval';
import { Observable, of } from 'rxjs';

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
  player: YT.Player;
  progress: Observable<number>;

  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly route: ActivatedRoute,
    private readonly ngZone: NgZone
  ) { }

  ngAfterViewInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.playlistsService
          .get(params.get('playlistId'))
          .subscribe(playlist => this.playlist = playlist);
      });
  }

  changeSong(index: number) {
    const {songs, title} = this.playlist;
    this.playlist = { title , songs: [...songs.slice(index, songs.length), ...songs.slice(0, index)]};
  }

  playerHasLoaded(player: YT.Player) {
    this.player = player;
    this.progress = interval(500).pipe(
      filter(() => {
        return this.player.getDuration() !== 0;
      }),
      map(() => this.player.getCurrentTime() / this.player.getDuration() * 100)
    );

    player.addEventListener('onStateChange', (event: any) => {
      this.ngZone.run(() => {
        if (event.data === 0) {
          this.changeSong(1);
        }
        if (event.data === 1) {
          this.isPlaying = true;
        }
        if (event.data === 2) {
          this.isPlaying = false;
        }
      });
     });
  }

  togglePlayer() {
    if (this.isPlaying) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }
  }
}
