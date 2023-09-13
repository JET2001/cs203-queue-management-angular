import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-queue-timings',
  templateUrl: './queue-timings.component.html',
  styleUrls: ['./queue-timings.component.scss'],
})
export class QueueTimingsComponent {
  queueTimingForm: FormGroup;

  queueTimings = [1, 2, 3];
  timingOptions = ['4 July 2023, 22:00 SGT | SHOW TIME: 2 March 2024, Singapore 397718, 18:00 SGT ',
                    '5 July 2023, 22:00 SGT | SHOW TIME: 3 March 2024, Singapore 397718, 18:00 SGT',
                    '7 July 2023, 22:00 SGT | SHOW TIME: 7 March 2024, Singapore 397718, 18:00 SGT'];
  concertName: string = 'Taylor Swift The Eras Tour';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Initialize the reactive form
    this.queueTimingForm = this.fb.group({
      timings: this.fb.array([]),
    });

    // Create form controls for queue timings dynamically
    this.queueTimings.forEach(() => {
      const timingControl = this.fb.group({
        selectedTiming: ['', Validators.required], // Add required validator
      });
      this.timings.push(timingControl);
    });
  }

  get timings() {
    return this.queueTimingForm.get('timings') as FormArray;
  }

  goBack() {
    console.log('Going back');
  }

  goNext() {
    console.log('Going next');
  }

  // testing for popup
  showPopup: boolean = false;

  togglePopup() {
    this.showPopup = !this.showPopup;
  }
  
}
