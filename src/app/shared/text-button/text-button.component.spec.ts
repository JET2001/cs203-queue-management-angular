import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextButtonComponent } from './text-button.component';

describe('TextButtonComponent', () => {
  let component: TextButtonComponent;
  let fixture: ComponentFixture<TextButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextButtonComponent],
    });
    fixture = TestBed.createComponent(TextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change button text', () => {
    component.buttonText = 'button text';
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    if (buttonElement.textContent)
      expect(buttonElement.textContent.trim()).toBe('button text');
  });

  it('should change button variant', () => {
    component.buttonVariants = 'secondary';
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('button-secondary')).toBe(true);
  });

  it('should call onClick when button is clicked', () => {
    spyOn(component, 'onClick');
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    expect(component.onClick).toHaveBeenCalled();
  })
});
