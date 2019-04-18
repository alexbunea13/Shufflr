import { Component, Input } from '@angular/core';

@Component({
  selector: 'shuf-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent {

  @Input() songs;
}
