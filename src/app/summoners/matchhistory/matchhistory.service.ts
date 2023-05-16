import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatchhistoryEntryOverview} from "./model/matchhistory-entry-overview.model";

@Injectable()
export class MatchhistoryService {

  constructor(private http: HttpClient) {
  }

  queryMatchhistory(name: string) {
    return this.http
      .get<MatchhistoryEntryOverview[]>(
        'http://localhost:8080/api/gamedata/matches',
        {
          params: new HttpParams()
            .set('summonerName', name)
        })
  }
}
