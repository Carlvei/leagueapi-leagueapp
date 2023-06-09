import {Component, Input, OnInit} from "@angular/core";
import {MatchhistoryService} from "../matchhistory.service";
import {MatchhistoryEntryOverview} from "./model/matchhistory-entry-overview.model";

@Component({
  selector: 'app-matchhistory',
  templateUrl: './matchhistory.component.html',
  styleUrls: ['./matchhistory.component.scss']
})
export class MatchhistoryComponent implements OnInit {
  @Input() public summonerName: string = '';
  public matchhistoryEntries: MatchhistoryEntryOverview[] = [];
  public isLoading = false;

  constructor(private matchhistoryService: MatchhistoryService) {
  }

  public ngOnInit(): void {
    this.isLoading = true;
    this.matchhistoryService.queryMatchhistory(this.summonerName)
      .subscribe((response) => {
        this.matchhistoryEntries = response
        this.isLoading = false;
      })
  }
}
