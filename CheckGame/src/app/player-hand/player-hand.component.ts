import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-hand',
  standalone: true,
  imports: [CommonModule], // Importation du CommonModule
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.css']
})
export class PlayerHandComponent {
  @Input() cards: string[] = ["As_Carreau","cinq_Carreau","trois_Carreau","dix_Carreau","As_Carreau"]; // Liste des cartes du joueur

  ngOnInit() {
    console.log(this.cards);  // Affiche le tableau des cartes
  }
}
