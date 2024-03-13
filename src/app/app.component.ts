import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Card } from './Models/Card';
import { GameService } from 'src/app/Services/game.service';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from './animations/routeTransition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef,private contexts: ChildrenOutletContexts) {}
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#121212';
  }
  
  getRouteAnimationData(){
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
