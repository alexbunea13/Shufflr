import { Component, OnInit, Input, NgZone } from '@angular/core';
import {moveItemInArray, CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'shuf-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {

  @Input() playlist;
  @Input() isPlaying;

  changeSong(index: number) {
    const {songs, title} = this.playlist;
    this.playlist = { title , songs: [...songs.slice(index, songs.length), ...songs.slice(0, index)]};
  }

  offsetSong(index: number , offset = 1) {
    const {songs: oldSongs, title} = this.playlist;
    const songs = [...oldSongs];
    const selected = songs[index];
    songs.splice(index, 1);
    songs.splice(offset, 0, selected);
    this.playlist = { title , songs };
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.playlist.songs, event.previousIndex, event.currentIndex);
  }
}
