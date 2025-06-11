import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudArrowDown, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';
import { ImageDTO } from '../../models/imageDTO';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit, AfterViewInit {
  @ViewChild('grid', { static: false }) grid!: ElementRef;
  @ViewChildren('gridItem') gridItems!: QueryList<ElementRef>;

  images: ImageDTO[] = [];
  category: string | null = null;
  private masonry!: Masonry;

  faHeart = faHeart;
  faCloundArrowDown = faCloudArrowDown;
  faEye = faEye;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private imagesService: ImagesService
  ) {}

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.paramMap.get('category');

    if (this.category) {
      this.imagesService.getImagesByTag(this.category).subscribe((data) => {
        this.images = data;

        setTimeout(() => {
          this.initMasonry();
        }, 0);
      });
    }
  }

  ngAfterViewInit(): void {
    this.gridItems.changes.subscribe(() => {
      this.initMasonry();

      setTimeout(() => {
        import('fslightbox');
      }, 0);
    });
  }

  initMasonry(): void {
    if (!this.grid) return;

    imagesLoaded(this.grid.nativeElement, () => {
      if (this.masonry) {
        this.masonry.destroy();
      }

      this.masonry = new Masonry(this.grid.nativeElement, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
      });

      this.masonry.layout();
    });
  }

  getImageClasses(image: ImageDTO): string {
    return ['grid-item', image.format].join(' ');
  }

}
