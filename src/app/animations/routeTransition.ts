import { trigger, transition, style, query, animateChild, group, animate } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* => homePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          transform: 'translateX(0%) translateY(0%)',
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ transform: 'translateX(100%)' })
      ], { optional: true }),
      group([
        query(':leave', [
          animate('400ms ease-in', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
        query(':enter', [
          animate('400ms ease-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
      ]),
    ])
  ]);