import { Component,NgModule,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from './services/message.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HttpClientModule,RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  sentMessages: string[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // Suscríbete al flujo de mensajes enviados
    this.messageService.sentMessages$.subscribe(messages => {
      this.sentMessages = messages;
    });
  }

  sendMessage(message: string): void {
    this.messageService.sendMessage(message).subscribe(
      response => {
        console.log('Mensaje enviado correctamente:', response);
        // Lógica adicional si es necesario
      },
      error => {
        console.error('Error al enviar el mensaje:', error);
      }
    );
  }

  consumeMessages(): void {
    this.messageService.consumeMessages().subscribe(
      response => {
        console.log('Mensajes consumidos correctamente:', response);
        // Lógica adicional si es necesario
      },
      error => {
        console.error('Error al consumir mensajes:', error);
      }
    );
  }
}