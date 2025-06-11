import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ImageDTO } from '../models/imageDTO';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<ImageDTO[]> {
    return this.http.get<ImageDTO[]>('assets/images/images.json');
  }

  getFavouriteImages(): Observable<ImageDTO[]> {
    return this.http.get<ImageDTO[]>('assets/images/images.json').pipe(
      map(images => images.filter(image => image.isFavourite))
    );
  }

  getImagesByTag(tag: string): Observable<ImageDTO[]> {
    return this.http.get<ImageDTO[]>('assets/images/images.json').pipe(
      map(images => images.filter(image => image.tags.includes(tag)))
    )
  }
  

  getFilteredImages(
    tags: string[] = [],
    isFavourite?: boolean,
    format?: string
  ): Observable<ImageDTO[]> {
    return this.getAllImages().pipe(
      map(images => images.filter(img => {
        const matchesTags = tags.length === 0 || tags.every(tag => img.tags.includes(tag));
        const matchesFavourite = isFavourite === undefined || img.isFavourite === isFavourite;
        const matchesFormat = !format || img.format === format;
  
        return matchesTags && matchesFavourite && matchesFormat;
      }))
    );
  }

}
