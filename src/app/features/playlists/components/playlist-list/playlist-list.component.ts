import { Component, Input } from '@angular/core';

@Component({
  selector: 'shuf-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent {

  @Input() name;
}
