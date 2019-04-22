import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistPageComponent } from './components/playlist-page/playlist-page.component';
import { NewPlaylistPageComponent } from './components/new-playlist-page/new-playlist-page.component';
import { PlaylistsPageComponent } from './components/playlists-page/playlists-page.component';

const routes: Routes = [{
  path: '', component: PlaylistsPageComponent
},
{
  path: 'new', component: NewPlaylistPageComponent
},
{
  path: ':playlistId', component: PlaylistPageComponent
},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
