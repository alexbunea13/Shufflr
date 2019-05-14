import { Component, OnInit, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PlaylistsService } from '../../services/playlists.service';

@Component({
  selector: 'shuf-new-playlist-page',
  templateUrl: './new-playlist-page.component.html',
  styleUrls: ['./new-playlist-page.component.scss']
})
export class NewPlaylistPageComponent implements OnInit {

  addPlaylistEventEmitter = new EventEmitter();

  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly router: Router
  ) {
    this.addPlaylistEventEmitter.asObservable()
      .pipe(
        switchMap((playlistName => this.playlistsService.add(playlistName)))
      )
      .subscribe((playlist) => this.router.navigate([`playlists/${playlist.id}`]));
   }

  ngOnInit(): void {
  }

  add(playlistName) {
    this.addPlaylistEventEmitter.emit(playlistName);
  }
}
