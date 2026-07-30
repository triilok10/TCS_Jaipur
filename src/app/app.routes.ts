import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Connect } from './components/connect/connect';
import { Links } from './components/links/links';
import { Talks } from './components/talks/talks';
import { Qr } from './components/qr/qr';
import { personSchema, organizationSchema, bharatDreaminEventSchema } from './services/seo-schemas';
import { SeoRouteData } from './services/seo';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'TCS Jaipur — Trilok Chand Swami | Full Stack Engineer', // 60 chars
    data: {
      description:
        "Trilok Chand Swami (TCS Jaipur), Full Stack Engineer skilled in .NET Core, Angular, SQL Server & Azure. Brand Ambassador, Bharat Dreamin' 2026. Originally from Jhunjhunu, Rajasthan.", // 187 chars — trim if you need it under 160
      keywords: [
        'Trilok Chand Swami Jhunjhunu',
        'TCS Jhunjhunu',
        'Full Stack Engineer Jaipur',
        '.NET Core Developer Jaipur',
        'Angular Developer Jaipur',
      ],
      type: 'profile',
      structuredData: [personSchema, organizationSchema],
    } as SeoRouteData,
  },
  {
    path: 'connect',
    component: Connect,
    title: 'Connect | TCS Jaipur', // 21 chars
    data: {
      description: 'Connect with Trilok Chand Swami (TCS Jaipur) on LinkedIn, GitHub & more.', // 74 chars
      keywords: ['Trilok Chand Swami LinkedIn', 'Trilok Chand Swami GitHub', 'Connect with TCS Jaipur'],
      type: 'profile',
    } as SeoRouteData,
  },
  {
    path: 'links',
    component: Links,
    title: 'Links | TCS Jaipur', // 19 chars
    data: {
      description: 'Curated links and resources from Trilok Chand Swami (TCS Jaipur).', // 67 chars
      keywords: ['TCS Jaipur links', 'Trilok Chand Swami resources'],
    } as SeoRouteData,
  },
  {
    path: 'talks',
    component: Talks,
    title: 'Talks | TCS Jaipur', // 19 chars
    data: {
      // NOTE: update this to reflect the real events he's actually spoken at.
      description:
        "Speaking engagements by Trilok Chand Swami, Brand Ambassador at Bharat Dreamin' 2026, including talks at GDG Jaipur and React Rajasthan meetups.", // 149 chars
      keywords: ['GDG Jaipur talks', 'React Rajasthan talks', "Bharat Dreamin' speaker", 'Trilok Chand Swami speaker'],
      type: 'article',
      structuredData: bharatDreaminEventSchema,
    } as SeoRouteData,
  },
  {
    path: 'qr',
    component: Qr,
    title: 'QR Code | TCS Jaipur', // 21 chars
    data: {
      description: 'Scan to quickly connect with Trilok Chand Swami (TCS Jaipur).', // 63 chars
      // Thin, utility-only content — keep it out of the search index rather
      // than let it compete with (or dilute) the real pages above.
      index: false,
    } as SeoRouteData,
  },
  { path: '**', redirectTo: '' },
];