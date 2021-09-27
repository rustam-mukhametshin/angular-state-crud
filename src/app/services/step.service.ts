import { Injectable } from '@angular/core';
import { StepInterface } from '../interfaces/step.interface';

const CONFIG_KEY = 'STATE_CONFIG_STEP'

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private get config(): StepInterface {
    return JSON.parse(<string>localStorage.getItem(CONFIG_KEY));
  }

  private set config(data: StepInterface) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(data));
  }

  clear() {
    localStorage.removeItem(CONFIG_KEY);
  }
}
