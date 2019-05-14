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

  addGenre(playlistId: number, genre): Observable<any> {
    return this
      .http
      .post(`/api/playlists/${playlistId}/genres`, {playlistId, availableGenresId: genre.id, name: genre.name});
  }

  getAll(): Observable<any> {
    return this
      .http
      .get('/api/playlists');
  }

  filter(q: string): Observable<any> {
    return this
      .http
      .get('/api/playlists?q=' + q);
  }

  get(playlistId): Observable<any> {
    return this
      .http
      .get(`/api/playlists/${playlistId}`);
  }

  getAllGenres(q): Observable<any> {
    return this
      .http
      .get('api/availableGenres?q=' + q);
  }

  getPlaylistGenres(playlistId): Observable<any> {
    return this
      .http
      .get(`api/playlists/${playlistId}/genres`);
  }

  removeGenre(genre): Observable<any> {
    return this
      .http
      .delete(`api/genres/${genre.id}`);
  }

  removeSong(songId): Observable<any> {
    return this
      .http
      .delete(`api/songs/${songId}`);
  }
}
