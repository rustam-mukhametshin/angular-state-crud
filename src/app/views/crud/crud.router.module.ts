import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ReadComponent } from './read/read.component';
import { DeleteComponent } from './delete/delete.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'update/:id',
    component: UpdateComponent,
  },
  {
    path: 'read/:id',
    component: ReadComponent,
  },
  {
    path: 'delete/:id',
    component: DeleteComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class CrudRouterModule {

}
