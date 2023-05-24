import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {SummonersService} from "../summoners.service";
import {Summoner} from "../models/summoner.model";
import {map} from "rxjs";

@Component({
  selector: 'app-summoners',
  templateUrl: './summoners.component.html',
  styleUrls: ['./summoners.component.scss']
})
export class SummonersComponent implements OnInit {
  summoner: Summoner | undefined;

  constructor(private http: HttpClient,
              private summonersService: SummonersService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(data => {
          this.summonersService.querySummoner(data.name)
            .subscribe((response) => {
                this.summoner = response;
              }
            )
        }
      );
  }
}
