import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VideoDTO } from '../models/videoDTO';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http: HttpClient) { }

  getFavouriteVideos(): Observable<VideoDTO[]> {
    return this.http.get<VideoDTO[]>('assets/videos/videos.json').pipe(
      map(videos => videos.filter(video => video.isFavourite))
    );
  }

  getAllVideos(): Observable<VideoDTO[]> {
    return this.http.get<VideoDTO[]>('assets/videos/videos.json');
  }

}
