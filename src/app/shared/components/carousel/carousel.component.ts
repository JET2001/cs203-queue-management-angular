import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConcertService } from '../../services/concert.service';
import { Concert } from './concert';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})

export class CarouselComponent implements OnInit{
  concerts: Concert[];
  constructor(private concertService: ConcertService, private router: Router) {}

  ngOnInit(): void {
    this.concertService.getConcerts().then((concerts) => {
      this.concerts = concerts;
    })
  }

  handleRegisterButtonClick(link: string): void {
    // to be implemented once we have other pages to route to
    // this.router.navigate()
    window.location.href = link;
  }
}
