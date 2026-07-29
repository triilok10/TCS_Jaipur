import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavHeader } from './components/nav-header/nav-header';
import { Seo } from './services/seo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavHeader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Main layout root component
  private seo = inject(Seo);

  constructor() {
    this.seo.init();
  }
}