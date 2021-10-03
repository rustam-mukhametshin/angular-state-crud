import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { StepStateInterface } from '../interfaces/step-state.interface';
import { Observable, of } from 'rxjs';
import { StepInterface } from '../interfaces/step.interface';
import { shareReplay, switchMap } from 'rxjs/operators';
import { StepService } from '../services/step.service';

const initialState: StepStateInterface = {
  configs: {
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
  },
}

@Injectable({
  providedIn: 'root'
})
export class StepStateService extends StateService<StepStateInterface> {


  configs$: Observable<StepInterface> = this.select(state => state.configs)
    .pipe(
      shareReplay({refCount: true, bufferSize: 1})
    );

  constructor(
    private readonly stepService: StepService
  ) {
    super(initialState);
  }


  init(): Observable<unknown> {
    return this.stepService.getConfig()
      .pipe(
        switchMap(configs => {
          this.setState({configs})
          return of(null);
        })
      )
  }

  update(config: any): Observable<StepInterface> {
    return of()
  }

  getConfig(): Observable<StepInterface> {
    return of()
  }
}
