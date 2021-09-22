import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { StepRouterModule } from './step.router.module';

const modules = [
  CommonModule,
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
