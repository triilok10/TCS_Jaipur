import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Connect } from '../connect/connect';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Hero, About, Connect],
  templateUrl: './home.html'
})
export class Home {
  // Composite component rendering hero and about
}
