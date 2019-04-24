import { Component, AfterViewInit, EventEmitter } from '@angular/core';
import { switchMap, combineLatest, pluck, map, startWith, debounceTime } from 'rxjs/operators';

import { PlaylistsService } from '../../services/playlists.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'shuf-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss']
})
export class PlaylistPageComponent implements AfterViewInit {

  fetchPlaylist = new EventEmitter();
  addSongEventEmitter = new EventEmitter();
  autocompleteSongEmitter = new EventEmitter();
  checkSongAvailability = new EventEmitter();

  playlist = this.fetchPlaylist
    .asObservable()
    .pipe(switchMap((playlistId) => this.playlistsService.get(playlistId)));

  playlistId = this.route.paramMap
    .pipe(
      pluck('params', 'playlistId'),
      map((playlistId: any) => parseInt(playlistId))
    );

  filteredOptions: Observable<any[]>;

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
    this.filteredOptions = this.autocompleteSongEmitter.asObservable()
      .pipe(
        debounceTime(500),
        switchMap(newTitle => this.songsService.getAll(newTitle))
      );
  }

  addSong(song, searchedText) {
    this.addSongEventEmitter.emit(song);
    searchedText.reset();
  }

  titleChanged(newTitle) {
    this.autocompleteSongEmitter.emit(newTitle);
  }

  isIncluded(songs, id): boolean {
    return this.checkAvailability(songs, id);
  }

 private checkAvailability(songs, songId): boolean {
    let availability = false;
    songs.forEach( song => {
     if (song.youtubeId === songId) {
       availability = true;
      }
    });
    return availability;
  }
}
