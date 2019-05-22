import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shuf-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent {

  @Input() songs;

  @Output() removeSong = new EventEmitter<number>();

  remove(song) {
    this.removeSong.emit(song.id);
  }
}
