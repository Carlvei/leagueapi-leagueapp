import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Summoner} from "./search/summoner.model";

@Injectable()
export class SummonersService {
  constructor(private http: HttpClient) {
  }

  querySummoner(name: string) {
    return this.http
      .get<Summoner>('http://localhost:8080/summoners/' + name);
  }
}
