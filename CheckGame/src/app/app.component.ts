import { Component } from '@angular/core';
import { GameBoardComponent } from './game-board/game-board.component';
import { DeckComponent } from './deck/deck.component';
import { PlayerHandComponent } from './player-hand/player-hand.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { CommonModule } from '@angular/common';
import { GameRulesComponent } from './game-rules/game-rules.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    GameBoardComponent,
    DeckComponent,
    PlayerHandComponent,
    GameMenuComponent,
    GameRulesComponent,
  ],
})
export class AppComponent {
  title = 'CheckGame';
  currentView: 'menu' | 'game' | 'rules' = 'menu'; // Utiliser une seule propriété pour les états

  startGame() {
    this.currentView = 'game'; // Passer à la vue du jeu
  }

  showRules() {
    this.currentView = 'rules'; // Passer à la vue des règles
  }

  showMenu() {
    this.currentView = 'menu'; // Retourner au menu principal
  }
}
