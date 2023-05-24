import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Summoner} from "./models/summoner.model";
import {AuthService} from "../login/auth.service";
import {Observable, exhaustMap, take} from "rxjs";
import {AppConfigService} from "../config/app-config.service";
import { User } from "../login/models/user.model";

@Injectable()
export class SummonersService {
  constructor(
    private authservice: AuthService,
    private http: HttpClient,
    private config: AppConfigService
  ) {}

  // I added Data Modifiers for the methods and the return Types to make the code more readable  @Anes

  public querySummoner(name: string): Observable<Summoner> {
    console.log(this.config.summonersUrl);
    return this.http.get<Summoner>(this.config.summonersUrl, {
      params: {
        summonerName: name,
      },
    });
  }

  public queryLoggedInSummoner(): Observable<Summoner> {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        return this.http.get<Summoner>(this.config.summonersUrl, {
          params: {
            summonerName: user.username,
          },
        });
      })
    );
  }
}
