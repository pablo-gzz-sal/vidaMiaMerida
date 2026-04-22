import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'menu',
    loadComponent: () => import('./features/menu/menu').then(m => m.MenuPageComponent),
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./features/home/sections/concept/concept').then(m => m.ConceptComponent),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./features/contact/contact').then(m => m.ContactPageComponent),
  },
  { path: '**', redirectTo: '' },
];
