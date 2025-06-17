import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WelcomeComponent, HeaderComponent, FooterComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class AppComponent implements OnInit {
  title = 'Diecisiete de Junio';
  showConfetti = true;
  showWelcome = true;
  preloadHome = false;
  isMobile = false;
  showMobileButton = false;

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    const alreadyShown = sessionStorage.getItem('welcomeShown');

    if (alreadyShown) {
      this.showConfetti = false;
      this.showWelcome = false;
      this.preloadHome = true;
    } else {
      setTimeout(() => {
        this.showConfetti = false;
      }, 7000);

      if (this.isMobile) {
        setTimeout(() => {
          this.showMobileButton = true;
        }, 7000);
      } else {
        setTimeout(() => {
          this.preloadHome = true;
        }, 5000);

        setTimeout(() => {
          this.showWelcome = false;
          sessionStorage.setItem('welcomeShown', 'true');
        }, 7000);
      }
    }
  }

  skipWelcome(): void {
    this.showWelcome = false;
    this.preloadHome = true;
    sessionStorage.setItem('welcomeShown', 'true');
  }
}
