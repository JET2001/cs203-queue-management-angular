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

  it('should emit button click', () => {
    const emitSpy = spyOn(component.buttonClick, 'emit');
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    expect(emitSpy).toHaveBeenCalled();
  })

  it('should not emit button click when isDisabled is true', () => {
    const emitSpy = spyOn(component.buttonClick, 'emit');
    component.isDisabled = true;
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    expect(emitSpy).not.toHaveBeenCalled();
  })
});
