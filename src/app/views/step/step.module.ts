import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { StepRouterModule } from './step.router.module';
import { SharedModule } from '../../modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { InfoComponent } from './info/info.component';
import { StepComponent } from './step/step.component';
import { StepPageComponent } from './step-page/step-page.component';

@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
    InfoComponent,
    StepComponent,
    StepPageComponent,
  ],
  imports: [
    SharedModule,
    StepRouterModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validationMessages: [
        {name: 'required', message: 'This field is required'},
      ],
      types: [
        {name: 'stepper', component: StepComponent, wrappers: []},
      ],
    }),
  ]
})
export class StepModule {
}
