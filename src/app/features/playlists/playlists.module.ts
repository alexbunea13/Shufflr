import { NgModule } from '@angular/core';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistPageComponent } from '../playlists/components/playlist-page/playlist-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlaylistsService } from './services/playlists.service';
import { SongListComponent } from '../playlists/components/song-list/song-list.component';
import { NewPlaylistPageComponent } from './components/new-playlist-page/new-playlist-page.component';
import { PlaylistsPageComponent } from './components/playlists-page/playlists-page.component';
import { PlaylistListComponent } from './components/playlist-list/playlist-list.component';
import { PlaylistPlayerPageComponent } from './components/playlist-player-page/playlist-player-page.component';

@NgModule({
  declarations: [PlaylistPageComponent, SongListComponent, NewPlaylistPageComponent,
     PlaylistsPageComponent, PlaylistListComponent, PlaylistPlayerPageComponent],
  imports: [
    SharedModule,
    PlaylistsRoutingModule
  ],
  providers: [PlaylistsService]
})
export class PlaylistsModule { }
