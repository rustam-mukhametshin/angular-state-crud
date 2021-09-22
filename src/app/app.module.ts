import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { AppComponent } from './app.component';
import { CreateComponent } from './views/crud/create/create.component';
import { UpdateComponent } from './views/crud/update/update.component';
import { DeleteComponent } from './views/crud/delete/delete.component';
import { HomeComponent } from './views/crud/home/home.component';
import { ReadComponent } from './views/crud/read/read.component';
import { AppRouterModule } from './app-router.module';
import { ParentDynamicComponent } from './views/crud/parent-dynamic/parent-dynamic.component';
import { ChildDynamicComponent } from './views/crud/child-dynamic/child-dynamic.component';
import { ShowDynamicDirective } from './directives/show-dynamic.directive';

const modules = [
  BrowserModule,
  HttpClientModule,
  AppRouterModule,
  ReactiveFormsModule,
  FormlyModule.forRoot({extras: {lazyRender: true}}),
  FormlyBootstrapModule,
  BrowserAnimationsModule,
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
