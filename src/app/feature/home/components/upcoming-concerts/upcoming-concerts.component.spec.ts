import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingConcertsComponent } from './upcoming-concerts.component';

describe('UpcomingConcertsComponent', () => {
  let component: UpcomingConcertsComponent;
  let fixture: ComponentFixture<UpcomingConcertsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingConcertsComponent]
    });
    fixture = TestBed.createComponent(UpcomingConcertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
