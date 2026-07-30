import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

/**
 * Shape of the `data` object you attach to each Route.
 * Only `title` is required — everything else falls back to sensible,
 * keyword-rich site-wide defaults so every page is still indexable
 * even if you forget to fill it in.
 */
export interface SeoRouteData {
    title?: string;
    description?: string;
    /** Extra comma-separated keywords specific to this page, merged with the site defaults. */
    keywords?: string[];
    image?: string;
    /** og:type — 'website' | 'profile' | 'article' | 'event' etc. */
    type?: string;
    /** Set false on pages you don't want indexed (e.g. thank-you / admin pages). */
    index?: boolean;
    /** JSON-LD structured data object(s) for this specific page. */
    structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

@Injectable({ providedIn: 'root' })
export class Seo {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private meta = inject(Meta);
    private title = inject(Title);
    private document = inject(DOCUMENT);

    private readonly baseUrl = 'https://tcsjaipur.com';
    private readonly siteName = 'TCS Jaipur';
    private readonly twitterHandle = '@TCSJaipur';
    private readonly defaultImage = `${this.baseUrl}/tcs-profile.jpg`;

    /**
     * Site-wide default title/description/keywords used whenever a route
     * doesn't override them. Written specifically to rank for brand,
     * founder, and community searches.
     */
    private readonly defaults = {
        title: 'TCS Jaipur | Trilok Chand Swami — Bharat Dreamin Brand Ambassador',
        description:
            'TCS Jaipur is the tech community founded by Trilok Chand Swami (TCS), Brand Ambassador of Bharat Dreamin from Jhunjhunu, Rajasthan. Home to GDG Jaipur, React Rajasthan, and developer communities across Jaipur.',
        keywords: [
            'TCS Jaipur',
            'TCSJaipur',
            'Trilok Chand Swami',
            'Trilok Chand Swami Jhunjhunu',
            'TCS Jhunjhunu',
            'Bharat Dreamin',
            'Bharat Dreamin Brand Ambassador',
            'Brand Ambassador Bharat Dreamin',
            'GDG Jaipur',
            'Google Developer Group Jaipur',
            'React Rajasthan',
            'Jaipur developer community',
            'Rajasthan tech community',
        ],
    };

    init(): void {
        this.router.events
            .pipe(
                filter((e): e is NavigationEnd => e instanceof NavigationEnd),
                map(() => this.collectRouteData(this.activatedRoute.snapshot))
            )
            .subscribe((data) => this.applySeo(data));
    }

    /**
     * Walks the whole activated route tree (not just the deepest leaf) and
     * merges `data` from parent -> child, so shared/site-wide values set on
     * a parent route survive, and a child page only needs to override what
     * actually changes for it.
     */
    private collectRouteData(snapshot: ActivatedRouteSnapshot): SeoRouteData & { computedTitle?: string } {
        let merged: SeoRouteData = {};
        let node: ActivatedRouteSnapshot | null = snapshot;
        let deepestTitle: string | undefined;

        while (node) {
            merged = { ...merged, ...node.data };
            if (node.title) deepestTitle = node.title;
            node = node.firstChild;
        }

        return { ...merged, computedTitle: deepestTitle ?? merged.title };
    }

    private applySeo(data: SeoRouteData & { computedTitle?: string }): void {
        const pageTitle = data.computedTitle ?? this.defaults.title;
        const description = data.description ?? this.defaults.description;
        const image = data.image ?? this.defaultImage;
        const type = data.type ?? 'website';
        const shouldIndex = data.index !== false;
        const url = `${this.baseUrl}${this.router.url.split('?')[0]}`;
        const keywords = Array.from(new Set([...this.defaults.keywords, ...(data.keywords ?? [])])).join(', ');

        // <title>
        this.title.setTitle(pageTitle);

        // Core discovery tags
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ name: 'keywords', content: keywords });
        this.meta.updateTag({ name: 'author', content: 'Trilok Chand Swami' });
        this.meta.updateTag({
            name: 'robots',
            content: shouldIndex ? 'index, follow, max-image-preview:large' : 'noindex, nofollow',
        });

        // Open Graph (Facebook/LinkedIn/WhatsApp previews)
        this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
        this.meta.updateTag({ property: 'og:type', content: type });
        this.meta.updateTag({ property: 'og:locale', content: 'en_IN' });
        this.meta.updateTag({ property: 'og:title', content: pageTitle });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: image });
        this.meta.updateTag({ property: 'og:url', content: url });

        // Twitter / X card
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:site', content: this.twitterHandle });
        this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: image });

        this.updateCanonical(url);
        this.updateStructuredData(data.structuredData);
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

    /**
     * Injects/replaces a <script type="application/ld+json"> block per page.
     * Pass Organization + Person schema on the home route, and Event schema
     * on a Bharat Dreamin page, etc. — see seo-schemas.ts for ready-made
     * examples (Person: Trilok Chand Swami, Organization: TCS Jaipur / GDG
     * Jaipur / React Rajasthan).
     */
    private updateStructuredData(data?: Record<string, unknown> | Record<string, unknown>[]): void {
        const existing = this.document.getElementById('seo-structured-data');
        if (existing) existing.remove();
        if (!data) return;

        const script = this.document.createElement('script');
        script.id = 'seo-structured-data';
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        this.document.head.appendChild(script);
    }
}