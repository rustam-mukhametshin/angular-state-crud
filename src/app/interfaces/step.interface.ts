export interface StepInterface {
  contextName: string;
  contextID: number;
  serverNameFirst: string;
  requestDate: string,
  requestor: string;

  typeOfRequest: string;
  executionDateTime: string;

  turnOfAlertsOnSourceContext: string,
  setSourceDatabaseToLocked: string,

  selectBackupDateTime: string,
  destinationServer: string,
  inboundEmailUniqueName: string,
  targetContextName: string,
  serverName: string,
  includeHistory: string,
  migrationOfSourceDocumentsIncluded: string,
  copyUserAccountsOfSource: string,
  serverWideAccess: string,

  lastInfo: string,
  lastInfo2: string,
}
