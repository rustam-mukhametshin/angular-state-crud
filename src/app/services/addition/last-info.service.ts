import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastInfoService {

  private values$ = new BehaviorSubject({})
  obs$ = this.values$.asObservable();

  update(values: {}) {
    this.values$.next({
      ...values,
    });
  }
}
