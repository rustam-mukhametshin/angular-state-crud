import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyFieldConfigCustom } from '../formly-field-config';
import { FacadeService } from '../../../store/facade.service';
import { Observable } from 'rxjs';
import { StepInterface } from '../../../interfaces/step.interface';
import { StepEnum } from '../../../enums/step-enum';

@Component({
  selector: 'app-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StepPageComponent {

  form = new FormGroup({});
  mainModel: any;

  options: FormlyFormOptions = {};

  fields!: FormlyFieldConfig[];

  configs$: Observable<StepInterface>;

  constructor(
    private readonly facadeService: FacadeService,
  ) {
    this.configs$ = this.facadeService.step(StepEnum.getConfigs);

    this.mainModel = new FormlyFieldConfigCustom;
    this.fields = this.mainModel.fields;
  }


  submit() {
    // alert(JSON.stringify(this.mainModel.model));
  }

}
