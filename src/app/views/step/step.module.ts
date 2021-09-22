import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { StepRouterModule } from './step.router.module';
import { SharedModule } from '../../modules/shared.module';

const modules = [
  SharedModule,
  StepRouterModule,
]

const components = [
  FormComponent,
  ListComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules,
  ]
})
export class StepModule {
}
