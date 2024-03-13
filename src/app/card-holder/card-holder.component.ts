import { Component, Input } from '@angular/core';
import { Card } from '../Models/Card';
import { GameService, PickedStatus } from '../Services/game.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { cardPickedAnimation, costBoxAnimation } from '../animations/cardAnimations';

@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.css'],
  animations:[
    cardPickedAnimation,
    costBoxAnimation,
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms', style({ opacity: 1 })),
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
