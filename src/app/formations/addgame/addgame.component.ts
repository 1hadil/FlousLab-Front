import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-addgame',
  standalone: true,
    imports: [FormsModule,CommonModule,MatCardModule,MatButtonModule,RouterLink,MatFormFieldModule,MatInputModule,],
  
  templateUrl: './addgame.component.html',
  styleUrl: './addgame.component.scss'
})
export class AddgameComponent  implements OnInit {
  games: any[] = [];
  newGame = { idGame: null, name: '', description: '', level: '' };
  selectedGame: any = null;

  constructor(private gameService: GameService
    , private route: ActivatedRoute // Inject ActivatedRoute
  ) {}
  courseId!: number; // To hold the ID from the URL

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = +params['id']; // Convert to number
    });
  }



  addGame(): void {
    
    this.gameService.addGame(this.newGame, this.courseId).subscribe((game) => {
    alert('Game added successfully');
      this.newGame = { idGame: null, name: '', description: '', level: '' };
    });
  }




}

