import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  form = new FormGroup({});

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
  }
  options: FormlyFormOptions = {};

  existingProjects = [
    'pr1',
    'pr2',
    'pr3',
  ];

  fields: FormlyFieldConfig[] = [{
    type: 'stepper',
    fieldGroup: [
      {
        templateOptions: {label: 'First'},
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
              change: e => {
                const value = e.formControl?.value;
                if (value !== null) {
                  if (value === 'move') {
                    this.mainModel.model = {
                      ...this.mainModel.model,
                      ...this.mainModel.predefined
                    };
                  } else if (value === 'copy') {
                    this.mainModel.model = this.mainModel.empty
                  }
                }

              },
              click: e => {
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
        templateOptions: {label: 'Second'},
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
        templateOptions: {label: 'Third'},
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
        templateOptions: {label: 'Fourth'},
        fieldGroup: [
          {
            key: 'last',
            type: 'input',
            templateOptions: {
              label: 'Last info',
              required: true,
            },
          },
        ],
      },
    ],
  }];

  submit() {
    alert(JSON.stringify(this.mainModel.model));
  }
}
