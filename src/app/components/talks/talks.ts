import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-talks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './talks.html',
  styleUrls: ['./talks.css']
})
export class Talks {
  timelineEvents = [
    {
      year: '2026',
      title: 'Bharat Dreamin 2026 Ambassador Talk',
      event: 'Bharat Dreamin 2026',
      description: 'Presented the ambassador keynote on community-led engineering, volunteer impact, and developer experience at Bharat Dreamin 2026.',
      image: '/BD_1.jpeg'
    },
    {
      year: '2026',
      title: 'Volunteer Activation Session',
      event: 'Bharat Dreamin 2026',
      description: 'Led a volunteer workshop focused on event coordination, community storytelling, and scaling local Jaipur tech engagement.',
      image: '/BD_2.jpeg'
    },
    {
      year: '2026',
      title: 'Community Gallery Showcase',
      event: 'Bharat Dreamin 2026',
      description: 'Showcased volunteer moments, speaker support, and the community spirit that powered the Bharat Dreamin 2026 experience.',
      image: '/BD_3.jpeg'
    },
    {
      year: '2026',
      title: 'Brand Story & Networking Roundtable',
      event: 'Bharat Dreamin 2026',
      description: 'Hosted a roundtable on building developer communities, connecting GDG Jaipur volunteers, and driving the event narrative forward.',
      image: '/BD_4.jpeg'
    }
  ];
}
