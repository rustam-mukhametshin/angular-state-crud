import { FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

export enum StepLabels {
  first = 'START REQUEST',
  second = 'SOURCE INFORMATION',
  third = 'DESTINATION INFORMATION',
  fourth = 'LAST INFORMATION'
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

  fields: FormlyFieldConfig[] = [
    {
      type: 'stepper',
      fieldGroup: [
        {
          templateOptions: {label: StepLabels.first},
          fieldGroup: [
            {
              key: 'copy',
              type: 'select',
              defaultValue: '',
              templateOptions: {
                label: 'Copy',
                required: true,
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
              key: 'project',
              type: 'input',
              templateOptions: {
                label: 'Project Async valid',
                required: true,
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
        {
          templateOptions: {label: StepLabels.second},
          fieldGroup: [
            {
              key: 'country',
              type: 'input',
              templateOptions: {
                label: 'Country',
                required: true,
              },
            },
          ],
        },
        {
          templateOptions: {label: StepLabels.third},
          fieldGroup: [
            {
              key: 'day',
              type: 'input',
              templateOptions: {
                type: 'date',
                label: 'Day',
                required: true,
              },
            },
          ],
        },
        {
          templateOptions: {label: StepLabels.fourth},
          fieldGroup: [
            {
              key: 'last',
              type: 'input',
              templateOptions: {
                label: 'Last info',
                required: true,
              },
            },
            {
              key: 'last2',
              type: 'input',
              templateOptions: {
                label: 'Last info 2',
                required: true,
              },
            },
          ],
        },
      ],
    }
  ]
}
