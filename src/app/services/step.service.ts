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

  init(): StepInterface {
    if (!this.config) {
      return this.config = this.getInitialConfig();
    }

    return this.config;
  }

  private getInitialConfig(): StepInterface {
    return {
      contextID: 0,
      contextName: '',
      copyUserAccountsOfSource: '',
      destinationServer: '',
      executionDateTime: new Date(),
      inboundEmailUniqueName: '',
      includeHistory: '',
      lastInfo: '',
      lastInfo2: '',
      migrationOfSourceDocumentsIncluded: '',
      requestDate: new Date(),
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
