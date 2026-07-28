import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  protected isRequestSent = signal(false);
  protected isRequestLoading = signal(false);

  protected sendRequest() {
    if (this.isRequestLoading()) return;
    
    this.isRequestLoading.set(true);
    this.isRequestSent.set(false);
    
    // Simulate API request delay
    setTimeout(() => {
      this.isRequestLoading.set(false);
      this.isRequestSent.set(true);
    }, 800);
  }
}
