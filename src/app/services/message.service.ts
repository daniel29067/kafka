// message.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = 'http://localhost:8083'; // URL de tu API
  private sentMessages: string[] = [];
  public sentMessages$ = new Subject<string[]>();

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    this.sentMessages.push(message); // Almacena el mensaje enviado
    this.sentMessages$.next(this.sentMessages); // Emite los mensajes almacenados
    return this.http.post<any>(`${this.apiUrl}/send`, message );
  }

  consumeMessages(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/consume`, {});
  }
}
