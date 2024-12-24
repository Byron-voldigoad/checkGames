import { Component, OnInit } from '@angular/core';
import { PlayerHandComponent } from '../player-hand/player-hand.component';
import { DeckComponent } from '../deck/deck.component'; 
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  imports: [PlayerHandComponent, DeckComponent, CommonModule],
})
export class GameBoardComponent implements OnInit {
  player1Cards: string[] = [];
  player2Cards: string[] = [];
  playerCoverCards: string[] = [];
  player3Cards: string[] = [];
  player3CoverCards: string[] = [];
  middleCard: string = '';
  cardToAnimate: string = '';
  isAnimating: boolean = false;
  tour: number = Math.floor(Math.random() * 3) + 1; // 1: joueur 1, 2: ordinateur, 3 joueur 3
  n: number = 6;
  element: string = 'Back';
  showTurn: boolean = false; // Nouvelle variable pour contrôler la visibilité du titre
  showColorSelector: boolean = false;
  victoryMessage: string = ''; // Message à afficher
  showVictoryScreen: boolean = false; // Contrôle l'affichage de l'écran
  myVariable: string = '';



  deck: string[] = [
    "As_Carreau", "Deux_Carreau", "Trois_Carreau", "Quatre_Carreau", "Cinq_Carreau", "Six_Carreau", "Sept_Carreau", 
    "Huit_Carreau", "Neuf_Carreau", "Dix_Carreau", "Valet_Carreau", "Dame_Carreau", "Roi_Carreau",
    "As_Pic", "Deux_Pic", "Trois_Pic", "Quatre_Pic", "Cinq_Pic", "Six_Pic", "Sept_Pic", 
    "Huit_Pic", "Neuf_Pic", "Dix_Pic", "Valet_Pic", "Dame_Pic", "Roi_Pic",
    "As_Coeur", "Deux_Coeur", "Trois_Coeur", "Quatre_Coeur", "Cinq_Coeur", "Six_Coeur", "Sept_Coeur", 
    "Huit_Coeur", "Neuf_Coeur", "Dix_Coeur", "Valet_Coeur", "Dame_Coeur", "Roi_Coeur",
    "As_Trefle", "Deux_Trefle", "Trois_Trefle", "Quatre_Trefle", "Cinq_Trefle", "Six_Trefle", "Sept_Trefle", 
    "Huit_Trefle", "Neuf_Trefle", "Dix_Trefle", "Valet_Trefle", "Dame_Trefle", "Roi_Trefle",
    "lion_rouge", "lion_noir"
  ];

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.shuffleDeck();
    this.dealCards();
    this.placeMiddleCard();
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
    this.cdRef.detectChanges();
  }

  dealCards() {
    this.player1Cards = this.deck.splice(0, this.n);
    this.player2Cards = this.deck.splice(0, this.n);
    this.player3Cards = this.deck.splice(0, this.n);
    this.playerCoverCards = Array(this.n).fill(this.element);
    this.player3CoverCards = Array(this.n).fill(this.element);
    this.myVariable = `Le joueur ${this.tour} commence`;
    if (this.tour === 2) {
      this.computerPlay();
    }else if(this.tour === 3){
      this.computer2Play();
    }
  }

  placeMiddleCard() {
    const invalidCards = [
      'As_Carreau', 'As_Pic', 'As_Coeur', 'As_Trefle',
      'Deux_Carreau', 'Deux_Pic', 'Deux_Coeur', 'Deux_Trefle',
      'Sept_Carreau', 'Sept_Pic', 'Sept_Coeur', 'Sept_Trefle',
      'Valet_Carreau', 'Valet_Pic', 'Valet_Coeur', 'Valet_Trefle',
      'lion_rouge', 'lion_noir'
    ];

    while (this.deck.length > 0) {
      const card = this.deck.pop()!;
      if (!invalidCards.includes(card)) {
        this.middleCard = card;
        return;
      }
    }
    this.shuffleDeck();
    this.middleCard = this.deck.pop() || '';
  }

  handleCardClick(event: { card: string; index: number }): void {
    if (this.tour !== 1) {
      console.log("Ce n'est pas votre tour !");
      this.myVariable = "Ce n'est pas votre tour !";
     
      return;
    }
  
    const { card, index } = event;
  
    if (this.canPlayCard(card, this.middleCard)) {
      this.triggerAnimation(card, () => {
        // Cette logique est exécutée après la fin de l'animation
        this.deck.push(this.middleCard); // Ajoute l'ancienne carte au deck
        this.shuffleDeck();
        this.middleCard = card; // Met à jour la carte au centre
        this.player1Cards.splice(index, 1); // Retire la carte jouée
  
        // Gérer les effets des cartes spéciales après l'animation
        const cardValue = card.split('_')[0];
        if (cardValue === "Sept") {
          console.log("Le joueur suivant doit piocher deux cartes !");
          this.myVariable = "L'odinateur  doit piocher deux cartes !";
          this.forceDrawCards(2);
          return;
        } else if (cardValue === "Valet") {
          console.log("Changement de couleur !");
          this.changeColor();
          return;
        } else if (cardValue === "lion") {
          console.log("Le joueur suivant doit piocher quatre cartes !");
          this.myVariable = "L'odinateur  doit piocher quatre cartes !";
          this.forceDrawCards(4);
          return;
        }else if (cardValue === "As") {
          console.log("Le joueur suivant saute son tour !");
          this.myVariable = "L'odinateur saute son tour !";
          this.skipTurn();
          this.myVariable = 'On saute le joueur 2';
          return;
        }
  
        this.passTurn(); // Passe au tour suivant
      });
    } else {
      console.log('Cette carte ne peut pas être jouée !');
      this.myVariable = 'Cette carte ne peut pas être jouée !';
    }
  }
  

  forceDrawCards(count: number): void {
    if (this.tour === 1 && this.deck.length >= count) {
      for (let i = 0; i < count; i++) {
        const newCard = this.deck.pop()!;
        this.player2Cards.push(newCard);
        this.playerCoverCards.push("Back");
        
      }
    } else if (this.tour === 2 && this.deck.length >= count) {
      for (let i = 0; i < count; i++) {
        const newCard = this.deck.pop()!;
        this.player3Cards.push(newCard);
        this.player3CoverCards.push("Back");
      }
    }else if (this.tour === 3 && this.deck.length >= count) {
      for (let i = 0; i < count; i++) {
        const newCard = this.deck.pop()!;
        this.player1Cards.push(newCard);
      }
    } else {
      console.log("Pas assez de cartes dans le deck !");
    }
    this.passTurn();
  }
  changeColor(): void {
    if (this.tour === 1) {
      // Affiche la modal pour le joueur 1
      this.showColorSelector = true;
    } else if (this.tour === 2) {
      // Logique pour Le joueur 2 (choisir une couleur aléatoire)
      const colors = ["Carreau", "Coeur", "Trefle", "Pic"];
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      console.log(`Le joueur 2 a changé la couleur en ${newColor}`);
      this.myVariable = `Le joueur 2 a changé la couleur en ${newColor}`;
      this.middleCard = `Valet_${newColor}`;
      this.passTurn(); // Passe le tour après le changement de couleur
    } else if (this.tour === 3) {
      // Logique pour Le joueur 2 (choisir une couleur aléatoire)
      const colors = ["Carreau", "Coeur", "Trefle", "Pic"];
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      console.log(`Le Joueur 3 a changé la couleur en ${newColor}`);
      this.myVariable = `Le Joueur 3 a changé la couleur en ${newColor}`;
      this.middleCard = `Valet_${newColor}`;
      this.passTurn(); // Passe le tour après le changement de couleur
    }
  }
  skipTurn(): void {
    if (this.tour === 1) {
      this.tour = 3;
      
      this.computer2Play();
      
    } else if (this.tour === 2) {
      this.tour = 1;
    }else if (this.tour === 3) {
      this.tour = 2;
      this.computerPlay();
    }
  }
  selectColor(color: string): void {
    console.log(`Vous avez choisi la couleur : ${color}`);
    this.myVariable = `Vous avez choisi la couleur : ${color}`;
    this.middleCard = `Valet_${color}`;
    this.showColorSelector = false; // Masque la modal
    this.passTurn(); // Passe le tour après le changement de couleur
  }
    
    

  canPlayCard(card: string, middleCard: string): boolean {
    let cardColor = card.split('_')[1];
    const cardValue = card.split('_')[0];
    const middleCardColor = middleCard.split('_')[1];
    const middleCardValue = middleCard.split('_')[0];

    if ((card === "lion_noir" && (middleCardColor === "Pic" || middleCardColor === "Trefle")) ||
        (card === "lion_rouge" && (middleCardColor === "Coeur" || middleCardColor === "Carreau")) ||
        (middleCard === "lion_noir" && (cardColor === "Pic" || cardColor === "Trefle")) ||
        (middleCard === "lion_rouge" && (cardColor === "Coeur" || cardColor === "Carreau")) ||
        (cardValue === "Valet" && (middleCardColor === "Pic" || middleCardColor === "Trefle")) ||
        (cardValue === "Valet" && (middleCardColor === "Coeur" || middleCardColor === "Carreau")) ||
        (cardValue === "Deux" && (middleCardColor === "Pic" || middleCardColor === "Trefle")) ||
        (cardValue === "Deux" && (middleCardColor === "Coeur" || middleCardColor === "Carreau")) ||
        (middleCardValue === "Deux" && (cardColor === "Pic" || cardColor === "Trefle")) ||
        (middleCardValue === "Deux" && (cardColor === "Coeur" || cardColor === "Carreau")) ||
        cardColor === middleCardColor || cardValue === middleCardValue) {
      return true;
    }
    return false;
  }

  drawCard() {
    if (this.tour !== 1) {
      console.log("Ce n'est pas votre tour !");
      this.myVariable = "Ce n'est pas votre tour !";
      return;
    }
    if (this.deck.length > 0) {
      const newCard = this.deck.pop()!;
      this.player1Cards.push(newCard);
      this.shuffleDeck();
      this.passTurn();
    } else {
      console.log("Vous avez gagner");
      
    }
  }

 
  passTurn() {
    this.tour = this.tour === 3 ? 1 : this.tour + 1;

    this.showTurn = true; // Rendre visible pendant le tour
    setTimeout(() => {
      this.showTurn = false; // Cacher après 1500ms
       // Vérification des conditions de victoire
    if (this.player1Cards.length === 0) {
      this.victoryMessage = "Félicitations ! Vous avez gagné !";
      this.showVictoryScreen = true; // Affiche l'écran de victoire
      
      return;
    } else if (this.player2Cards.length === 0) {
      this.victoryMessage = "Le joueur 2 a gagné !";
      this.showVictoryScreen = true; // Affiche l'écran de victoire
      return;
    }else if (this.player3Cards.length === 0) {
      this.victoryMessage = "Le Joueur 3 a gagné !";
      this.showVictoryScreen = true; // Affiche l'écran de victoire
      return;
    }
  
      if (this.tour === 2) {
        this.computerPlay();
      }else if(this.tour === 3){
        this.computer2Play();
      }
    }, 1500);
  }
  

 computerPlay() {
  console.log("Tour de Le joueur 2...");
  // this.myVariable = "Tour de Le joueur 2...";

  const playableCardIndex = this.player2Cards.findIndex((card) =>
    this.canPlayCard(card, this.middleCard)
  );

  if (playableCardIndex !== -1) {
    const card = this.player2Cards[playableCardIndex];
    this.triggerAnimation(card, () => {
      this.deck.push(this.middleCard); // Ajouter la carte jouée au deck
      this.shuffleDeck();
      this.middleCard = card;
      this.player2Cards.splice(playableCardIndex, 1);
      this.playerCoverCards.splice(playableCardIndex, 1);

      // Gérer les effets des cartes spéciales
      const cardValue = card.split('_')[0];
      if (cardValue === "Sept") {
        console.log("Le joueur suivant doit piocher deux cartes !");
        this.myVariable = "Le joueur 3 doit piocher deux cartes !";
        this.forceDrawCards(2);
        return;
      } else if (cardValue === "Valet") {
        console.log("Changement de couleur !");
        this.changeColor();
        return; // Arrête le tour de Le joueur 2 après avoir changé de couleur
      }else if (cardValue === "lion") {
        console.log("Le joueur suivant doit piocher quatre cartes !");
        this.myVariable = "Le joueur 3 doit piocher quatre cartes !";
        this.forceDrawCards(4);
        return;
      }else if (cardValue === "As") {
        console.log("Le joueur suivant saute son tour !");
        this.myVariable = "Le joueur 3 saute son tour !";
        this.skipTurn();
        this.myVariable = 'On saute le joueur 3';
        return;
      }

      this.passTurn();
    });
  } else {
    console.log("Le joueur 2 pioche une carte...");
    this.myVariable = "Le joueur 2 pioche une carte...";
    if (this.deck.length > 0) {
      const newCard = this.deck.pop()!;
      this.player2Cards.push(newCard);
      this.playerCoverCards.push("Back");
      this.shuffleDeck();
    }
    this.passTurn();
    if (this.player2Cards.length === 0) {
      console.log("Vous avez gagner !!!");

    }
  }
}

