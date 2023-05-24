import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './navbar/navbar.component';
import {MatTabNav, MatTabsModule} from "@angular/material/tabs";
import {SummonersComponent} from './summoners/summoners/summoners.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SummonersSearchComponent} from './summoners/search/summoners-search.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {SummonersService} from "./summoners/summoners.service";
import {MatchhistoryComponent} from './summoners/matchhistory/matchhistory.component';
import {MatchhistoryService} from "./summoners/matchhistory.service";
import {TeamsComponent} from './summoners/matchhistory/teams/teams.component';
import {LoginComponent} from './login/login/login.component';
import {AuthService} from "./login/auth.service";
import {SignupComponent} from './login/signup/signup.component';
import {CookieModule} from "ngx-cookie";
import {AuthInterceptorService} from "./login/auth-interceptor.service";
import {LoadingSpinnerComponent} from "./shared/loading-spinners/loading-spinner.component";
import {LoginWrapperComponent} from './login/login-wrapper/login-wrapper.component';
import {UsernameRiotAccountDirective} from './directives/username-riot-account/username-riot-account.directive';
import {PasswordValidatorDirective} from './directives/password-validator/password-validator.directive';
import {PasswordMatcherDirective} from './directives/password-matcher/password-matcher.directive';
import {AppConfigService} from "./config/app-config.service";
import { SummonersWrapperComponent } from './summoners/summoners-wrapper/summoners-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SummonersComponent,
    SummonersSearchComponent,
    MatchhistoryComponent,
    TeamsComponent,
    LoginComponent,
    SignupComponent,
    LoadingSpinnerComponent,
    LoginWrapperComponent,
    UsernameRiotAccountDirective,
    PasswordValidatorDirective,
    PasswordMatcherDirective,
    SummonersWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CookieModule.withOptions()
  ],
  providers: [
    MatTabNav,
    SummonersService,
    MatchhistoryService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
