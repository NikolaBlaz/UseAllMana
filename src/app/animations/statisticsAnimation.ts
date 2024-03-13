import { trigger, transition, query, style, stagger, animate } from "@angular/animations";

export const statisticsAnimation =  trigger('statisticAnimation', [
    transition('* => *', [
      query(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        stagger(400, [
          animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
        ])
      ], { optional: true })
    ])
  ])