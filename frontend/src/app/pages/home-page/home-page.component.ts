import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  standalone: true,
  selector: 'app-home-page',
  imports: [RouterModule], 
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent { }
