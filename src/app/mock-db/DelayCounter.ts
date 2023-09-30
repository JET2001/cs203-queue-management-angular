import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class DelayCounter {
  public counter: number = 1;

  public get value(): number {
    return this.counter;
  }
  public set setCounter(newNumber: number){this.counter = newNumber;}
}
