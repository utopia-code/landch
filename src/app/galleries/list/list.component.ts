import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import imagesLoaded from 'imagesloaded';
import Isotope from 'isotope-layout';
import { forkJoin } from 'rxjs';
import { GifDTO } from '../../models/gifDTO';
import { ImageDTO } from '../../models/imageDTO';
import { VideoDTO } from '../../models/videoDTO';
import { GifsService } from '../../services/gifs.service';
import { ImagesService } from '../../services/images.service';
import { VideosService } from '../../services/videos.service';

type MediaItem = (ImageDTO | VideoDTO | GifDTO) & { type: 'image' | 'video' | 'gif' };

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild('grid', { static: false }) grid!: ElementRef;
  private iso!: Isotope;

  mediaItems: MediaItem[] = [];

  categories = [
    { tag: 'pre-ceremonia', label: 'María Pita' },
    { tag: 'ceremonia', label: 'Ceremonia' },
    { tag: 'firmas', label: 'Firmas' },
    { tag: 'just-married', label: 'Recién casados' },
    { tag: 'gaiteiro', label: 'Gaiteiro' },
    // { tag: 'deco', label: 'Deco' },
    { tag: 'garden', label: 'Xaz' },
    { tag: 'photocall', label: 'Photocall' },
    { tag: 'salon', label: 'Salón' },
    { tag: 'party', label: 'Baile' },
    { tag: 'photomaton', label: 'Photomaton' },
  ];

  activeCategoryTag: string = 'pre-ceremonia';

  constructor(
    private router: Router,
    private imagesService: ImagesService,
    private videosService: VideosService,
    private gifsService: GifsService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadMediaItems();
    
  }

  loadMediaItems(): void {
    forkJoin({
      images: this.imagesService.getFavouriteImages(),
      videos: this.videosService.getFavouriteVideos(),
      gifs: this.gifsService.getAllVideos()
    }).subscribe(({ images, videos, gifs }) => {
      const imageItems: MediaItem[] = images.map(img => ({ ...img, type: 'image' }));
      const videoItems: MediaItem[] = videos.map(video => ({ ...video, type: 'video' }));
      const gifItems: MediaItem[] = gifs.map(gif => ({ ...gif, type: 'gif' }));
  
      this.mediaItems = [...imageItems, ...videoItems, ...gifItems];
  
      setTimeout(() => {
        this.initIsotope(() => {
          this.filterByTag('.pre-ceremonia');
          // this.initIsotopeAfterVideosLoad();
        })
      }, 0);
    });
  }

  getMediaClasses(item: MediaItem): string {
    const baseClasses = ['grid-item'];
  
    if (item.type === 'image') {
      return [...baseClasses, ...(item.tags || []), item.format].join(' ');
    }
  
    if (item.type === 'video') {
      return [...baseClasses, ...(item.tags || []), item.format].join(' ');
    }

    if (item.type === 'gif') {
      return [...baseClasses, ...(item.tags || [])].join(' ');
    }
  
    return baseClasses.join(' ');
  }
  
  isImage(item: MediaItem): item is ImageDTO & { type: 'image' } {
    return item.type === 'image';
  }

  isVideo(item: MediaItem): item is VideoDTO & { type: 'video' } {
    return item.type === 'video';
  }

  isGif(item: MediaItem): item is GifDTO & { type: 'gif' } {
    return item.type === 'gif';
  }

  getImageClasses(image: ImageDTO): string {
    return ['grid-item', ...image.tags, image.format].join(' ');
  }

  getLinkClasses(link: string): string {
    return ['grid-item', link].join(' ');
  }

  initIsotope(callback?: () => void) {
    if(this.grid) {
      imagesLoaded(this.grid.nativeElement, () => {
        this.iso = new Isotope(this.grid.nativeElement, {
          itemSelector: '.grid-item',
          layoutMode: 'masonry',
          percentPosition: true,
          masonry: {
            columnWidth: '.grid-sizer',
            horizontalOrder: true
          }
        })

        if (callback) callback();
      })
    }
  }

  layoutIsotope() {
    if (this.iso) {
      requestAnimationFrame(() => {
        this.iso.layout();
      });
    }
  }
  

  filterByTag(filter: string) {
    this.activeCategoryTag = filter.replace('.', '');

    if (this.iso) {
      this.iso.arrange({ filter: filter });
      this.iso.arrange({ sortBy: 'random'})
    }
  }

  getProductByCategory(category: string | undefined): void {
    this.router.navigateByUrl(`gallery/${category}`);
  }

  onVideoLoaded(videoElement: HTMLVideoElement): void {
    videoElement.muted = true;
    videoElement.play();
    this.layoutIsotope();
  }
  
}
