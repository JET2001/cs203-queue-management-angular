import { Injectable } from '@angular/core';
import { Event } from '../../../models/event';

const events : Event[] = [
  {
    eventID: 1,
    name: 'Taylor Swift The Eras Tour',
    image: 'taylor-swift.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isHighlighted: true,
    countries: ["Mexico", "Argentina","Brazil", "Japan", "Australia", "Singapore", "France", "Sweden", "Portugal", "Spain"],
    registerLink: 'https://google.com/about',
    learnMoreLink: 'https://google.com/about',
  },
  {
    eventID: 2,
    name: 'Coldplay: Music of the Spheres Tour',
    image: 'coldplay.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    countries:["Tokyo", "Kaohsiung City", "Jakarta", "Perth", "Kuala Lumpur", "Manila", "Singapore", "Bangkok"],
    isHighlighted: true,
    registerLink: 'https://google.com',
    learnMoreLink: 'https://google.com',
  },
  {
    eventID: 3,
    name: "Guns N' Roses",
    image: 'guns_and_roses.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    countries: ["Middle East", "Europe", "America"],
    isHighlighted: false,
  },
  {
    eventID: 4,
    name: "Anson Seabra: The Neverland Tour",
    image: 'the-neverland-tour.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    countries: ['Taipei', 'Thailand', 'Singapore', 'Manila', 'Hong Kong', 'Paris'],
    isHighlighted: false,
  },
  {
    eventID: 5,
    name: "TWICE",
    image: 'twice.jpg',
    countries:['Europe','Mexico', 'Australia'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isHighlighted: true

  }

];


@Injectable({
  providedIn: 'root',
})
export class GetEventInfoService {
  loadAllCarousellEvents() {
    return Promise.resolve(this.getCarousellEventData());
  }
  
  private getCarousellEventData(): Event[] {
    let carousellEvents : Event[] = [];
    for (let event of events){
      if (event.isHighlighted){
        this.buildEventSummary(event);
        carousellEvents.push(event);
      }
    }
    return carousellEvents;
  }

  private buildEventSummary(event: Event): void {
    let summaryStringBuilder = "Coming to "
    console.log(summaryStringBuilder);

    // Build event summary
    for (let i = 0; i < event.countries.length -1; ++i){
      summaryStringBuilder = summaryStringBuilder + event.countries[i] + ", ";
    }

    summaryStringBuilder += "and" + event.countries[event.countries.length - 1];
    event.summary = summaryStringBuilder;
  }
}
