import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SummonersSearchComponent} from "./summoners/search/summoners-search.component";
import {SignupComponent} from "./login/signup/signup.component";
import {canActivateRoute} from "./login/auth.service";
import {LoginWrapperComponent} from "./login/login-wrapper/login-wrapper.component";
import {SummonersWrapperComponent} from "./summoners/summoners-wrapper/summoners-wrapper.component";

const routes: Routes = [
  {path: 'summoners', component: SummonersSearchComponent},
  {path: 'summoners/overview', component: SummonersWrapperComponent},
  {
    path: 'login', component: LoginWrapperComponent, children: [
      {path: 'signup', component: SignupComponent}
    ]
  },
  {path: 'login/myself/:summoner', component: SummonersWrapperComponent},
  {path: 'loggedInUser/matchhistory', component: SummonersWrapperComponent, canActivate: [canActivateRoute]},
  {path: '**', redirectTo: '/summoners'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,]
})
export class AppRoutingModule {
}
