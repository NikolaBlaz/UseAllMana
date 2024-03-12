import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CardListComponent } from './card-list/card-list.component';

const routes: Routes = [
{path:'',component:CardListComponent,pathMatch:'full'},
{path:'statistics',loadChildren: ()=> import('./statistics/statistics.module').then(m=>m.StatisticsModule)},
{path:'**', component:CardListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
