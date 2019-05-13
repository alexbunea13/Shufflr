import { Component, AfterViewInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlaylistsService } from 'src/app/features/playlists/services/playlists.service';

@Component({
  selector: 'shuf-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements AfterViewInit {

  searchedText: string;
  searchOptionsEventEmitter = new EventEmitter();
  matching: Observable<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly playlistService: PlaylistsService
  ) {
    this.activatedRoute.queryParamMap.subscribe(
      queryParams => this.searchedText = queryParams.get('q')
    );
  }

  ngAfterViewInit() {
    this.matching = this.searchOptionsEventEmitter.asObservable()
    .pipe(
      debounceTime(500),
      switchMap(() => this.playlistService.filter(this.searchedText))
    );
  }

  search(searchedText) {
    if (searchedText !== null) {
      this.router.navigate(['playlists'], {queryParams: {q: searchedText}});
    }
  }

  conditionalSearch(searchedText) {
    this.searchedText = searchedText;
    this.searchOptionsEventEmitter.emit();
    if (this.checkIfPlaylistsPage()) {
      this.search(searchedText);
    }
  }

  checkIfPlaylistsPage(): boolean {
    return this.router.url.includes('playlists?q=');
  }

  optionChoosed(playlistId, form){
    this.router.navigate(['playlists', playlistId, 'player']);
    form.reset();
  }
}
