import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {User} from "./models/user.model";
import {SignupResponse} from "./models/signup-response.model";
import {map, Observable, ReplaySubject, take, tap} from "rxjs";
import {CookieService} from "ngx-cookie";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {AppConfigService} from "../config/app-config.service";
import {LoginRequest} from "./models/login-request.model";
import {LoginResponse} from "./models/login-response.model";
import {SignupRequest} from "./models/signup-request.model";

@Injectable()
export class AuthService {
  public user = new ReplaySubject<User>();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private config: AppConfigService
  ) {}

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    console.log(loginRequest);
    return this.http
      .post<LoginResponse>(this.config.loginUrl, loginRequest)
      .pipe(
        tap((response: LoginResponse) =>
          this.handleAuthentication(response, loginRequest.email)
        )
      );
  }

  public signUp(signUpRequest: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(this.config.signUpUrl, signUpRequest);
  }

  private handleAuthentication(
    response: LoginResponse,
    _username: string
  ): void {
    const user = new User(
      response.username,
      response.email,
      response.tokenPair.accessToken,
      this.currentDatePlusFiveMinutes()
    );
    if (user.token != null) {
      this.cookieService.put(this.config.accessTokenCookieName, user.token);
    }
    this.user.next(user);
  }

  private currentDatePlusFiveMinutes(): Date {
    return new Date(new Date().getTime() + 5 * 60 * 1000);
  }

  public isUserLoggedIn(): boolean {
    let loggedIn = false;
    this.user.pipe(take(1)).subscribe((user: User | null) => {
      if (user) {
        loggedIn = true;
      }
    });
    return loggedIn;
  }

  public getLoggedInUsername(): string | null {
    let name = null;
    this.user.pipe(take(1)).subscribe((user: User | null) => {
      if (user instanceof User) {
        name = (user as User).username;
      }
    });
    return name;
  }

  // I would refactor this method and use an Observable @Anes
  //  This allows other parts of the code to react to the results of the observables and process them further.

  public getLoggedInUsername2(): Observable<string | null> {
    //  The method now returns an Observable of type Observable<string | null> that emits the username (of type string) or null
    return this.user.pipe(
      take(1),
      // the map operator is used to transform the user object
      map((user: User) => user?.username ?? null)
      // The Nullish Coalescing Operator (??) is also used to generate the username or null.
    );
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
