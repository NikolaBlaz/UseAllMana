import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardHolderComponent } from './card-holder/card-holder.component';
import { CardListComponent } from './card-list/card-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HowToComponent } from './how-to/how-to.component';
import { TimerComponent } from './timer/timer.component';
import { ColorTimePipe } from './pipes/color-time.pipe';
import { LogbookComponent } from './logbook/logbook.component';


@NgModule({
  declarations: [
    AppComponent,
    CardHolderComponent,
    CardListComponent,
    NavBarComponent,
    HowToComponent,
    TimerComponent,
    ColorTimePipe,
    LogbookComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
