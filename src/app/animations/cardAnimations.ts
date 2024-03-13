import { trigger, transition, style, query, group, animate, state } from "@angular/animations";

export const cardPickedAnimation =
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
  ]);

export const costBoxAnimation=
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
  ]);