import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Seo {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private meta = inject(Meta);
    private title = inject(Title);
    private document = inject(DOCUMENT);
    private baseUrl = 'https://tcsjaipur.com';

    init(): void {
        this.router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                map(() => {
                    let route = this.activatedRoute.firstChild;
                    while (route?.firstChild) route = route.firstChild;
                    return route;
                })
            )
            .subscribe((route) => {
                const data = route?.snapshot.data;
                const title = route?.snapshot.title;
                const description = data?.['description'];
                const image = data?.['image'] ?? `${this.baseUrl}/tcs-profile.jpg`;
                const url = `${this.baseUrl}${this.router.url}`;

                if (title) {
                    this.meta.updateTag({ property: 'og:title', content: title });
                    this.meta.updateTag({ name: 'twitter:title', content: title });
                }
                if (description) {
                    this.meta.updateTag({ name: 'description', content: description });
                    this.meta.updateTag({ property: 'og:description', content: description });
                    this.meta.updateTag({ name: 'twitter:description', content: description });
                }
                this.meta.updateTag({ property: 'og:image', content: image });
                this.meta.updateTag({ name: 'twitter:image', content: image });
                this.meta.updateTag({ property: 'og:url', content: url });
                this.updateCanonical(url);
            });
    }

    private updateCanonical(url: string): void {
        let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!link) {
            link = this.document.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.document.head.appendChild(link);
        }
        link.setAttribute('href', url);
    }
}