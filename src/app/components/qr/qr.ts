import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './qr.html',
  styleUrls: ['./qr.css']
})
export class Qr {
}
