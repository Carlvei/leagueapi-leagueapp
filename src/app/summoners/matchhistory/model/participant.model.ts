import {ParticipantOverview} from "./participant-overview.model";
import {Item} from "./item.model";

export class Participant extends ParticipantOverview {
  constructor(public kills: number,
              public deaths: number,
              public assists: number,
              public totalMinionsKilled: number,
              public win: boolean,
              public killParticipation: number,
              public primaryRuneUrl: string,
              public summonerSpellFirstId: string,
              public summonerSpellSecondId: string,
              public items:Item[],
              championIconUrl: string,
              summonerName: string,
              team: string,
              role: string,
              individualPosition: string) {
    super(championIconUrl, summonerName, team, role, individualPosition);
  }
}

