import { NgModule } from '@angular/core';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistPageComponent } from '../playlists/components/playlist-page/playlist-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlaylistsService } from './services/playlists.service';

@NgModule({
  declarations: [PlaylistPageComponent],
  imports: [
    SharedModule,
    PlaylistsRoutingModule
  ],
  providers: [PlaylistsService]
})
export class PlaylistsModule { }
