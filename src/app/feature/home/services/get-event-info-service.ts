import { Injectable } from '@angular/core';
import { Event } from '../../../models/event';

const events : Event[] = [
  {
    name: 'Taylor Swift The Eras Tour',
    image: 'taylor-swift.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    registerLink: 'https://google.com/about',
    learnMoreLink: 'https://google.com/about',
  },
  {
    name: 'Coldplay: Music of the Spheres Tour',
    image: 'coldplay.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    registerLink: 'https://google.com',
    learnMoreLink: 'https://google.com',
  }
];


@Injectable({
  providedIn: 'root',
})
export class GetEventInfoService {
  private getBriefEventData() {
    return events;
  }

  loadAllEvents() {
    return Promise.resolve(this.getBriefEventData());
  }
}
