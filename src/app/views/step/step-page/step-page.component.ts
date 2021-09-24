import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyFieldConfigCustom } from '../formly-field-config';

@Component({
  selector: 'app-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.css']
})
export class StepPageComponent {

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
