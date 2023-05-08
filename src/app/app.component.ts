import { Component } from '@angular/core';
import {SummonersComponent} from "./summoners/summoners.component";
import {SummonersService} from "./summoners/summoners.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'leagueapp';
}
