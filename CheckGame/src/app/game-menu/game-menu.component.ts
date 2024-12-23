import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent {
  @Output() startGameEvent = new EventEmitter<void>();

  startSolo() {
    this.startGameEvent.emit(); // Émet un événement pour signaler que le jeu doit démarrer
  }
}
