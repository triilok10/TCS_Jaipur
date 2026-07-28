import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavHeader } from './components/nav-header/nav-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavHeader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Main layout root component
}
