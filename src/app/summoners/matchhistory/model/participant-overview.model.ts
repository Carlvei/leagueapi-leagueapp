import {publish} from "rxjs";

export class ParticipantOverview {
  constructor(public championIconUrl: string,
              public summonerName: string,
              public team: string,
              public role: string,
              public individualPosition: string) {
  }
}
