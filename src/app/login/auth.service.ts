import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Tokenpair} from "./tokenpair.model";
import {User} from "./user.model";
import {SignupResponseDto} from "./signup/signupResponseDto.model";
import {BehaviorSubject, ReplaySubject, take, tap} from "rxjs";
import {CookieService} from "ngx-cookie";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class AuthService {
  user = new ReplaySubject<User>();



  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }

  login(username: string, password: string) {
    return this.http
      .request<Tokenpair>("post", "http://localhost:8080/api/auth/authentication/authenticate",
        {
          body:
            {
              userName: username,
              password: password
            }
        })
      .pipe(
        tap(response =>
          this.handleAuthentication(response, username)
        )
      );
  }

  signUp(username: string, password: string) {
    return this.http
      .post<SignupResponseDto>("http://localhost:8080/api/auth/authentication/signup",
        {
          userName: username,
          password: password
        })
  }

  private handleAuthentication(response: Tokenpair, username: string) {
    const user = new User(username, response.accessToken, this.currentDatePlusFiveMinutes())
    if(user.token != null) {
      console.log('token is set')
      this.cookieService.put("leagueapi_access_token", user.token)
      console.log(user.token)
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
      }}
    )
    return loggedIn;
  }

  public getLoggedInUsername() {
    let name = null;
    this.user.pipe(
      take(1)
    ).subscribe(user => {
      if (user) {
        name = user.userName
      }}
    )
    return name;
  }
}

export const canActivateRoute: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    if(inject(AuthService).isUserLoggedIn()) {
      return true;
    } else {
      inject(Router).navigate(['/login']);
      return false;
    }
  }
