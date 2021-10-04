import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyFieldConfigCustom } from '../formly-field-config';
import { Observable, Subject } from 'rxjs';
import { StepInterface } from '../../../interfaces/step.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  @Input()
  configs$!: Observable<StepInterface>;
  configs: StepInterface = {};

  form = new FormGroup({});
  initialFormConfigs: FormlyFieldConfig[];
  options: FormlyFormOptions = {};

  private subs$ = new Subject<void>();

  constructor() {
    this.initialFormConfigs = FormlyFieldConfigCustom.initialFormConfigs;
  }

  ngOnInit() {
    /*
    Update data on every change of input
    this.configs$
      .pipe(takeUntil(this.subs$))
      .subscribe(data => {
        this.configs = {};
      })*/
  }

  ngOnDestroy() {
    this.subs$.next();
    this.subs$.complete();
  }

  submit() {
    // alert(JSON.stringify(this.mainModel.model));
  }
}
