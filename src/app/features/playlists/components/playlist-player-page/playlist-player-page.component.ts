import { Component, AfterViewInit, EventEmitter } from '@angular/core';
import { switchMap, pluck, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { PlaylistsService } from '../../services/playlists.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'shuf-playlist-player-page',
  templateUrl: './playlist-player-page.component.html',
  styleUrls: ['./playlist-player-page.component.scss']
})
export class PlaylistPlayerPageComponent implements AfterViewInit {

  fetchPlaylist = new EventEmitter();
  playerLoaded = new EventEmitter<YT.Player>();
  selectedSong = new EventEmitter<string>();

  playlist = this.fetchPlaylist
    .asObservable()
    .pipe(
      switchMap((playlistId) => this.playlistsService.get(playlistId)),
      tap(playlist => this.changeSong(playlist.songs[0].youtubeId))
    );

  playlistId = this.route.paramMap
    .pipe(
      pluck('params', 'playlistId'),
      map((playlistId: any) => parseInt(playlistId))
    );

  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly route: ActivatedRoute
  ) { }

  ngAfterViewInit(): void {
    this.playlistId
      .subscribe(playlistId => {
        this.fetchPlaylist.emit(playlistId);
      });
    combineLatest(
      this.playerLoaded.asObservable(),
      this.selectedSong.asObservable()
    ).subscribe(
      ([player, videoId]) => player.loadVideoById(videoId)
    );
  }

  changeSong(youtubeId) {
    this.selectedSong.emit(youtubeId);
  }

  playerHasLoaded(player) {
    this.playerLoaded.emit(player);
  }
}
