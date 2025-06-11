import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  loading = true;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}


  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    
    // setTimeout(() => {
    //   this.listVisible = true;
    // }, 3000);
  }

  ngAfterViewInit() {
    const videoElements = this.lazyVideos.map(ref => ref.nativeElement);

    const loadPromises = videoElements.map(video => {
      return new Promise<void>((resolve) => {
        const onReady = () => {
          video.removeEventListener('canplaythrough', onReady);
          resolve();
        };
        if (video.readyState >= 3) {
          resolve();
        } else {
          video.addEventListener('canplaythrough', onReady);
          video.load();
        }
      });
    });

    Promise.all(loadPromises).then(() => {
      this.ngZone.run(() => {
        this.loading = false;
        setTimeout(() => {
          this.listVisible = true;
        }, 3000);
      });
    });
  }

  // ngAfterViewInit() {
  //   if ('IntersectionObserver' in window) {
  //     const observer = new IntersectionObserver((entries) => {
  //       entries.forEach(entry => {
  //         const video = entry.target as HTMLVideoElement;

  //         if (entry.isIntersecting) {
  //           if (video.readyState >= 3) {
  //             video.play().catch(err => {
  //               console.warn('Unable to play automatically:', err);
  //             });
  //           } else {
  //             const onCanPlay = () => {
  //               video.play().catch(err => {
  //                 console.warn('Unable to play automatically:', err);
  //               });
  //               video.removeEventListener('canplaythrough', onCanPlay);
  //             };
  //             video.addEventListener('canplaythrough', onCanPlay);
  //             video.load();
  //           }
  //         } else {
  //           video.pause();
  //         }
  //       });
  //     }, {
  //       threshold: 0.1,
  //     });

  //     const waitForVideos = () => {
  //       const videoElements = this.lazyVideos.map(v => v.nativeElement);
  //       const promises = videoElements.map(video => {
  //         return new Promise<void>((resolve) => {
  //           if (video.readyState >= 3) {
  //             resolve();
  //           } else {
  //             const onReady = () => {
  //               resolve();
  //               video.removeEventListener('canplaythrough', onReady);
  //             };
  //             video.addEventListener('canplaythrough', onReady);
  //             video.load();
  //           }
  //         });
  //       });

  //       // Promise.all(promises).then(() => {
  //       //   this.loading = false;
  //       //   this.lazyVideos.forEach(videoRef => observer.observe(videoRef.nativeElement));
  //       // });

  //       Promise.race([
  //         Promise.all(promises),
  //         new Promise<void>(resolve => setTimeout(resolve, 6000))
  //       ]).then(() => {
  //         this.loading = false;
        
  //         setTimeout(() => {
  //           this.ngZone.run(() => {
  //             this.listVisible = true;
  //             this.cdr.detectChanges();
  //           });
  //         }, 3000);
        
  //         this.lazyVideos.forEach(videoRef => observer.observe(videoRef.nativeElement));
  //       });
  //     };

  //     if ('requestIdleCallback' in window) {
  //       requestIdleCallback(waitForVideos);
  //     } else {
  //       setTimeout(waitForVideos, 200);
  //     }

    
  //   }
  // }

}
