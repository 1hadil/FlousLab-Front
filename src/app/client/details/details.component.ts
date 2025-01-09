import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContestService } from 'src/app/services/contest.service';
import { GameService } from 'src/app/services/game.service';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-details',
  standalone: true,
   imports: [CommonModule,FormsModule,MatCardModule,MatButtonModule,RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  idcourse!: number;
  contests:any[]=[];
  lessons:any[]=[];
constructor(private contest:ContestService,private lesson:LessonService,private game:GameService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idcourse = +params['id']; // Convert to number
    });
    this.contest.getAllContestsbycourse(this.idcourse).subscribe(data => {
      console.log("contests"+data);
      
      this.contests = data;
    });
     this.lesson.getLessonsbycourse(this.idcourse).subscribe(data => {
      console.log(data);
      
      this.lessons = data;
  })

}
games: any[] = [];
open: boolean = false;
getgame(id:number){
  this.game.getAllGamesbycontest(id).subscribe(data => {
    console.log(data);
    this.games = data;
    this.open = true;
  })  
}

}