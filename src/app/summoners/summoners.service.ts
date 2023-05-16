import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Summoner} from "./search/summoner.model";
import {AuthService} from "../login/auth.service";
import {exhaustMap, take} from "rxjs";

@Injectable()
export class SummonersService {
  constructor(private authservice: AuthService,
              private http: HttpClient) {
  }

  querySummoner(name: string) {
    return this.http
      .get<Summoner>('http://localhost:8080/api/gamedata/summoners',
        {
          params: {
            summonerName: name
          }
        });
  }

  queryLoggedInSummoner() {
    // exhaustMap wartet auf den ersten Observable, nimmt den output und verwendet ihn für einen zweiten observable welcher dann returend wird
    return this.authservice.user.pipe(take(1), exhaustMap(user => {
        // @ts-ignore
      return this.http
          .get<Summoner>('http://localhost:8080/summoners/' + user.userName);

    })) // das sagt  basicly dass aus dem subject ein wert rauskommen soll
    // und dann gleich unsubscribed werden soll
  }
}
