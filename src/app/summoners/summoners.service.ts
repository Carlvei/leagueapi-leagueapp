import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Summoner} from "./models/summoner.model";
import {AuthService} from "../login/auth.service";
import {exhaustMap, take} from "rxjs";
import {AppConfigService} from "../config/app-config.service";

@Injectable()
export class SummonersService {
  constructor(private authservice: AuthService,
              private http: HttpClient,
              private config: AppConfigService) {
  }

  querySummoner(name: string) {
    console.log(this.config.summonersUrl)
    return this.http
      .get<Summoner>(this.config.summonersUrl,
        {
          params: {
            summonerName: name
          }
        });
  }

  queryLoggedInSummoner() {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap(user => {
          return this.http
            .get<Summoner>(this.config.summonersUrl,
              {
                params: {
                  summonerName: user.username
                }
              }
            );
        }
      )
    )
  }
}
