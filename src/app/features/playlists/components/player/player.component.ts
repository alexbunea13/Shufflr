import { Component, OnInit, Input, NgZone, Output, EventEmitter } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'shuf-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  @Input() isPlaying;
  @Input() youtubeId;
  @Output() next = new EventEmitter<number>();
  @Output() previous = new EventEmitter<number>();
  @Input() channelTitle;
  @Input() title;
  @Input() thumbnail;


  player: YT.Player;
  progress: Observable<number>;

  constructor(
    private readonly ngZone: NgZone
  ) { }

  changeSong(index: number) {
    if (index === 1) {
      this.next.emit(index);
    } else {
      this.previous.emit(index);
    }
  }

  togglePlayer() {
    if (this.isPlaying) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }
  }

  playerHasLoaded(player: YT.Player) {
    this.player = player;
    this.progress = interval(500).pipe(
      filter(() => {
        return this.player.getDuration() !== 0;
      }),
      map(() => this.player.getCurrentTime() / this.player.getDuration() * 100)
    );

    player.addEventListener('onStateChange', (event: any) => {
      this.ngZone.run(() => {
        if (event.data === 0) {
          this.changeSong(1);
        }
        if (event.data === 1) {
          this.isPlaying = true;
        }
        if (event.data === 2) {
          this.isPlaying = false;
        }
      });
     });
  }
}
