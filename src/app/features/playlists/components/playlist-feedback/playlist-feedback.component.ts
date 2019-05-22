import { Component, Input } from '@angular/core';

@Component({
  selector: 'shuf-playlist-feedback',
  templateUrl: './playlist-feedback.component.html',
  styleUrls: ['./playlist-feedback.component.scss']
})
export class PlaylistFeedbackComponent {

  @Input() playlistId;

  selectRating: (index: number) => void;

}
