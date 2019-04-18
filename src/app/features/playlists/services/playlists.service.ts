import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  constructor(private readonly http: HttpClient) { }

  add(playlist): Observable<any> {
    return this
    .http
    .post('/api/playlists', playlist);
  }

  addSong(playlistId, song): Observable<any> {
    return this
    .http
    .post(`/api/playlists/${playlistId}/songs`, {playlistId, ...song});
  }

  getAll(): Observable<any> {
    return this
      .http
      .get('/api/playlists');
  }

  get(playlistId): Observable<any> {
    return this
      .http
      .get(`/api/playlists/${playlistId}`);
  }
}
