import { Component, AfterViewInit, EventEmitter } from '@angular/core';
import { switchMap, combineLatest, pluck, map } from 'rxjs/operators';

import { PlaylistsService } from '../../services/playlists.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'shuf-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss']
})
export class PlaylistPageComponent implements AfterViewInit {

  fetchPlaylist = new EventEmitter();
  addSongEventEmitter = new EventEmitter();

  playlist = this.fetchPlaylist
    .asObservable()
    .pipe(switchMap((playlistId) => this.playlistsService.get(playlistId)));

  playlistId = this.route.paramMap
    .pipe(
      pluck('params', 'playlistId'),
      map((playlistId: any) => parseInt(playlistId))
    );

  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly route: ActivatedRoute
  ) {
    this.addSongEventEmitter.asObservable()
      .pipe(
        combineLatest(this.playlistId),
        switchMap(([song, playlistId]) => this.playlistsService.addSong(playlistId, song))
      )
      .subscribe(song => this.fetchPlaylist.emit(song.playlistId));
   }

  ngAfterViewInit(): void {
    this.playlistId
      .subscribe(playlistId => {
        this.fetchPlaylist.emit(playlistId);
      });
  }

  addSong(song) {
    this.addSongEventEmitter.emit(song);
  }
}
