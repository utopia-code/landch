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
  title = 'LandCh';
  showWelcome = true;
  preloadHome = false;
  showHome = false;

  ngOnInit(): void {
    const alreadyShown = sessionStorage.getItem('welcomeShown');

    if (alreadyShown) {
      this.showWelcome = false;
      this.preloadHome = true;
      this.showHome = true;
    } else {
      setTimeout(() => {
        this.preloadHome = true;
      }, 4000);

      setTimeout(() => {
        this.showWelcome = false;
        this.showHome = true;
        sessionStorage.setItem('welcomeShown', 'true');
      }, 7000);
    }
  }
}
