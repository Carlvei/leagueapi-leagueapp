import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './summoners-search.component.html',
  styleUrls: ['./summoners-search.component.scss']
})
export class SummonersSearchComponent {
  summonerInput = '';

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  onSearchSummoner() {
    this.router.navigate(['overview'], {state: {name: this.summonerInput}, relativeTo: this.route})
  }
}
