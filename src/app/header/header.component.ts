import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  menuOpen = false;
  menuItems = [
    { route: '/home', label: 'Inicio' },
    { route: '/gallery/pre-ceremonia', label: 'María Pita' },
    { route: '/gallery/ceremonia', label: 'Ceremonia civil' },
    { route: '/gallery/firmas', label: 'Firmas' },
    { route: '/gallery/just-married', label: 'Recién casados' },
    { route: '/gallery/gaiteiro', label: 'Gaiteiro' },
    { route: '/gallery/deco', label: 'Decoración' },
    { route: '/gallery/garden', label: 'Pazo de Xaz' },
    { route: '/gallery/photocall', label: 'Photocall' },
    { route: '/gallery/salon', label: 'Salón de los Castaños' },
    { route: '/gallery/party', label: 'Baile' },
    { route: '/gallery/photomaton', label: 'Photomaton' },
    { route: '/videos', label: 'Videos' }
  ];

  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigate(['/']);
  }

  toogleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

}
