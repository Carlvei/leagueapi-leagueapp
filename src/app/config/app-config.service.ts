import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

// Den
export interface AppConfig {
  apiBaseUrl: string;
  gamedataServiceBaseUrl: string;
  authServiceBaseUrl: string;
  summoners: SummonersConfig;
  authentication: AuthenticationConfig;
}

export interface SummonersConfig {
  summonersEndpoint: string;
  matchhistoryEndpoint: string;
}

export interface AuthenticationConfig {
  loginEndpoint: string;
  signUpEndpoint: string;
  accessTokenCookieName: string;
}
/**
 Yes I know you shouldn't code with comments but for know this is a solution that helps me find my stuff.
 */
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  public appConfig!: AppConfig;

  constructor(private http: HttpClient) {}

  public loadAppConfig(): Promise<void> {
    return firstValueFrom(
      this.http.get<AppConfig>('/assets/config/appconfig.json')
    ).then((data) => {
      this.appConfig = data;
    });
  }

  /**
   * Base configs
   */
  public get apiBaseUrl(): string {
    return this.appConfig.apiBaseUrl;
  }

  public get gamedataServiceBaseUrl(): string {
    return this.appConfig.gamedataServiceBaseUrl;
  }

  public get authServiceBaseUrl(): string {
    return this.appConfig.authServiceBaseUrl;
  }

  /**
   * Summoner configs
   */
  public get summonersConfig(): SummonersConfig {
    return this.appConfig.summoners;
  }

  public get summonersUrl(): string {
    return (
      this.apiBaseUrl +
      this.gamedataServiceBaseUrl +
      this.summonersConfig.summonersEndpoint
    );
  }

  public get matchhistoryUrl(): string {
    return (
      this.apiBaseUrl +
      this.gamedataServiceBaseUrl +
      this.summonersConfig.matchhistoryEndpoint
    );
  }

  /**
   * Auth configs
   */
  public get authenticationConfig(): AuthenticationConfig {
    return this.appConfig.authentication;
  }

  public get loginUrl(): string {
    return (
      this.apiBaseUrl +
      this.authServiceBaseUrl +
      this.authenticationConfig.loginEndpoint
    );
  }

  public get signUpUrl(): string {
    return (
      this.apiBaseUrl +
      this.authServiceBaseUrl +
      this.authenticationConfig.signUpEndpoint
    );
  }

  public get accessTokenCookieName(): string {
    return this.authenticationConfig.accessTokenCookieName;
  }
}
