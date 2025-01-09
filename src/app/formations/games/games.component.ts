import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [FormsModule,CommonModule,MatCardModule,MatButtonModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit {
  games: any[] = [];
  newGame = { idGame: null, name: '', description: '', level: '' };
  selectedGame: any = null;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames(): void {
    this.gameService.getAllGames().subscribe((data) => {
      console.log(data);
      this.games = data;
    });
  }

  addGame(): void {
    const id = 4; // Example parent ID
    this.gameService.addGame(this.newGame, id).subscribe((game) => {
      this.games.push(game);
      this.newGame = { idGame: null, name: '', description: '', level: '' };
    });
  }

  selectGame(game: any): void {
    this.selectedGame = { ...game };
  }

  updateGame(): void {
    if (this.selectedGame) {
      this.gameService.updateGame(this.selectedGame).subscribe((updatedGame) => {
        const index = this.games.findIndex((g) => g.idGame === updatedGame.idGame);
        if (index > -1) {
          this.games[index] = updatedGame;
        }
        this.selectedGame = null;
      });
    }
  }

  deleteGame(id: number): void {
    this.gameService.deleteGame(id).subscribe(() => {
      this.games = this.games.filter((game) => game.idGame !== id);
    });
  }
}
