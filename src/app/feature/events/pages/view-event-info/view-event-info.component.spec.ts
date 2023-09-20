import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventInfoComponent } from './view-event-info.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ViewShowsComponent } from '../../components/view-shows/view-shows.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

describe('ViewEventInfoComponent', () => {
  let component: ViewEventInfoComponent;
  let fixture: ComponentFixture<ViewEventInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewEventInfoComponent,
        TextButtonComponent,
        HeaderComponent,
        ViewShowsComponent,
      ],
      imports: [
        TableModule,
        InputTextModule
      ]
    });
    fixture = TestBed.createComponent(ViewEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
