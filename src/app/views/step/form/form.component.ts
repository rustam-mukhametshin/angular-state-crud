import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyFieldConfigCustom } from '../formly-field-config';
import { Observable } from 'rxjs';
import { StepInterface } from '../../../interfaces/step.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {

  @Input()
  configs$!: Observable<StepInterface>;

  form = new FormGroup({});
  mainModel: any;

  fields!: FormlyFieldConfig[];
  options: FormlyFormOptions = {};

  ngOnInit() {
    this.mainModel = new FormlyFieldConfigCustom;
    this.fields = this.mainModel.fields;
  }

  submit() {
    // alert(JSON.stringify(this.mainModel.model));
  }
}
