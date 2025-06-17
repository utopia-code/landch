import { CommonModule, Location } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudArrowDown, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';
import { ImageDTO } from '../../models/imageDTO';
import { ImagesService } from '../../services/images.service';

declare var refreshFsLightbox: () => void;

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('grid', { static: false }) grid!: ElementRef;
  @ViewChildren('gridItem') gridItems!: QueryList<ElementRef>;

  imageURL?: string;
  textIntro?: string;

  categories = [
    { tag: 'pre-ceremonia', label: 'Plaza de María Pita', image: '../../../assets/images/webp/DSCF5554.webp' },
    { tag: 'ceremonia', label: 'Ceremonia civil', image: '../../../assets/images/webp/IMG_4175_2.webp' },
    { tag: 'firmas', label: 'Firmas', image: '../../../assets/images/webp/IMG_4261.webp' },
    { tag: 'just-married', label: 'Recién casados', image: '../../../assets/images/webp/IMG_4347.webp' },
    { tag: 'gaiteiro', label: 'Gaiteiro', image: '../../../assets/images/webp/IMG_4395.webp' },
    { tag: 'deco', label: 'Deco&shy;ración', image: '../../../assets/images/webp/DSCF5756.webp' },
    { tag: 'garden', label: 'Pazo de Xaz', image: '../../../assets/images/webp/IMG_4519_2.webp' },
    { tag: 'photocall', label: 'Photo&shy;call', image: '../../../assets/images/webp/IMG_4457.webp' },
    { tag: 'salon', label: 'Salón de los Castaños', image: '../../../assets/images/webp/IMG_4674.webp' },
    { tag: 'party', label: 'Baile', image: '../../../assets/images/webp/IMG_4715.webp' },
    { tag: 'photomaton', label: 'Photo&shy;maton', image: '../../../assets/images/webp/LC_FM_2_19_26.webp' }
  ];

  images: ImageDTO[] = [];
  category: string | null = null;
  private masonry!: Masonry;

  hasRefreshed = false;

  faHeart = faHeart;
  faCloundArrowDown = faCloudArrowDown;
  faEye = faEye;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private imagesService: ImagesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.category = params.get('category');
  
      const categoryTag = this.categories.find(c => c.tag === this.category);
  
      if (categoryTag) {
        this.imageURL = categoryTag.image;
        this.textIntro = categoryTag.label;
      }
  
      if (this.category) {
        this.imagesService.getImagesByTag(this.category).subscribe((data) => {
          this.images = data;
  
          setTimeout(() => {
            this.initMasonry();
            this.hasRefreshed = false;
          }, 0);
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.gridItems.changes.subscribe(() => {
      this.initMasonry();

      setTimeout(() => {
        import('fslightbox');
      }, 0);
    });
  }

  ngAfterViewChecked() {
    if (!this.hasRefreshed && this.gridItems.length > 0) {
      setTimeout(() => {
        refreshFsLightbox();
        this.hasRefreshed = true;
      }, 0);
    }
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

  back(): void {
    this.location.back();
  }

}
