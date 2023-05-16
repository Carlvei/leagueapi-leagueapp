import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, pipe, take} from "rxjs";
import {AuthService} from "./auth.service";
import {Summoner} from "../summoners/search/summoner.model";
import {CookieService} from "ngx-cookie";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private cookieService: CookieService,
              private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add refresh logic
    if (!this.authService.isUserLoggedIn()) {
      this.cookieService.remove('leagueapi_access_token')
    }
    const modifiedRed = req.clone({
      withCredentials: true
    });
    return next.handle(modifiedRed);
  }
}
