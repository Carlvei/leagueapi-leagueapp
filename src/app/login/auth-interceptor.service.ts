import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {CookieService} from "ngx-cookie";
import {AppConfigService} from "../config/app-config.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private cookieService: CookieService,
              private authService: AuthService,
              private config: AppConfigService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: add refresh logic
    // add exception for initializing config since the cookie name is needed here
    if (!req.url.startsWith('http://localhost:8080/') || req.url === '/assets/config/appconfig.json') {
      return next.handle(req);
    }
    if (!this.authService.isUserLoggedIn()) {
      this.cookieService.remove(this.config.accessTokenCookieName)
    }
    const modifiedRed = req.clone({
      withCredentials: true
    });
    return next.handle(modifiedRed);
  }
}
