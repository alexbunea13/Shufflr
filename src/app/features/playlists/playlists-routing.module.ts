import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistPageComponent } from './components/playlist-page/playlist-page.component';
import { NewPlaylistComponent } from './components/new-playlist/new-playlist.component';

const routes: Routes = [{
  path: 'new', component: NewPlaylistComponent
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
