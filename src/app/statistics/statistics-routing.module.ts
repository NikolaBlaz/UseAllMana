import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StatisticComponent } from "./statistics/statistic.component";
import { DummyGuard } from "./auth.guard";

const routes:Routes = [
    
    {path:'', canActivate: [DummyGuard], component:StatisticComponent, children:[
        {path:'',component:StatisticComponent,pathMatch:'full'}, 
    ]},
    
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatisticsRoutingModule{

}