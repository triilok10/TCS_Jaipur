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
      year: '2024',
      title: 'Azure Functions & Microservices Architecture',
      event: 'Global Azure Bootcamp',
      description: 'Presented a deep dive into migrating monolithic .NET applications to serverless Azure Functions with CosmosDB integrations, highlighting real-world scale and cost efficiency.'
    },
    {
      year: '2023',
      title: 'State Management with NgRx in Enterprise Angular',
      event: 'Angular India Meetup',
      description: 'Walked through implementing NgRx for complex state flows in a healthcare application, focusing on reducing boilerplate and ensuring predictable state transitions.'
    },
    {
      year: '2022',
      title: 'Brand Ambassador Selection',
      event: 'Bharat Dreamin\' 2026',
      description: 'Selected as the Brand Ambassador to help lead community tech initiatives, driving developer engagement and sharing insights across multiple open-source tracks.'
    },
    {
      year: '2021',
      title: 'Mentoring the Next Gen',
      event: 'Tech Trailblazers Jaipur',
      description: 'Initiated a mentorship program helping junior developers map out their Full Stack engineering journey using the .NET and Angular ecosystems.'
    }
  ];
}
