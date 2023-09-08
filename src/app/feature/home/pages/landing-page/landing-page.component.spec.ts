import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { CarouselModule } from 'primeng/carousel';
import { SharedModule } from 'src/app/shared/shared.module';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageComponent, TextButtonComponent, CarouselComponent, InputFieldComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
