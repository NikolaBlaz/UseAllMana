import { Injectable } from '@angular/core';
import {  BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  
  messagesSubject= new ReplaySubject<string>(2);
  messages$= this.messagesSubject.asObservable();

  clearLogsSubject= new Subject<void>();
  clearLogs$= this.clearLogsSubject.asObservable();

  constructor() {
    this.messagesSubject.next('Initializing...')
  }

  logMessage(message:string){
    this.messagesSubject.next(message);
  }
  clearLogs(){
    this.clearLogsSubject.next();
  }

  
}
