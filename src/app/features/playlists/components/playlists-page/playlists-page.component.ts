import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { PlaylistsService } from '../../services/playlists.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'shuf-playlists-page',
  templateUrl: './playlists-page.component.html',
  styleUrls: ['./playlists-page.component.scss']
})
export class PlaylistsPageComponent {

  playlists = this.activatedRoute.queryParamMap
    .pipe(
      switchMap(queryParams => this.playlistsService.filter(queryParams.get('q'))
      ));

  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }
}
