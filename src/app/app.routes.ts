import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Connect } from './components/connect/connect';
import { Links } from './components/links/links';
import { Talks } from './components/talks/talks';
import { Qr } from './components/qr/qr';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'connect', component: Connect },
  { path: 'links', component: Links },
  { path: 'talks', component: Talks },
  { path: 'qr', component: Qr },
  { path: '**', redirectTo: '' }
];
