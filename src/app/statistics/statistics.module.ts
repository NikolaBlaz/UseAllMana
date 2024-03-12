import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistics/statistic.component';
import { StatisticsRoutingModule } from './statistics-routing.module';



@NgModule({
  declarations: [
    StatisticComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
  ],
  providers:[]
})
export class StatisticsModule { }
