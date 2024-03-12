import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { GameState } from 'src/app/Models/GameState';
import {  GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
  animations: [
    trigger('statisticAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-100%)' }),
          stagger(400, [
            animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class StatisticComponent implements OnInit{
  gameStatistics:GameState= new GameState()
  statisticItems: { label: string, value: any }[] = [];
  constructor(private gameServer:GameService){

  }
  ngOnInit(): void {
    this.gameServer.statistic$.subscribe(
      gameState => {
        this.gameStatistics = gameState
        this.populateStatisticItems();
      }
    )
  }
 
  populateStatisticItems(): void {
    this.statisticItems = [
      { label: 'Final Score', value: this.gameStatistics.currentScore },
      { label: 'Rounds played', value: this.gameStatistics.currentRound },
      { label: 'Correct Pick Streak', value: this.gameStatistics.correctPickStreak },
      { label: 'Failed Picks', value: this.gameStatistics.failedPicks },
      { label: 'Rounds Skipped', value: this.gameStatistics.roundsSkipped },
      { label: 'Highest Score Achieved', value: this.gameStatistics.highestScore },
      { label: 'Lowest Score Achieved', value: this.gameStatistics.lowestScore }
    ];
  }

}
