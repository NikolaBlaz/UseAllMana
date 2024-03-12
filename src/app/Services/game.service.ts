import { Injectable } from '@angular/core';
import { Card } from '../Models/Card';
import { BehaviorSubject,  ReplaySubject,  Subject, map,  takeWhile, tap, timer, toArray } from 'rxjs';
import { CardDrawService } from './card-draw.service';
import { LoggerService } from './logger.service';
import { GameState, PickedCard } from '../Models/GameState';


export enum PickedStatus {
  Neutral='Neutral',
  Locked='Locked',
  Failed='Failed',
  Success='Success'
}
export enum GameStatus {
  Waiting,
  Running,
  Finished
}
@Injectable({
  providedIn: 'root'
})
export class GameService {
  private roundsSubject = new Subject<Card[]>()
  rounds$ = this.roundsSubject.asObservable();

  private gameStatusSubject = new BehaviorSubject<GameStatus>(GameStatus.Waiting);
  gameStatus$ = this.gameStatusSubject.asObservable();

  private numOfRoundsSubject = new BehaviorSubject<number>(0);
  numOfRounds$ = this.numOfRoundsSubject.asObservable();

  private scoreSubject = new BehaviorSubject<number>(0);
  score$ = this.scoreSubject.asObservable();

  private  countdownSubject = new BehaviorSubject<number>(60);
  countdown$ = this.countdownSubject.asObservable();

  private  statisticSubject = new ReplaySubject<GameState>(1);
  statistic$ = this.statisticSubject.asObservable();

  private gameState:GameState;
  private streakMultiplier:number = 0.7;
  private incorrectPickScoreReduction:number = -3;

  constructor(private cardDrawService:CardDrawService,
    private logger:LoggerService
    ) { 
    this.cardDrawService.populateData();
    this.logger.logMessage("Loading card data");
    this.gameState=new GameState();  
  }

  public startGame(){
    this.gameStatusSubject.next(GameStatus.Running);
    timer(1000, 1000).pipe(
      map(() => this.countdownSubject.value - 1),
      tap(count => {
        this.countdownSubject.next(count);
        if (count === 0) {
         this.finishGame();
        }}),
      takeWhile(count => count > 0),
      
    ).subscribe();
    this.logger.clearLogs();
    this.logger.logMessage("Game started!");
  }

  public checkCard(card:Card):PickedStatus{
   
    let indexToRemove = this.gameState.cardsNotPicked.findIndex(elem=>elem.id==card.id);

    if(indexToRemove == -1) return PickedStatus.Locked

    if(indexToRemove != 0) {
      this.gameState.correctPickStreak=0;
      this.gameState.failedPicks++;
      this.gameState.currentScore= this.gameState.currentScore + this.incorrectPickScoreReduction;
      if(this.gameState.currentScore<this.gameState.lowestScore) this.gameState.lowestScore=this.gameState.currentScore;
      this.scoreSubject.next(this.gameState.currentScore);
      this.logger.logMessage(`Wrong choice: ${this.incorrectPickScoreReduction} points`);
      this.logger.logMessage('Correct pick streak: '+ this.gameState.correctPickStreak);
      return PickedStatus.Failed
    } 

    this.gameState.correctPickStreak++;
    let pointsAdded= Math.ceil(this.gameState.correctPickStreak*this.streakMultiplier);
    this.logger.logMessage(`Correct choice: +${pointsAdded} points`);
    this.logger.logMessage('Correct pick streak: '+ this.gameState.correctPickStreak);

    this.gameState.currentScore += pointsAdded;
    if(this.gameState.currentScore>this.gameState.highestScore) this.gameState.highestScore=this.gameState.currentScore;
    this.scoreSubject.next(this.gameState.currentScore);
    this.gameState.cardsNotPicked.shift();

    if(this.gameState.cardsNotPicked.length ==0){
      this.getNextRound();
    }

    return PickedStatus.Success
  }
 
  public getNextRound(){
    if(this.gameState.cardsNotPicked.length > 0) {
      this.gameState.roundsSkipped++;
      this.gameState.currentScore -= this.gameState.roundsSkipped;
      if(this.gameState.currentScore<this.gameState.lowestScore) this.gameState.lowestScore=this.gameState.currentScore;
      this.scoreSubject.next(this.gameState.currentScore);
    }
    this.gameState.currentRoundDraw = this.cardDrawService.getDraw();
    this.gameState.cardsNotPicked= this.gameState.currentRoundDraw.map<PickedCard>(card=>  ({
      cost: card.cost,
      id: card.id
    }));
    this.gameState.cardsNotPicked.sort((a,b)=> a.cost-b.cost);
    this.gameState.currentRound++;

    this.roundsSubject.next(this.gameState.currentRoundDraw);
    this.numOfRoundsSubject.next(this.gameState.currentRound);

    this.logger.logMessage('Round: ' + this.gameState.currentRound);
  }

  private finishGame(){
    this.statisticSubject.next({...this.gameState});
    const newGameState = new GameState();
    Object.assign(this.gameState,newGameState);
    this.notifiySubjectsOnGameFinished();

    this.logger.logMessage('Game over!');
  }
  private notifiySubjectsOnGameFinished() {
      this.gameStatusSubject.next(GameStatus.Finished);
      this.roundsSubject.next(this.gameState.currentRoundDraw);
      this.numOfRoundsSubject.next(this.gameState.currentRound);
      this.scoreSubject.next(this.gameState.currentScore);
      this.countdownSubject.next(60);
      
  }
}


