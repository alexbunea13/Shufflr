import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shuf-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements AfterViewInit {

  constructor(
    private router: Router
  ) {}

  ngAfterViewInit() {
  }

  search(searchedText) {
    this.router.navigate(['playlists'], {queryParams: {q: searchedText}});
  }
}
