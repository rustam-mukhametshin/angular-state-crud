import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FacadeService } from '../../../store/facade.service';
import { Observable } from 'rxjs';
import { StepInterface } from '../../../interfaces/step.interface';
import { StepEnum } from '../../../enums/step-enum';
import { FormlyFieldConfigCustom } from '../formly-field-config';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StepPageComponent implements OnInit {

  form = new FormGroup({});
  mainModel: any;

  options: FormlyFormOptions = {};

  fields!: FormlyFieldConfig[];

  configs$!: Observable<StepInterface>;

  constructor(
    private readonly facadeService: FacadeService,
  ) {

  }

  ngOnInit() {
    this.configs$ = this.facadeService.step(StepEnum.getConfigs);

    this.mainModel = new FormlyFieldConfigCustom;
    this.fields = this.mainModel.fields;

    this.setInitialValues()
      .pipe(take(1))
    ;
  }


  submit() {
    // alert(JSON.stringify(this.mainModel.model));
  }

  private setInitialValues() {
    // Todo: Change to ActivatedRoute
    const obs: StepInterface = {
      contextName: 'Demo Sales NL',
      contextID: 47,
      serverNameFirst: 'DEV3',
      requestDate: '09/22/2021',
      requestor: 'First Last name',
    }

    return this.facadeService.step(StepEnum.updateConfigs, obs);
  }

}
