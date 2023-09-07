import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {
  getConcertData() {
    return [
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
      },
    ];
  }

  getConcerts() {
    return Promise.resolve(this.getConcertData());
  }
}
