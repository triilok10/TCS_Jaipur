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
      title: 'kavindra Patel',
      event: 'Bharat Dreamin 2026',
      eventType: 'Bharat Dreamin',
      description: 'The first major meetup for the Dreamin event.',
      image: '/BD_5.jpeg',
      location: 'Main Auditorium',
      people: 'with Trailblazers',
      note: 'Kicking off the journey.',
      shortCode: 'BD \'24'
    },
    {
      year: '2024',
      title: 'Guilda H.',
      event: 'Bharat Dreamin 2026',
      eventType: 'Bharat Dreamin',
      description: 'Wrap up and celebrations.',
      image: '/BD_6.jpeg',
      location: 'Main Stage',
      people: 'with all volunteers',
      note: 'A successful event wrap up.',
      shortCode: 'BD \'24'
    },
    {
      year: '2026',
      title: 'Gaurav kheterpal',
      event: 'Bharat Dreamin 2026',
      eventType: 'Bharat Dreamin',
      description: 'Presented the ambassador keynote on community-led engineering, volunteer impact, and developer experience.',
      image: '/BD_1.jpeg',
      location: 'Jaipur International Exhibitions Centre',
      people: 'with fellow ambassadors',
      note: 'Core mission of sharing community-first engineering stories.',
      shortCode: 'BD \'26'
    },
    {
      year: '2026',
      title: 'Selfie Booth',
      event: 'Bharat Dreamin 2026',
      eventType: 'Bharat Dreamin',
      description: 'Facilitated a session for volunteers and learners on event operations.',
      image: '/BD_Volunteer2.jpg',
      location: 'BD Volunteer Hub',
      people: 'with volunteer leads',
      note: 'Highlights the power of volunteer collaboration.',
      shortCode: 'BD \'26'
    },
    {
      year: '2026',
      title: 'with Attendees',
      event: 'Bharat Dreamin 2026',
      eventType: 'Bharat Dreamin',
      description: 'Documented volunteer highlights, speaker support, and learner engagement.',
      image: '/BD_3.jpeg',
      location: 'Exhibition hall',
      people: 'with volunteers',
      note: 'A candid shot of the conference floor.',
      shortCode: 'BD \'25'
    },
    {
      year: '2026',
      title: 'Bharat Dreamin 2026 11th July',
      event: 'Bharat Dreamin 2025',
      eventType: 'Bharat Dreamin',
      description: 'Early planning and coordination for the mega event.',
      image: '/BD_4.jpeg',
      location: 'Core Team Meetup',
      people: 'with core organizers',
      note: 'Strategy and community building.',
      shortCode: 'BD \'25'
    },
    {
      year: '2026',
      title: 'Diamond Sponsorship Team (Niyaz Ahmed)',
      event: 'Bharat Dreamin 2026',
      eventType: 'GDG Jaipur',
      description: 'Participated in a speaker roundtable.',
      image: '/BD_2.jpeg',
      location: 'GDG Jaipur Conference Hall',
      people: 'with community organizers',
      note: 'Volunteering in the local tech ecosystem.',
      shortCode: 'GDG \'24'
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
