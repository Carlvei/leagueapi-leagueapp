import {Component, Input, OnInit} from '@angular/core';
import {MatchhistoryService} from "./matchhistory.service";
import {MatchhistoryEntryOverview} from "./model/matchhistory-entry-overview.model";
import {ParticipantOverview} from "./model/participant-overview.model";

@Component({
  selector: 'app-matchhistory',
  templateUrl: './matchhistory.component.html',
  styleUrls: ['./matchhistory.component.scss']
})
export class MatchhistoryComponent implements OnInit {
  @Input() summonerName: string = '';
  matchhistoryEntries: MatchhistoryEntryOverview[] = [];

  constructor(private matchhistoryService: MatchhistoryService) {
  }

  ngOnInit(): void {
    this.matchhistoryService.queryMatchhistory(this.summonerName)
      .subscribe((response) => {
        this.matchhistoryEntries = response
        console.log(this.matchhistoryEntries)
      })
  }
}
