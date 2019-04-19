import { Component, OnInit, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PlaylistsService } from '../../services/playlists.service';


@Component({
  selector: 'shuf-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.scss']
})
export class NewPlaylistComponent implements OnInit {

  addPlaylistEventEmitter = new EventEmitter();

  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly router: Router
  ) {
    this.addPlaylistEventEmitter.asObservable()
      .pipe(
        switchMap((playlistName => this.playlistsService.add(playlistName)))
        )
        .subscribe(() => this.router.navigate(['/playlists']));
   }

  ngOnInit(): void {
  }

  add(playlistName) {
    this.addPlaylistEventEmitter.emit(playlistName);
  }
}
