import { Card } from "./Card";
export interface PickedCard{
    cost:number,
    id:string
  }
export class GameState {
    constructor(
        public cardsNotPicked:PickedCard[]=[],
        public currentRoundDraw:Card[]=[],
        public currentRound:number=0,
        public correctPickStreak:number=0,
        public currentScore:number=0,
        public failedPicks:number=0,
        public highestScore:number=0,
        public roundsSkipped:number=0,
        public lowestScore:number=0
      ) {}
    
}