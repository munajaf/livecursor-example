import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
  private socket: any;
  public cursorStyle = { left: '0px', top: '0px', name: '' };

  ngOnInit(): void {
    this.socket = io('http://localhost:3200');

    this.socket.on('move cursor', (position: any) => {
      this.cursorStyle.left = `${position.x}px`;
      this.cursorStyle.top = `${position.y}px`;
      this.cursorStyle.name = `${position.name}`;
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.socket.emit('move cursor', { x: event.clientX, y: event.clientY, name: 'Angular' });
  }
}
