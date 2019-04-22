import { Component, EventEmitter, AfterViewInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { PlaylistsService } from '../../services/playlists.service';

@Component({
  selector: 'shuf-playlists-page',
  templateUrl: './playlists-page.component.html',
  styleUrls: ['./playlists-page.component.scss']
})
export class PlaylistsPageComponent implements AfterViewInit {

  fetchPlaylists = new EventEmitter();

  playlists = this.fetchPlaylists
  .asObservable()
  .pipe(switchMap(() => this.playlistsService.getAll()));

  constructor(
    private readonly playlistsService: PlaylistsService
  ) {}

  ngAfterViewInit(): void {
    this.fetchPlaylists.emit();
  }
}
