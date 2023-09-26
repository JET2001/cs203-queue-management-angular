import { MessagesModule } from 'primeng/messages';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routing';
import { CarouselComponent } from './components/carousel/carousel.component';
import { UpcomingConcertsComponent } from './components/upcoming-concerts/upcoming-concerts.component';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    LandingPageComponent,
    CarouselComponent,
    UpcomingConcertsComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(homeRoutes), MessagesModule],
  providers: [HttpClient]
})
export class HomeModule {}