computer2Play() {
  console.log("Tour du joueur 3...");
  // this.myVariable = "Tour du jouer 3";

  const playableCardIndex = this.player3Cards.findIndex((card) =>
    this.canPlayCard(card, this.middleCard)
  );

  if (playableCardIndex !== -1) {
    const card = this.player3Cards[playableCardIndex];
    this.triggerAnimation(card, () => {
      this.deck.push(this.middleCard); // Ajouter la carte jouée au deck
      this.shuffleDeck();
      this.middleCard = card;
      this.player3Cards.splice(playableCardIndex, 1);
      this.player3CoverCards.splice(playableCardIndex, 1);

      // Gérer les effets des cartes spéciales
      const cardValue = card.split('_')[0];
      if (cardValue === "Sept") {
        console.log("Le joueur suivant doit piocher deux cartes !");
        this.myVariable = "Le joueur 1 doit piocher deux cartes !";
        this.forceDrawCards(2);
        return;
      } else if (cardValue === "Valet") {
        console.log("Changement de couleur !");
        this.changeColor();
        return; // Arrête le tour de Le joueur 2 après avoir changé de couleur
      }else if (cardValue === "lion") {
        console.log("Le joueur suivant doit piocher quatre cartes !");
        this.myVariable = "Le joueur 1 doit piocher quatre cartes !";
        this.forceDrawCards(4);
        return;
      }else if (cardValue === "As") {
        console.log("Le joueur 1 saute son tour !");
        this.myVariable = "Le joueur suivant saute son tour !";
        this.skipTurn();
        this.myVariable = 'On saute le joueur 1';
        return;
      }

      this.passTurn();
    });
  } else {
    console.log("Le joueur 2 pioche une carte...");
    this.myVariable = "Le joueur 2 pioche une carte...";
    if (this.deck.length > 0) {
      const newCard = this.deck.pop()!;
      this.player3Cards.push(newCard);
      this.player3CoverCards.push("Back");
      this.shuffleDeck();
    }
    this.passTurn();
    if (this.player3Cards.length === 0) {
      console.log("Vous avez gagner !!!");

    }
  }
}
  

triggerAnimation(card: string, callback: () => void) {
  this.cardToAnimate = card;
  this.isAnimating = true;
  setTimeout(() => {
    this.isAnimating = false;
    this.cardToAnimate = '';
    this.shuffleDeck(); // Mélanger pour plus de diversité
    callback();
  }, 1000);
}


restartGame() {
  this.player1Cards = [];
  this.player2Cards = [];
  this.player3Cards = [];
  this.middleCard = '';
  this.showVictoryScreen = false;
  this.victoryMessage = '';
  this.tour = 1;

  // Reconfigurez le jeu
  this.shuffleDeck();
  this.dealCards();
  this.placeMiddleCard();
}


}
