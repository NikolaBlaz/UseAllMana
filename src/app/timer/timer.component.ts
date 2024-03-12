import { Component, OnInit } from '@angular/core';
import { GameService } from '../Services/game.service';
import { Observable, interval, map, tap } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit{
  timer$!:Observable<number>;
  constructor(private gameServer:GameService){}

  ngOnInit(): void {
    this.timer$=this.gameServer.countdown$;
  }


}
