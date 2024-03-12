import { Component, Input } from '@angular/core';
import { Card } from '../Models/Card';
import { GameService, PickedStatus } from '../Services/game.service';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.css'],
  animations:[
    trigger('statusChange',[
      state('Neutral', style({
        boxShadow: 'none'
      })),
      state('Locked', style({
        boxShadow: 'inset 10px 2px 100px white'
      })),
      state('Success', style({
        boxShadow: 'inset 10px 2px 100px green'
      })),
      state('Failed', style({
        boxShadow: 'inset 10px 2px 100px red'
      })),
      transition('Neutral => Success', [
        animate('0.5s')
      ]),
      transition('Success => Locked', [
        animate('0.1s')
      ]),
      transition('Neutral => Failed', [
        animate('0.2s')
      ]),
      transition('Failed => Neutral', [
        animate('0.1s')
      ]),
      transition('Locked => Neutral', [
        animate('0.1s')
      ]),
    ]),
    trigger('revealCost',[
      
      state('Locked', style({
        opacity:0
      })),
      state('Success', style({
        opacity:0
      })),
      transition('*=>Success',[
        animate('0.1s')
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ])
    ])
   
  ]
})
export class CardHolderComponent {
  @Input('card') card!:Card;
  lastStatus:PickedStatus=PickedStatus.Neutral;
  isDisabled=false;

  constructor(private gameServer:GameService){}
  
  checkCost(){
    if(this.lastStatus!= PickedStatus.Locked && !this.isDisabled){
      this.lastStatus= this.gameServer.checkCard(this.card);
      if(this.lastStatus == PickedStatus.Success){
        this.isDisabled=true;
        setTimeout(()=>{
          this.lastStatus=PickedStatus.Locked
          this.isDisabled=false;
        },1000)
        
      }else if(this.lastStatus == PickedStatus.Failed){
        this.isDisabled=true;
        setTimeout(()=>{
          this.lastStatus=PickedStatus.Neutral
          this.isDisabled=false;
        },1000)
      }
    }
  }
}
