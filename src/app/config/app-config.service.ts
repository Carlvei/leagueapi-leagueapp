import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

/**
 Yes I know you shouldn't code with comments but for know this is a solution that helps me find my stuff.
 */
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig: any;

  constructor(private http: HttpClient) {
  }

  loadAppConfig() {
    return firstValueFrom(this.http.get('/assets/config/appconfig.json'))
      .then(data => {
        this.appConfig = data
      })
  }

  /**
   * Base configs
   */
  get apiBaseUrl() {
    return this.appConfig.apiBaseUrl;
  }

  get gamedataServiceBaseUrl() {
    return this.appConfig.gamedataServiceBaseUrl;
  }

  get authServiceBaseUrl() {
    return this.appConfig.authServiceBaseUrl;
  }

  /**
   * Summoner configs
   */
  get summonersConfig() {
    return this.appConfig.summoners
  }

  get summonersUrl() {
    return this.apiBaseUrl + this.gamedataServiceBaseUrl + this.summonersConfig.summonersEndpoint
  }

  get matchhistoryUrl() {
    return this.apiBaseUrl + this.gamedataServiceBaseUrl + this.summonersConfig.matchhistoryEndpoint
  }

  /**
   * Auth configs
   */
  get authenticationConfig() {
    return this.appConfig.authentication
  }

  get loginUrl() {
    return this.apiBaseUrl + this.authServiceBaseUrl + this.authenticationConfig.loginEndpoint
  }

  get signUpUrl() {
    return this.apiBaseUrl + this.authServiceBaseUrl + this.authenticationConfig.signUpEndpoint
  }

  get accessTokenCookieName() {
    return this.authenticationConfig.accessTokenCookieName
  }
}
