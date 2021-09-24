import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormlyFieldConfigCustom } from '../formly-field-config';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true}
    }
  ]
})
export class FormComponent {

  form = new FormGroup({});
  mainModel: any;

  options: FormlyFormOptions = {};

  fields!: FormlyFieldConfig[];

  constructor() {
    this.mainModel = new FormlyFieldConfigCustom;
    this.fields = this.mainModel.fields;
  }


  submit() {
    // alert(JSON.stringify(this.mainModel.model));
  }
}
