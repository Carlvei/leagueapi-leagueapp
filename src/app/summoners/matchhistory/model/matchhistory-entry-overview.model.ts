import {Participant} from "./participant.model";
import {ParticipantOverview} from "./participant-overview.model";

export class MatchhistoryEntryOverview {
  constructor(public gameCreation:number,
              public gameDuration:number,
              public gameMode:string,
              public playerData:Participant,
              public participants: ParticipantOverview[] ) {
  }
}

