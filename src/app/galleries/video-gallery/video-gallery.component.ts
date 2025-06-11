import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';
import { VideoDTO } from '../../models/videoDTO';
import { VideosService } from '../../services/videos.service';

@Component({
  selector: 'app-video-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-gallery.component.html',
  styleUrl: './video-gallery.component.css'
})
export class VideoGalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('grid', { static: false }) grid!: ElementRef;
  videos: VideoDTO[] = [];
  private masonry!: Masonry;

  constructor(private videosService: VideosService) {}

  ngOnInit(): void {
    this.videosService.getAllVideos().subscribe(data => {
      this.videos = data;

      setTimeout(() => {
        this.initMasonry();
      }, 0);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      import('fslightbox');
    }, 0);
  }

  initMasonry(): void {
    if (!this.grid) return;

    this.shuffleGridItems();

    imagesLoaded(this.grid.nativeElement, () => {
      if (this.masonry) this.masonry.destroy();

      this.masonry = new Masonry(this.grid.nativeElement, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
      });

      this.masonry.layout();
    });
  }

  layoutMasonry() {
    if (this.masonry) {
      this.masonry.layout();
    }
  }

  getVideoClasses(video: VideoDTO): string {
    const baseClasses = ['grid-item'];

    if (video.showPreview === true) {
      return [...baseClasses, video.format].join(' ');
    } else {
      return baseClasses.join(' ');
    }
    
  }

  onVideoLoaded(videoElement: HTMLVideoElement): void {
    videoElement.muted = true;
    videoElement.play();
    this.layoutMasonry();
  }

  shuffleGridItems(): void {
    if (!this.grid) return;
  
    const container = this.grid.nativeElement;
    const items = Array.from(container.querySelectorAll('.grid-item'));
  
    const shuffled = items
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    shuffled.forEach(el => container.appendChild(el));
  }
  
}
