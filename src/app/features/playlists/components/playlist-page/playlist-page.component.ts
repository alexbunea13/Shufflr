import { Component, AfterViewInit, EventEmitter } from '@angular/core';
import { switchMap, combineLatest, pluck, map, debounceTime, tap } from 'rxjs/operators';

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
  removeSongEventEmitter = new EventEmitter();
  searchSongEventEmitter = new EventEmitter();
  searchGenreEventEmitter = new EventEmitter();
  addGenreEventEmitter = new EventEmitter();
  deleteGenreEventEmitter = new EventEmitter();

  playlist = this.fetchPlaylist
    .asObservable()
    .pipe(switchMap((playlistId) => this.playlistsService.get(playlistId)));

  playlistId = this.route.paramMap
    .pipe(
      pluck('params', 'playlistId'),
      map((playlistId: any) => parseInt(playlistId))
    );

  matchingSongs: Observable<any[]>;
  matchingGenres: Observable<any[]>;

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

    this.addGenreEventEmitter.asObservable()
      .pipe(
        combineLatest(this.playlistId),
        switchMap(([genre, playlistId]) => this.playlistsService.addGenre(playlistId, genre))
      )
      .subscribe(genre => this.fetchPlaylist.emit(genre.playlistId));

    this.deleteGenreEventEmitter.asObservable()
      .pipe(
        combineLatest(this.playlistId),
        switchMap(([genre]) => this.playlistsService.removeGenre(genre)),
      )
      .subscribe(() => this.playlistId
        .subscribe(id => this.fetchPlaylist.emit(id)));

    this.removeSongEventEmitter.asObservable()
      .pipe(
        combineLatest(this.playlistId),
        switchMap(([songId]) => this.playlistsService.removeSong(songId))
      )
      .subscribe(() => this.playlistId
        .subscribe(id => this.fetchPlaylist.emit(id)));
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
    this.matchingGenres = this.searchGenreEventEmitter.asObservable()
      .pipe(
        debounceTime(500),
        switchMap(newGenre => this.playlistsService.getAllGenres(newGenre))
      );
  }

  addSong(song, searchSongControl: NgControl) {
    this.addSongEventEmitter.emit(song);
    searchSongControl.reset();
  }

  addGenre(genre, searchGenreControl: NgControl) {
    this.addGenreEventEmitter.emit(genre);
    searchGenreControl.reset();
  }

  removeGenre(genre) {
    this.deleteGenreEventEmitter.emit(genre);
  }

  searchSong(newTitle) {
    this.searchSongEventEmitter.emit(newTitle);
  }

  searchGenre(newGenre) {
    if ((newGenre !== null) && (typeof newGenre !== 'object')) {
      this.searchGenreEventEmitter.emit(newGenre);
    }
  }

  isIncluded(songs, id): boolean {
    return songs.some(song => song.youtubeId === id);
  }

  tagIsIncluded(genres, id): boolean {
    return genres.some(genre => genre.availableGenresId === id);
  }

  reset(chipList) {
    chipList._chipInput._inputElement.value = '';
  }

  removeSong(songId) {
    this.removeSongEventEmitter.emit(songId);
  }
}
