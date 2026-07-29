import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface QrProfile {
  id: string;
  platform: string;
  handle: string;
  title: string;
  subtitle: string;
  url: string;
  brandColor: string;
  accentBg: string;
  iconHtml: SafeHtml;
  qrSrc: string;
  category: 'cloud' | 'code';
}

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './qr.html',
  styleUrls: ['./qr.css'],
})
export class Qr {
  copiedId: string | null = null;
  toastMessage: string | null = null;
  activeFilter: 'all' | 'cloud' | 'code' = 'all';

  profiles: QrProfile[];

  constructor(private sanitizer: DomSanitizer) {
    this.profiles = [
      {
        id: 'linkedin',
        platform: 'LinkedIn',
        handle: 'triilok10',
        title: 'Professional Network',
        subtitle: 'Cloud & Enterprise Architecture',
        url: 'https://www.linkedin.com/in/triilok10/',
        brandColor: '#0a66c2',
        accentBg: '#e8f1fb',
        category: 'cloud',
        iconHtml: this.safe(`<svg viewBox="0 0 24 24" fill="#0a66c2" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`),
        qrSrc: this.qrUrl('https://www.linkedin.com/in/triilok10/', '0a66c2'),
      },
      {
        id: 'salesforce',
        platform: 'Trailblazer',
        handle: 'triilok10',
        title: 'Salesforce Profile',
        subtitle: 'Ranger · Credentials & Certifications',
        url: 'https://www.salesforce.com/trailblazer/triilok10',
        brandColor: '#00a1e0',
        accentBg: '#e0f5fd',
        category: 'cloud',
        iconHtml: this.safe(`<svg viewBox="0 0 48 48" fill="#00a1e0" xmlns="http://www.w3.org/2000/svg"><path d="M20 6a10 10 0 0 1 9.19 6.02A7.5 7.5 0 0 1 40 19.5a7.5 7.5 0 0 1-7.5 7.5H10a8 8 0 0 1 0-16 7.93 7.93 0 0 1 2.18.31A10 10 0 0 1 20 6z"/></svg>`),
        qrSrc: this.qrUrl('https://www.salesforce.com/trailblazer/triilok10', '00a1e0'),
      },
      {
        id: 'github',
        platform: 'GitHub',
        handle: 'triilok10',
        title: 'Repositories & Code',
        subtitle: 'Open Source & Architectures',
        url: 'https://github.com/triilok10/',
        brandColor: '#24292f',
        accentBg: '#eaeef2',
        category: 'code',
        iconHtml: this.safe(`<svg viewBox="0 0 24 24" fill="#24292f" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`),
        qrSrc: this.qrUrl('https://github.com/triilok10/', '24292f'),
      },
    ];
  }

  get filteredProfiles(): QrProfile[] {
    if (this.activeFilter === 'all') return this.profiles;
    return this.profiles.filter(p => p.category === this.activeFilter);
  }

  setFilter(filter: 'all' | 'cloud' | 'code'): void {
    this.activeFilter = filter;
  }

  private safe(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private qrUrl(targetUrl: string, fgColor: string): string {
    const encoded = encodeURIComponent(targetUrl);
    return `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encoded}&color=${fgColor}&bgcolor=ffffff&qzone=1&margin=0&format=png`;
  }

  visitProfile(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  copyUrl(profile: QrProfile): void {
    navigator.clipboard.writeText(profile.url).then(() => {
      this.copiedId = profile.id;
      this.showToast(`Link copied for ${profile.platform}!`);
      setTimeout(() => (this.copiedId = null), 2200);
    });
  }

  downloadQr(profile: QrProfile): void {
    fetch(profile.qrSrc)
      .then(res => res.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `${profile.id}-qr-tcsjaipur.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        this.showToast(`Downloaded high-res ${profile.platform} QR Code!`);
      })
      .catch(() => {
        window.open(profile.qrSrc, '_blank');
      });
  }

  showToast(msg: string): void {
    this.toastMessage = msg;
    setTimeout(() => {
      if (this.toastMessage === msg) {
        this.toastMessage = null;
      }
    }, 2800);
  }
}