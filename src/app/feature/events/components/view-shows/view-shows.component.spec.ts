import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShowsComponent } from './view-shows.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

describe('ViewShowsComponent', () => {
  let component: ViewShowsComponent;
  let fixture: ComponentFixture<ViewShowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewShowsComponent],
      imports: [TableModule, InputTextModule],
    });
    fixture = TestBed.createComponent(ViewShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
