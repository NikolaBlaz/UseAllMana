import { Injectable } from '@angular/core';
import { Card } from '../Models/Card';
import { from, concatMap, map, reduce, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoggerService } from './logger.service';
export interface CardCollection{
  [key: number]: Card[]
}
interface SelectedCard{
  cost:number,
  position:number
}
@Injectable({
  providedIn: 'root'
})
export class CardDrawService {
  cardCollection!:CardCollection;
  constructor(private httpClient:HttpClient,private logger:LoggerService) { }

  populateData() {
    const fileNames = ['allCards-cost-1.json',
     'allCards-cost-2.json',
     'allCards-cost-3.json',
     'allCards-cost-4.json',
     'allCards-cost-5.json',
     'allCards-cost-6.json',
     'allCards-cost-7.json',
     'allCards-cost-8.json',
     'allCards-cost-9.json',
     'allCards-cost-10.json'
    ];
    
    from(environment.fileNames).pipe(
      concatMap((fileName, index) => 
        this.httpClient.get<Card[]>(`${environment.firebaseDataUrl}${fileName}`).pipe(
          map(data => ({ [index + 1]: data }))
        )
      ),
      reduce((acc, data) => ({ ...acc, ...data }), {} as CardCollection),
      tap(cards => {
        this.cardCollection=cards
        this.logger.logMessage("Card data loaded")
      })
    ).subscribe({
      error: (error) => {
        this.logger.logMessage('There was an error with the data server!')
        this.logger.logMessage('Using local data')
        from(fileNames).pipe(
          concatMap((fileName, index) => 
            this.httpClient.get<Card[]>(`assets/data/${fileName}`).pipe(
              map(data => ({ [index + 1]: data }))
            )
          ),
          reduce((acc, data) => ({ ...acc, ...data }), {} as CardCollection),
          tap(cards => {
            this.cardCollection=cards
            this.logger.logMessage("Card data loaded")
          })
        ).subscribe({
          error: (error) => {
            this.logger.logMessage('Unable to load local data!')
            
          } 
        });
      } 
    });
    
  }

  getDraw ():Card[]{
    let selectedDraw = this.selectCardsToDraw();
    if(selectedDraw.length ==0) return []
    let chosenDraw:Card[] = []
    for (let index = 0; index < selectedDraw.length; index++) {
      const selectedCard = selectedDraw[index];
      let chosenCard = this.cardCollection[selectedCard.cost][selectedCard.position]
      chosenDraw.push(chosenCard)
    }
    return chosenDraw
  }

  

  private selectCardsToDraw():SelectedCard[] {
    if(!this.cardCollection) return []
    let selectedDraw: SelectedCard[] = [];
    let checkDistinctCost:Array<number>=[]
    for (let i = 0; i < 5; i++) {
      let costOfSelectedCard = Math.floor(Math.random() * Object.keys(this.cardCollection).length+ 1);
      if(checkDistinctCost.includes(costOfSelectedCard)){
        i--;
        continue;
      }
      checkDistinctCost.push(costOfSelectedCard)
      let selectedCardIndex = Math.floor(Math.random() * this.cardCollection[costOfSelectedCard].length);
      let selectedCard: SelectedCard = { cost: costOfSelectedCard, position: selectedCardIndex };
      if (!selectedDraw.includes(selectedCard)) {
        selectedDraw.push(selectedCard);
      }
      else {
        i--;
      }
    }
    return selectedDraw
  }
}
