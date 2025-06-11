import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListComponent } from '../galleries/list/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,AfterViewInit{
  @ViewChildren('lazyVideo') lazyVideos!: QueryList<ElementRef<HTMLVideoElement>>;

  listVisible = false;
  isMobile = false;

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    
    setTimeout(() => {
      this.listVisible = true;
    }, 3000);
  }

  ngAfterViewInit() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            if (video.readyState >= 3) {
              video.play().catch(err => {
                console.warn('Unable to play automatically:', err);
              });
            } else {
              const onCanPlay = () => {
                video.play().catch(err => {
                  console.warn('Unable to play automatically:', err);
                });
                video.removeEventListener('canplaythrough', onCanPlay);
              };
              video.addEventListener('canplaythrough', onCanPlay);
              video.load();
            }
          } else {
            video.pause();
          }
        });
      }, {
        threshold: 0.1,
      });

      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          this.lazyVideos.forEach(videoRef => {
            observer.observe(videoRef.nativeElement);
          });
        });
      } else {
        
        setTimeout(() => {
          this.lazyVideos.forEach(videoRef => {
            observer.observe(videoRef.nativeElement);
          });
        }, 200);
      }

    
    }
  }

}
