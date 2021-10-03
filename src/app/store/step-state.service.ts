import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { StepStateInterface } from '../interfaces/step-state.interface';
import { Observable, of } from 'rxjs';
import { StepInterface } from '../interfaces/step.interface';

@Injectable({
  providedIn: 'root'
})
export class StepStateService extends StateService<StepStateInterface> {

  init(): Observable<unknown> {
    return of();
  }

  update(config: any): Observable<StepInterface> {
    return of()
  }

  getConfig(): Observable<StepInterface> {
    return of()
  }
}
