import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateComponent } from './views/create/create.component';
import { UpdateComponent } from './views/update/update.component';
import { DeleteComponent } from './views/delete/delete.component';
import { HomeComponent } from './views/home/home.component';
import { ReadComponent } from './views/read/read.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
    HomeComponent,
    ReadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
