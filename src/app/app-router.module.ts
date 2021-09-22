import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'step'
  },
  {
    path: 'step',
    loadChildren: () => import('./views/step/step.module').then(res => res.StepModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./views/crud/crud.module').then(m => m.CrudModule),
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRouterModule {

}
