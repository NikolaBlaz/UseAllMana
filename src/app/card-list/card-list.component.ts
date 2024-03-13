import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../Models/Card';
import { GameService, GameStatus } from '../Services/game.service';
import { Observable, Subscription, concatMap, delay, interval, map, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit, OnDestroy{
  gameRunning:boolean=false;
  isFinished:boolean=false;
  
  cards$!: Observable<Card[]>;
  score$!:Observable<number>;
  round$!:Observable<number>;
  gameStatusSub!:Subscription;

  constructor(private gameServer:GameService,private router:Router){}

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
      if(this.gameRunning ){
        this.nextRound();
      }
    }
  }
  
  ngOnInit(): void {
    this.cards$ = this.gameServer.rounds$;
    this.score$ = this.gameServer.score$;
    this.round$ = this.gameServer.numOfRounds$;
    this.gameStatusSub=this.gameServer.gameStatus$.subscribe(
      status=>{
        this.processStatus(status);
      }
    );
  }
  private processStatus(status:GameStatus){
  
    switch(status){
      case GameStatus.Finished: {
        this.gameRunning=false
        this.isFinished=true
        break
      }
      case GameStatus.Running: {
        this.gameRunning=true
        this.isFinished=false
        break
      }
      case GameStatus.Waiting:{
        this.gameRunning=false
        this.isFinished=false
        break
      }
      
    }
  }
  startGame(){
    this.gameServer.startGame();
    this.nextRound();
  }

  showStats(){
    this.router.navigate(['\statistics'])
  }
  nextRound(){
    this.gameServer.getNextRound();
  }
  ngOnDestroy(): void {
    this.gameStatusSub.unsubscribe();
  }
}