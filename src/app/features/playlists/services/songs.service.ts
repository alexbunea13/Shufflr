import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private readonly http: HttpClient) { }

  getAll(title): Observable<any> {
    let params = {
      part: 'id,snippet',
      maxResults: '10',
      order: 'relevance',
      q: title,
      type: 'video',
      videoCategoryId: '10',
      key: 'AIzaSyDsmBxcWOCJg6R_E1OLbkzVHmzSqtvvVnE'
    }
    let esc = encodeURIComponent;
    let query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    return this
      .http
      .get(`https://www.googleapis.com/youtube/v3/search?${query}`)
      .pipe(
        map((response: any) => response.items
          .map(video => (
            {
              title: video.snippet.title,
              youtubeId: video.id.videoId,
              thumbnail: video.snippet.thumbnails.medium.url,
              channelTitle: video.snippet.channelTitle
            })
          )
        ),
        catchError(error => this.fallbackGetAll(title))
      );
  }

  private fallbackGetAll(title): Observable<any> {
    return this.http.get('/api/test')
      .pipe(
        map((response: any) => response.items
          .map(video => (
            {
              title: video.snippet.title,
              youtubeId: video.id.videoId,
              thumbnail: video.snippet.thumbnails.medium.url,
              channelTitle: video.snippet.channelTitle
            }))));
  }
}
