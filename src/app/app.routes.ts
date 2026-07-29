import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Connect } from './components/connect/connect';
import { Links } from './components/links/links';
import { Talks } from './components/talks/talks';
import { Qr } from './components/qr/qr';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'TCS Jaipur — Full Stack Engineer',                    // 34 chars
    data: { description: 'Trilok Chand Swami (TCS Jaipur), Full Stack Engineer skilled in .NET Core, Angular, SQL Server & Azure. Brand Ambassador, Bharat Dreamin\' 2026.' } // 145 chars
  },
  {
    path: 'connect',
    component: Connect,
    title: 'Connect | TCS Jaipur',                                 // 21 chars
    data: { description: 'Connect with Trilok Chand Swami (TCS Jaipur) on LinkedIn, GitHub & more.' } // 74 chars
  },
  {
    path: 'links',
    component: Links,
    title: 'Links | TCS Jaipur',                                   // 19 chars
    data: { description: 'Curated links and resources from Trilok Chand Swami (TCS Jaipur).' } // 67 chars
  },
  {
    path: 'talks',
    component: Talks,
    title: 'Talks | TCS Jaipur',                                   // 19 chars
    data: { description: "Speaking engagements by Trilok Chand Swami, Brand Ambassador at Bharat Dreamin' 2026." } // 85 chars
  },
  {
    path: 'qr',
    component: Qr,
    title: 'QR Code | TCS Jaipur',                                 // 21 chars
    data: { description: 'Scan to quickly connect with Trilok Chand Swami (TCS Jaipur).' } // 63 chars
  },
  { path: '**', redirectTo: '' }
];