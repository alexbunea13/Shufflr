import { Component, AfterViewInit, EventEmitter } from '@angular/core';
import { switchMap, combineLatest, pluck, map, debounceTime } from 'rxjs/operators';

import { PlaylistsService } from '../../services/playlists.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SongsService } from '../../services/songs.service';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'shuf-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss']
})
export class PlaylistPageComponent implements AfterViewInit {

  fetchPlaylist = new EventEmitter();
  addSongEventEmitter = new EventEmitter();
  searchSongEventEmitter = new EventEmitter();

  playlist = this.fetchPlaylist
    .asObservable()
    .pipe(switchMap((playlistId) => this.playlistsService.get(playlistId)));

  playlistId = this.route.paramMap
    .pipe(
      pluck('params', 'playlistId'),
      map((playlistId: any) => parseInt(playlistId))
    );

    matchingSongs: Observable<any[]>;

  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly route: ActivatedRoute,
    private readonly songsService: SongsService
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
    this.matchingSongs = this.searchSongEventEmitter.asObservable()
      .pipe(
        debounceTime(500),
        switchMap(newTitle => this.songsService.getAll(newTitle))
      );
  }

  addSong(song, searchSongControl: NgControl) {
    this.addSongEventEmitter.emit(song);
    searchSongControl.reset();
  }

  searchSong(newTitle) {
    this.searchSongEventEmitter.emit(newTitle);
  }

  isIncluded(songs, id): boolean {
    return songs.some(song => song.youtubeId === id);
  }
}
