import { FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

export enum StepLabels {
  first = 'START REQUEST',
  second = 'SOURCE INFORMATION',
  third = 'DESTINATION INFORMATION',
  fourth = 'LAST INFORMATION'
}

export enum FormKeyLabels {
  typeOfRequest = 'Type of request',
  executionDateTime = 'Execution date/time',

  turnOfAlertsOnSourceContext = 'Turn of alerts on source context',
  setSourceDatabaseToLocked = 'Set source database to locked',

  selectBackupDateTime = 'Select backup date/time for source context',
  destinationServer = 'Destination server',
  inboundEmailUniqueName = 'Inbound email unique name',
  targetContextName = 'Target context name',
  serverName = 'Server name (customer unique DNS)',
  includeHistory = 'Include history (logging & audit information)',
  migrationOfSourceDocumentsIncluded = 'Migration of source documents included',
  copyUserAccountsOfSource = 'Copy user accounts of source',
  serverWideAccess = 'Server wide access',

  lastInfo = 'Last info',
  lastInfo2 = 'Last info 2',
}

export class FormlyFieldConfigCustom {
  mainModel: any = {
    model: {},
    predefined: {
      copy: 'copy',
      country: 'Country copy',
      date: new Date(),
      last: 'Last copy',
      last2: 'Last 2',
      project: 'Project '
    },
    empty: {
      copy: 'move',
    },
  };

  existingProjects = [
    'pr1',
    'pr2',
    'pr3',
  ];

  initialFormConfigs: FormlyFieldConfig[] = [
    {
      type: 'stepper',
      fieldGroup: [
        //////// First
        {
          templateOptions: {label: StepLabels.first},
          fieldGroup: [
            {
              key: 'typeOfRequest',
              type: 'select',
              defaultValue: '',
              templateOptions: {
                label: FormKeyLabels.typeOfRequest,
                required: true,
                placeholder: 'Please select from list',
                options: [
                  {label: 'Move', value: 'move'},
                  {label: 'Copy', value: 'copy'},
                ],
                change: (e: any) => {
                  const value = e.formControl?.value;
                  if (value === 'move') {
                    this.mainModel.model = {
                      ...this.mainModel.model,
                      ...this.mainModel.predefined
                    };
                  } else if (value === 'copy') {
                    this.mainModel.model = this.mainModel.empty
                  }
                },
                click: (e) => {
                  console.log(e);
                },
              },
            },
            {
              key: 'executionDateTime',
              type: 'input',
              templateOptions: {
                label: FormKeyLabels.executionDateTime,
                placeholder: 'Select a date',
                required: true,
                type: 'date',
              },
              asyncValidators: {
                uniqueUsername: {
                  expression: (control: FormControl) => {
                    return new Promise((resolve, reject) => {
                      setTimeout(() => {
                        resolve(this.existingProjects.indexOf(control.value) === -1);
                      }, 1000);
                    });
                  },
                  message: 'This project is already taken.',
                },
              },
            },
          ],
        },
        //////// Second
        {
          templateOptions: {label: StepLabels.second},
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'turnOfAlertsOnSourceContext',
              type: 'select',
              className: 'col-6',
              templateOptions: {
                label: FormKeyLabels.turnOfAlertsOnSourceContext,
                required: false,
                placeholder: 'Please select from list',
              },
            },
            {
              key: 'setSourceDatabaseToLocked',
              type: 'select',
              templateOptions: {
                label: FormKeyLabels.setSourceDatabaseToLocked,
                required: false,
                placeholder: 'Please select from list',
              },
            },
          ],
        },
        //////// Third
        {
          templateOptions: {label: StepLabels.third},
          fieldGroup: [
            {
              key: 'selectBackupDateTime',
              type: 'select',
              templateOptions: {
                label: FormKeyLabels.selectBackupDateTime,
                required: true,
                placeholder: 'Please select from list',
              },
            },
            {
              key: 'destinationServer',
              type: 'select',
              templateOptions: {
                label: FormKeyLabels.destinationServer,
                required: true,
                placeholder: 'Please select from list of search',
              },
            },
            {
              key: 'inboundEmailUniqueName',
              type: 'input',
              templateOptions: {
                label: FormKeyLabels.inboundEmailUniqueName,
                required: true,
                placeholder: '',
              },
            },
            {
              key: 'targetContextName',
              type: 'input',
              templateOptions: {
                label: FormKeyLabels.targetContextName,
                required: true,
                placeholder: '',
              },
            },
            {
              key: 'serverName',
              type: 'input',
              templateOptions: {
                label: FormKeyLabels.serverName,
                required: false,
                placeholder: '',
              },
            },
            {
              key: 'includeHistory',
              type: 'select',
              templateOptions: {
                label: FormKeyLabels.includeHistory,
                required: false,
                placeholder: 'Please select from list',
              },
            },
            {
              key: 'migrationOfSourceDocumentsIncluded',
              type: 'select',
              templateOptions: {
                label: FormKeyLabels.migrationOfSourceDocumentsIncluded,
                required: false,
                placeholder: 'Please select from list',
              },
            },
            {
              key: 'copyUserAccountsOfSource',
              type: 'select',
              templateOptions: {
                label: FormKeyLabels.copyUserAccountsOfSource,
                required: false,
                placeholder: 'Please select from list',
              },
            },
            {
              key: 'serverWideAccess',
              type: 'select',
              templateOptions: {
                label: FormKeyLabels.serverWideAccess,
                required: false,
                placeholder: 'Please select from list',
              },
            },
          ],
        },
        //////// Last
        {
          templateOptions: {label: StepLabels.fourth},
          fieldGroup: [
            {
              key: 'lastInfo',
              type: 'input',
              templateOptions: {
                label: FormKeyLabels.lastInfo,
                required: true,
              },
            },
            {
              key: 'lastInfo2',
              type: 'input',
              templateOptions: {
                label: FormKeyLabels.lastInfo2,
                required: true,
              },
            },
          ],
        },
      ],
    }
  ]
}
