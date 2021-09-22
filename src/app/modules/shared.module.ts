import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { CommonModule } from '@angular/common';

const modules = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormlyBootstrapModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...modules,
    FormlyModule.forRoot({extras: {lazyRender: true}}),
  ],
  exports: [
    ...modules,
    FormlyModule,
  ]
})
export class SharedModule {
}
