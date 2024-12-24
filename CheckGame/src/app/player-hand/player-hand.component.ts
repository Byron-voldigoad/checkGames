import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-hand',
  standalone: true,
  imports: [CommonModule], // Importation du CommonModule
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.css']
})

export class PlayerHandComponent {
  @Input() cards: string[] = []; // Liste des cartes du joueur
  @Input() isOpponent: boolean = false;
  @Output() cardClicked = new EventEmitter<{ card: string; index: number }>();

  ngOnInit() {
    console.log(this.cards);  // Affiche le tableau des cartes
  }

  getCardStyle(index: number, total: number) {
    // Angle maximal entre la carte la plus à gauche et la carte la plus à droite
    const angle = this.isOpponent ? 6 : 20; // Réduit l'angle pour l'adversaire
    const offset = (index - (total - 1) / 2) * 30; // Distance horizontale relative
    const rotation = angle * ((index - (total - 1) / 2) / ((total - 1) / 2));
  
    // Inversion pour l'adversaire
    if (this.isOpponent) {
      return {
        transform: `rotate(${-rotation}deg) translateX(${offset}px) translateY(-20px)` // Inclinaison inversée
      };
    }
  
    // Inclinaison normale pour le joueur
    return {
      transform: `rotate(${rotation}deg) translateX(${offset}px) translateY(20px)` // Inclinaison normale
    };
  }
  
 

  onCardClick(card: string, index: number): void {
    if (!this.isOpponent) {
      this.cardClicked.emit({ card, index });
    }
  }
  

}
