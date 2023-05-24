import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {User} from "./models/user.model";
import {SignupResponse} from "./models/signup-response.model";
import {ReplaySubject, take, tap} from "rxjs";
import {CookieService} from "ngx-cookie";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {AppConfigService} from "../config/app-config.service";
import {LoginRequest} from "./models/login-request.model";
import {LoginResponse} from "./models/login-response.model";
import {SignupRequest} from "./models/signup-request.model";

@Injectable()
export class AuthService {
  user = new ReplaySubject<User>();


  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private config: AppConfigService) {
  }

  login(loginRequest: LoginRequest) {
    console.log(loginRequest)
    return this.http
      .post<LoginResponse>(this.config.loginUrl, loginRequest)
      .pipe(
        tap(response =>
          this.handleAuthentication(response, loginRequest.email)
        )
      );
  }

  signUp(signUpRequest: SignupRequest) {
    return this.http
      .post<SignupResponse>(this.config.signUpUrl, signUpRequest)
  }

  private handleAuthentication(response: LoginResponse, username: string) {
    const user = new User(response.username, response.email, response.tokenPair.accessToken, this.currentDatePlusFiveMinutes())
    if (user.token != null) {
      this.cookieService.put(this.config.accessTokenCookieName, user.token)
    }
    this.user.next(user);
  }

  private currentDatePlusFiveMinutes() {
    return new Date(new Date().getTime() + 5 * 60 * 1000)
  }

  public isUserLoggedIn() {
    let loggedIn = false;
    this.user.pipe(
      take(1)
    ).subscribe(user => {
        if (user) {
          loggedIn = true
        }
      }
    )
    return loggedIn;
  }

  public getLoggedInUsername() {
    let name = null;
    this.user.pipe(
      take(1)
    ).subscribe(user => {
        if (user) {
          name = user.username
        }
      }
    )
    return name;
  }
}

export const canActivateRoute: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // Dev mode, delete this after good session logic
  return true;
    if (inject(AuthService).isUserLoggedIn()) {
      return true;
    } else {
      inject(Router).navigate(['/login']);
      return false;
    }
  }
