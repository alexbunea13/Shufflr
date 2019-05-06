import { Component, AfterViewInit, EventEmitter } from '@angular/core';
import { switchMap, pluck, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { PlaylistsService } from '../../services/playlists.service';

@Component({
  selector: 'shuf-playlist-player-page',
  templateUrl: './playlist-player-page.component.html',
  styleUrls: ['./playlist-player-page.component.scss']
})
export class PlaylistPlayerPageComponent implements AfterViewInit {

  fetchPlaylist = new EventEmitter();

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
  ) { }

  ngAfterViewInit(): void {
    this.playlistId
      .subscribe(playlistId => {
        this.fetchPlaylist.emit(playlistId);
      });
  }
}
