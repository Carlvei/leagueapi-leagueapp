import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatchhistoryEntryOverview} from "./matchhistory/model/matchhistory-entry-overview.model";
import {AppConfigService} from "../config/app-config.service";

@Injectable()
export class MatchhistoryService {

  constructor(private http: HttpClient,
              private config: AppConfigService) {
  }

  queryMatchhistory(name: string) {
    return this.http
      .get<MatchhistoryEntryOverview[]>(
        this.config.matchhistoryUrl,
        {
          params: new HttpParams()
            .set('summonerName', name)
        })
  }
}
