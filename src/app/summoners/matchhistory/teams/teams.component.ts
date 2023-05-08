import {Component, Input, OnInit} from '@angular/core';
import {Participant} from "../model/participant.model";
import {ParticipantOverview} from "../model/participant-overview.model";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  @Input() participants: ParticipantOverview[] | undefined;
  redTeam: ParticipantOverview[] | undefined;
  blueTeam: ParticipantOverview[] | undefined;

  ngOnInit(): void {
    this.redTeam = this.participants?.filter((participant) => {
      return participant.team === 'RED';
    })
    this.blueTeam = this.participants?.filter((participant) => {
      return participant.team === 'BLUE';
    })
  }
}
