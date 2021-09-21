import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { AppComponent } from './app.component';
import { CreateComponent } from './views/create/create.component';
import { UpdateComponent } from './views/update/update.component';
import { DeleteComponent } from './views/delete/delete.component';
import { HomeComponent } from './views/home/home.component';
import { ReadComponent } from './views/read/read.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRouterModule } from './app-router.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ParentDynamicComponent } from './views/parent-dynamic/parent-dynamic.component';
import { ChildDynamicComponent } from './views/child-dynamic/child-dynamic.component';
import { ShowDynamicDirective } from './directives/show-dynamic.directive';
import { CustomAsyncValidatorDirective } from './directives/custom-async-validator.directive';

const modules = [
  BrowserModule,
  HttpClientModule,
  AppRouterModule,
  ReactiveFormsModule,
  FormlyModule.forRoot({extras: {lazyRender: true}}),
  FormlyBootstrapModule,
]

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
    HomeComponent,
    ReadComponent,
    ParentDynamicComponent,
    ChildDynamicComponent,
    ShowDynamicDirective,
  ],
  imports: [
    ...modules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
