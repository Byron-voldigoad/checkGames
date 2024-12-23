import { Component } from '@angular/core';
import { GameBoardComponent } from './game-board/game-board.component';
import { DeckComponent } from './deck/deck.component';
import { PlayerHandComponent } from './player-hand/player-hand.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule,GameBoardComponent, DeckComponent, PlayerHandComponent,GameMenuComponent],
})
export class AppComponent {
  title = 'CheckGame';
  isGameStarted = false; // Par défaut, afficher le menu

  startGame() {
    this.isGameStarted = true; // Passer à la vue du jeu
  }
}
