import { Component, AfterViewInit, Inject, NgModule, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlaylistsService } from '../../services/playlists.service';
import { FeedbackDirective } from '../../directives/feedback.directive';
import { tap } from 'rxjs/operators';

interface Song {
  playlistId: number;
  title: string;
  youtubeId: string;
  thumbnail: string;
  channelTitle: string;
  id: number;
}

interface Rating {
  playlistId: number;
  value: number;
  id: number;
}
interface Playlist {
  title: string;
  songs: Song[];
  ratings: Rating[];
}

@Component({
  selector: 'shuf-playlist-player-page',
  templateUrl: './playlist-player-page.component.html',
  styleUrls: ['./playlist-player-page.component.scss']
})
export class PlaylistPlayerPageComponent implements AfterViewInit {
  playlist: Playlist;
  isPlaying = true;
  playlistId: number;
  rating: number;
  @ViewChild(FeedbackDirective)
  feedback: FeedbackDirective;

  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly route: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.playlistId = parseInt(params.get('playlistId'));
        this.playlistsService
          .get(params.get('playlistId'))
          .subscribe(playlist => {
            this.playlist = playlist;
            this.updateRating();
          });
      });
  }

  addRating(index) {
    this.playlistsService.addRating(this.playlistId, index)
      .subscribe( () => {
        this.updateRating();
        this.closeFeedback();
      });
  }

  closeFeedback() {
    this.updateRating();
    this.feedback.hide();
  }

  updateRating() {
    this.playlistsService.getRatings(this.playlistId)
      .subscribe(ratings => {
        this.rating = ratings.reduce((rating, currentRating) => rating + currentRating.value, 0) / ratings.length || 0;
      });
  }
}
