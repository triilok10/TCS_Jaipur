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
        iconHtml: this.safe(`<svg viewBox="0 0 24 24" fill="#0a66c2" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z"/><path d="M6.334 20.452H4.334V9h2v11.452z"/><circle cx="5.334" cy="5.333" r="1.667"/></svg>`),
        qrSrc: this.qrUrl('https://www.linkedin.com/in/triilok10/', '0a66c2'),
      },
      {
        id: 'salesforce',
        platform: 'Trailblazer',
        handle: 'triilok10',
        title: 'Trailhead Profile',
        subtitle: 'Learning Salesforce on Trailhead',
        url: 'https://www.salesforce.com/trailblazer/triilok10',
        brandColor: '#00a1e0',
        accentBg: '#e0f5fd',
        category: 'cloud',
        iconHtml: this.safe(`<svg viewBox="0 0 24 24" fill="#00a1e0" xmlns="http://www.w3.org/2000/svg"><path d="M17.833 9.833a3.833 3.833 0 0 0-3.166-2.978A4.001 4.001 0 0 0 9.5 4.5a4.001 4.001 0 0 0-4 4 3.833 3.833 0 0 0 2.978 3.166 2.999 2.999 0 0 0 2.95 3.75H16.5a3.5 3.5 0 0 1 1.333 6.767 3.5 3.5 0 0 1-3.333-1.945A2.001 2.001 0 0 0 12.5 17.5H9.5a5.5 5.5 0 0 1-5.5-5.5 5.5 5.5 0 0 1 5.5-5.5c.413 0 .817.058 1.195.167A4.834 4.834 0 0 0 12 8.667a4.834 4.834 0 0 0 5.833 1.166z"/></svg>`),
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
        iconHtml: this.safe(`<svg viewBox="0 0 24 24" fill="#24292f" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.579 0-.286-.011-1.041-.017-2.043-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.086 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.759-1.605-2.665-.304-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.301 1.23.958-.266 1.984-.399 3.003-.404 1.018.005 2.044.138 3.003.404 2.291-1.553 3.298-1.23 3.298-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.476 5.923.43.373.813 1.106.813 2.232 0 1.612-.015 2.91-.015 3.305 0 .321.216.695.825.577C20.565 21.796 24 17.303 24 12c0-6.627-5.373-12-12-12z"/></svg>`),
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