import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GifDTO } from '../models/gifDTO';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) { }

  getAllVideos(): Observable<GifDTO[]> {
      return this.http.get<GifDTO[]>('assets/gifs/gifs.json');
    }
}
