import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggerService } from '../Services/logger.service';

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css']
})
export class LogbookComponent implements AfterViewInit {
  logs: string[] = [];
  private logMessagesSubscription!: Subscription;
  private logClearedSubscription!: Subscription;
  @ViewChild('logContainer') private logContainer!: ElementRef;

  constructor(private loggerService: LoggerService) { }
  
  ngAfterViewInit(): void {
    this.logMessagesSubscription = this.loggerService.messages$.subscribe(message => {
      this.logs.push(message);
      this.scrollOnInsert();
    });
    this.logClearedSubscription = this.loggerService.clearLogs$.subscribe( _ =>{
      this.logs = []
    })
  }

  

  private scrollOnInsert() {
    try {
      setTimeout(() => {
        this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight;
      });
    } catch(error) { 
      console.log(error);
    }
  }

  ngOnDestroy() {
    this.logMessagesSubscription.unsubscribe();
  }
}
