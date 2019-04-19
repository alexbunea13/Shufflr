import { NgModule } from '@angular/core';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistPageComponent } from '../playlists/components/playlist-page/playlist-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlaylistsService } from './services/playlists.service';
import { SongListComponent } from '../playlists/components/song-list/song-list.component';
import { NewPlaylistComponent } from './components/new-playlist/new-playlist.component';

@NgModule({
  declarations: [PlaylistPageComponent, SongListComponent, NewPlaylistComponent],
  imports: [
    SharedModule,
    PlaylistsRoutingModule
  ],
  providers: [PlaylistsService]
})
export class PlaylistsModule { }
