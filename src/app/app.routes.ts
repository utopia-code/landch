import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => 
            import('./home/home.component').then((m) => m.HomeComponent)
    },
    {
        path: 'gallery/:category',
        loadComponent: () => 
            import('./galleries/detail/detail.component').then((m) => m.DetailComponent)
    },
    {
        path: 'videos',
        loadComponent: () => import('./galleries/video-gallery/video-gallery.component').then(m => m.VideoGalleryComponent)
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
];
