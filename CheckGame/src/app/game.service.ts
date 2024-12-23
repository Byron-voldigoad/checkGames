import { Injectable } from '@angular/core';
import { DeckService, Card } from './deck.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  playerHand: Card[] = [];
  opponentHand: Card[] = [];
  centerPile: Card[] = [];

  constructor(private deckService: DeckService) {}

  startGame(): void {
    this.deckService.createDeck();
    this.playerHand = this.deckService.dealCards(6);
    this.opponentHand = this.deckService.dealCards(6);

    // Pose une carte au centre (mais pas un Lion)
    let firstCard;
    do {
      firstCard = this.deckService.drawCard();
    } while (firstCard?.value === 'Joker');
    if (firstCard) {
      this.centerPile.push(firstCard);
    }
  }
}
export type { Card };

