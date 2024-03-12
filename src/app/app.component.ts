import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Card } from './Models/Card';
import { GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#121212';
  }
  
}
