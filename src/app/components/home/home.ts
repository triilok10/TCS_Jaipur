import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero/hero';
import { About } from '../about/about';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Hero, About],
  templateUrl: './home.html'
})
export class Home {
  // Composite component rendering hero and about
}
