import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.HomePage) },
  { path: 'history', loadComponent: () => import('./pages/history/history').then((m) => m.HistoryPage) },
  { path: 'alerts', loadComponent: () => import('./pages/alerts/alerts').then((m) => m.AlertsPage) },
  { path: 'news', loadComponent: () => import('./pages/news/news').then((m) => m.NewsPage) },
  { path: 'useful-links', loadComponent: () => import('./pages/useful-links/useful-links').then((m) => m.UsefulLinksPage) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then((m) => m.AboutPage) },
];
