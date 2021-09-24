export interface MoveCopyInterface {
  contextName: string;
  contextID: number;
  serverNameFirst: string;
  requestDate: Date,
  requestor: string;

  typeOfRequest: string;
  executionDateTime: Date;

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
