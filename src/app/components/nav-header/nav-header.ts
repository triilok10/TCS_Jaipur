import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-header.html',
  styleUrl: './nav-header.css'
})
export class NavHeader {
  protected isScrolled = signal(false);
  protected menuOpen = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (window.innerWidth > 768) {
      this.menuOpen.set(false);
    }
  }

  protected toggleMenu() {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu() {
    this.menuOpen.set(false);
  }
}
