import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface TalkPhoto {
  year: string;
  title: string;
  event: string;
  eventType: string;
  description: string;
  image: string;
  location: string;
  people: string;
  note: string;
  shortCode: string;
}

@Component({
  selector: 'app-talks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './talks.html',
  styleUrls: ['./talks.css']
})
export class Talks {
  categories: string[] = ['All', 'Bharat Dreamin', 'GDG Jaipur', 'Trailblazer Community', 'Local Meetups'];
  activeFilter: string = 'All';

timelineEvents: TalkPhoto[] = [
  {
    year: '2026',
    title: 'Kavindra Patel',
    event: 'Bharat Dreamin 2026',
    eventType: 'Bharat Dreamin',
    description: 'A short selfie moment with Kavindra Patel sir, Head of Trailblazer Event Program at Salesforce, capturing his warm mentorship presence and the joy of meeting him in person.',
    image: '/BD_5.jpeg',
    location: 'Rajasthan International Centre',
    people: 'with Kavindra Patel',
    note: 'A respectful meet-and-greet with a senior Salesforce leader and keynote speaker.',
    shortCode: 'BD \'26'
  },
  {
    year: '2026',
    title: 'Guilda H.',
    event: 'Bharat Dreamin 2026',
    eventType: 'Bharat Dreamin',
    description: 'A quick snapshot with Guilda H., Senior Director of Marketing Evangelism at Salesforce, celebrating the event\'s collaborative spirit and her support for the Dreamin community.',
    image: '/BD_6.jpeg',
    location: 'Rajasthan International Centre',
    people: 'with Guilda H.',
    note: 'A candid moment with a keynote speaker and long-time community advocate.',
    shortCode: 'BD \'26'
  },
  {
  year: '2026',
  title: 'Gaurav Kheterpal',
  event: 'Bharat Dreamin 2026',
  eventType: 'Bharat Dreamin',
  description: 'A short hello with Gaurav Kheterpal — in the Salesforce ecosystem since 2007, a Salesforce MVP Hall of Fame member, MuleSoft Ambassador, and Founder & CEO of Vanshiv, a startup solving the Data, AI & CRM puzzle for the enterprise. A Dreamforce speaker, BITS Pilani alumnus.\, he\'s been a mentor for many of us in the community. Nearly two decades of industry experience, and the photo says it all.',
  image: '/BD_1.jpeg',
  location: 'Rajasthan International Centre',
  people: 'with Gaurav Kheterpal',
  note: 'A brief moment with a mentor and long-time community leader — the photo captures the experience words can\'t.',
  shortCode: 'BD \'26'
},
  {
    year: '2026',
    title: 'Selfie Booth',
    event: 'Bharat Dreamin 2026',
    eventType: 'Bharat Dreamin',
    description: 'A lively selfie booth moment at Bharat Dreamin, capturing the candid energy and the volunteer-driven event experience.',
    image: '/BD_Volunteer2.jpg',
    location: 'Rajasthan International Centre',
    people: 'selfie booth moment',
    note: 'A fun keepsake from the event\'s social booth.',
    shortCode: 'BD \'26'
  },
  {
    year: '2026',
    title: 'Meeting Er. Jasjit Singh & Yashasvi Sharma',
    event: 'Bharat Dreamin 2026',
    eventType: 'Bharat Dreamin',
    description: 'Finally meeting Er. Jasjit Singh in person after following his Salesforce journey online — a Data Architect and Tech Lead known for his work across OmniStudio and CPQ. Alongside him, Yashasvi Sharma — great to see her again, showing up to support the event with the same energy she brings to the community.',
    image: '/BD_3.jpeg',
    location: 'Rajasthan International Centre',
    people: 'with Jasjit Singh and Yashasvi Sharma',
    note: 'A great real-life meetup after connecting online, and a warm reunion with an event supporter.',
    shortCode: 'BD \'26'
  },
  {
    year: '2026',
    title: 'Bharat Dreamin 2026 — 11th July',
    event: 'Bharat Dreamin 2026',
    eventType: 'Bharat Dreamin',
    description: 'A planning moment with the core team, including Kumarswami Mathapati — part of the Organising Team for Bharat Dreamin 2026 and a familiar face in the Salesforce Trailblazer community — and Sesha Thamalalla, Director of Community & Ecosystem at Copado and Founder of Bengaluru Dreamin\'.',
    image: '/BD_4.jpeg',
    location: 'Rajasthan International Centre',
    people: 'with Kumarswami Mathapati and Sesha Thamalalla',
    note: 'Behind-the-scenes coordination with the organizers and Copado leadership powering the conference.',
    shortCode: 'BD \'26'
  },
  {
    year: '2026',
    title: 'Diamond Sponsorship Team (Niyaz Ahmed)',
    event: 'Bharat Dreamin 2026',
    eventType: 'Bharat Dreamin',
    description: 'A moment with Niyaz Ahmed and the team from Workato, Bharat Dreamin\' 2026\'s Diamond Sponsor — celebrating the support that helped bring the conference to life.',
    image: '/BD_2.jpeg',
    location: 'Rajasthan International Centre',
    people: 'with Niyaz Ahmed',
    note: 'A grateful snapshot with the Diamond Sponsor team investing in the event\'s success.',
    shortCode: 'BD \'26'
  }
];
  selectedGalleryItem: TalkPhoto | null = null;

  get filteredEvents() {
    if (this.activeFilter === 'All') {
      return this.timelineEvents;
    }
    return this.timelineEvents.filter(item => item.eventType === this.activeFilter);
  }

  setFilter(category: string) {
    this.activeFilter = category;
  }

  openGalleryModal(item: TalkPhoto): void {
    this.selectedGalleryItem = item;
  }

  closeGalleryModal(): void {
    this.selectedGalleryItem = null;
  }
}
