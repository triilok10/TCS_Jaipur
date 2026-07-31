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
  categories: string[] = ['All', 'Keynote', 'Workshop', 'Gallery', 'Panel', 'Roundtable'];
  activeFilter: string = 'All';

  timelineEvents: TalkPhoto[] = [
    {
      year: '2026',
      title: 'Bharat Dreamin Ambassador Talk',
      event: 'Bharat Dreamin 2026',
      eventType: 'Keynote',
      description: 'Presented the ambassador keynote on community-led engineering, volunteer impact, and developer experience at Bharat Dreamin 2026.',
      image: '/BD_1.jpeg',
      location: 'Jaipur International Exhibitions Centre',
      people: 'with fellow ambassadors and speaker coordinators',
      note: 'Captured after the keynote, this photo represents the core mission of sharing community-first engineering stories.',
      shortCode: 'BD \'26'
    },
    {
      year: '2026',
      title: 'Volunteer Activation Workshop',
      event: 'GDG Jaipur Volunteer Lab',
      eventType: 'Workshop',
      description: 'Facilitated a session for volunteers and learners on event operations, mentorship tactics, and creating inclusive meetup experiences.',
      image: '/BD_2.jpeg',
      location: 'GDG Jaipur Volunteer Hub',
      people: 'with volunteer leads, learner champions, and backstage coordinators',
      note: 'This moment highlights the power of volunteer collaboration and the people behind the stage.',
      shortCode: 'GDG \'26'
    },
    {
      year: '2025',
      title: 'Community Showcase Gallery',
      event: 'Bharat Dreamin 2025',
      eventType: 'Gallery',
      description: 'Documented volunteer highlights, speaker support, and learner engagement across the community showcase space.',
      image: '/BD_3.jpeg',
      location: 'Exhibition hall, Bharat Dreamin 2025',
      people: 'with volunteers, learners, and community builders',
      note: 'A candid shot of the conference floor that captures energy, conversation, and community momentum.',
      shortCode: 'BD \'25'
    },
    {
      year: '2024',
      title: 'Learning Circle & Panel Preview',
      event: 'Salesforce Trailblazer Meetup',
      eventType: 'Panel',
      description: 'Joined a mentor-led panel for learners and professionals focused on Salesforce skills, career growth, and hands-on best practices.',
      image: '/BD_4.jpeg',
      location: 'Trailblazer Meetup Room',
      people: 'with students, industry mentors, and program facilitators',
      note: 'This photo is from an interactive discussion on mentoring and building the next wave of learners.',
      shortCode: 'SF \'24'
    },
    {
      year: '2024',
      title: 'Speaker Roundtable & Community Learnings',
      event: 'GDG Jaipur Tech Connect',
      eventType: 'Roundtable',
      description: 'Participated in a speaker roundtable that brought together community leads, volunteer organizers, and learner advocates.',
      image: '/BD_4.jpeg',
      location: 'GDG Jaipur Conference Hall',
      people: 'with community organizers and speaker peers',
      note: 'A reflective moment on how volunteering, speaking, and mentoring intersect in the local tech ecosystem.',
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
