import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Importer AppComponent
import { PlayerHandComponent } from './player-hand/player-hand.component'; // Importer PlayerHandComponent
import { GameBoardComponent } from './game-board/game-board.component'; // Importer GameBoardComponent

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter([]), // Ajouter vos routes ici si nécessaire
  ],
};
