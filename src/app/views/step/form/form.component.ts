import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyFieldConfigCustom } from '../formly-field-config';
import { Observable, Subject } from 'rxjs';
import { StepInterface } from '../../../interfaces/step.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  @Input()
  configs$!: Observable<StepInterface>;
  configs!: StepInterface;

  form = new FormGroup({});
  mainModel: any;

  initialFormConfigs!: FormlyFieldConfig[];
  options: FormlyFormOptions = {};

  private subs$ = new Subject<void>();

  ngOnInit() {
    this.mainModel = new FormlyFieldConfigCustom;
    this.initialFormConfigs = this.mainModel.initialFormConfigs;

    this.configs$
      .pipe(takeUntil(this.subs$))
      .subscribe(data => {
        this.configs = data;
      })
  }

  ngOnDestroy() {
    this.subs$.next();
    this.subs$.complete();
  }

  submit() {
    // alert(JSON.stringify(this.mainModel.model));
  }
}
