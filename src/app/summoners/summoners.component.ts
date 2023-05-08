import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {SummonersService} from "./summoners.service";
import {Summoner} from "./search/summoner.model";

@Component({
  selector: 'app-summoners',
  templateUrl: './summoners.component.html',
  styleUrls: ['./summoners.component.scss']
})
export class SummonersComponent implements OnInit {
  summoner: Summoner | undefined;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private summonersService: SummonersService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const summonerName = params['summoner'];
        this.summonersService.querySummoner(summonerName)
          .subscribe((response) => {
              this.summoner = response;
            }
          )
      }
    )
  }
}
