import { Injectable } from '@angular/core';

export interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private suits: Array<'hearts' | 'diamonds' | 'clubs' | 'spades'> = [
    'hearts',
    'diamonds',
    'clubs',
    'spades',
  ];
  private values: string[] = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King',
    'Ace',
  ];
  private deck: Card[] = [];

  constructor() {
    this.createDeck();
  }

  // Crée un jeu complet de cartes
  createDeck(): void {
    this.deck = [];
    for (const suit of this.suits) {
      for (const value of this.values) {
        this.deck.push({ suit, value });
      }
    }
    this.shuffleDeck();
  }

  // Mélange les cartes
  shuffleDeck(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  // Distribue un certain nombre de cartes
  dealCards(count: number): Card[] {
    return this.deck.splice(0, count);
  }

  // Récupère la carte du dessus de la pioche
  drawCard(): Card | undefined {
    return this.deck.pop();
  }

  // Récupère le jeu restant
  getDeck(): Card[] {
    return this.deck;
  }
}
