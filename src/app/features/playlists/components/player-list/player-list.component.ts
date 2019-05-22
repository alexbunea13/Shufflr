import { Component, Input } from '@angular/core';

@Component({
  selector: 'shuf-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {

  @Input() playlist;
  @Input() isPlaying;
  @Input() isShuffling;

  changeSong(index: number) {
    const { songs, title } = this.playlist;
    if (this.isShuffling) {
      const randomNumber = (Math.floor(Math.random() * songs.length) + 1);
      this.playlist = { title, songs: this.randomizeArray(songs, 0, randomNumber) || songs };
    } else {
      this.playlist = { title, songs: [...songs.slice(index, songs.length), ...songs.slice(0, index)] };
    }
  }

  randomizeArray(songList, firstIndex, randomIndex) {
    return songList[firstIndex] && songList[randomIndex] && [
      ...songList.slice(0, firstIndex),
      songList[randomIndex],
      ...songList.slice(firstIndex + 1, randomIndex),
      songList[firstIndex],
      ...songList.slice(randomIndex + 1)
    ];
  }

  offsetSong(index: number, offset = 1) {
    const { songs: oldSongs, title } = this.playlist;
    const songs = [...oldSongs];
    const selected = songs[index];
    songs.splice(index, 1);
    songs.splice(offset, 0, selected);
    this.playlist = { title, songs };
  }

  shuffle() {
    if (this.isShuffling) {
      this.isShuffling = false;
    } else {
      const { songs, title } = this.playlist;
      this.playlist = { title, songs };
      this.playlist.songs = this.shuffleArray(this.playlist.songs);
      this.isShuffling = true;
    }
  }

  shuffleArray(arr) {
    let i;
    let j;
    let temp;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
}
