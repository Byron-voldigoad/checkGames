import { Component, OnInit } from '@angular/core';
import { PlayerHandComponent } from '../player-hand/player-hand.component';
import { DeckComponent } from '../deck/deck.component'; 
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  imports: [PlayerHandComponent, DeckComponent,CommonModule],  // Ajoute les composants standalone ici
})
export class GameBoardComponent implements OnInit {
  player1Cards = ["As_Carreau","Cinq_Carreau","Trois_Carreau"];
  player2Cards = ["Back","Back","Back"];


  deck = ["As_Carreau", "Cinq_Carreau", "Trois_Carreau", "Dix_Carreau", "Roi_Carreau", "Dame_Carreau", "Valet_Carreau",
  "As_Pique", "Cinq_Pique", "Trois_Pique", "Dix_Pique", "Roi_Pique", "Dame_Pique", "Valet_Pique",
  "As_Coeur", "Cinq_Coeur", "Trois_Coeur", "Dix_Coeur", "Roi_Coeur", "Dame_Coeur", "Valet_Coeur",
  "As_Trefle", "Cinq_Trefle", "Trois_Trefle", "Dix_Trefle"];

  constructor(private cdRef: ChangeDetectorRef) {}

  // ngOnInit(): void { }
  ngOnInit() {
    console.log('Avant mélange:', this.deck);
    this.shuffleArray();  // Mélange des cartes dès l'initialisation du composant
    console.log('Après mélange:', this.deck); // Log des cartes avant le mélange
  }

  shuffleArray() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]; // Échange des éléments
    }
    
    
    this.cdRef.detectChanges(); // Force la détection des changements
  }
}



