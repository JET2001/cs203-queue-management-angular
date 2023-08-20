import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routing';



@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeModule { }
