import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { CrudRouterModule } from './crud.router.module';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { HomeComponent } from './home/home.component';
import { ReadComponent } from './read/read.component';
import { ParentDynamicComponent } from './parent-dynamic/parent-dynamic.component';
import { ChildDynamicComponent } from './child-dynamic/child-dynamic.component';
import { ShowDynamicDirective } from '../../directives/show-dynamic.directive';
import { SharedModule } from '../../modules/shared.module';


@NgModule({
  declarations: [
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
    SharedModule,
    CrudRouterModule,
  ]
})
export class CrudModule {
}
