import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  /**
   * Update config and return obs$ config
   * @param config
   */
  update(config: StepInterface): Observable<StepInterface> {
    const oldConfig = this.config;

    this.config = {
      ...oldConfig,
      ...config
    };

    return of(this.config);
  }

  /**
   * Get config
   */
  getConfig(): Observable<StepInterface> {
    return of(this.config);
  }

  init(): Observable<StepInterface> {
    if (!this.config) {
      this.config = this.getInitialConfig();
    }

    return of(this.config);
  }

  private getInitialConfig(): StepInterface {
    return {
      contextID: 0,
      contextName: '',
      copyUserAccountsOfSource: '',
      destinationServer: '',
      executionDateTime: '',
      inboundEmailUniqueName: '',
      includeHistory: '',
      lastInfo: '',
      lastInfo2: '',
      migrationOfSourceDocumentsIncluded: '',
      requestDate: '',
      requestor: '',
      selectBackupDateTime: '',
      serverName: '',
      serverNameFirst: '',
      serverWideAccess: '',
      setSourceDatabaseToLocked: '',
      targetContextName: '',
      turnOfAlertsOnSourceContext: '',
      typeOfRequest: ''
    }
  }
}
