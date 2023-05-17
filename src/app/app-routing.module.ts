import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SummonersComponent} from "./summoners/summoners.component";
import {SummonersSearchComponent} from "./summoners/search/summoners-search.component";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./login/signup/signup.component";
import {canActivateRoute} from "./login/auth.service";

const routes: Routes = [
  {path: 'summoners', component: SummonersSearchComponent},
  {path: 'summoners/overview', component: SummonersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/myself/:summoner', component: SummonersComponent},
  {path: 'login/signup', component: SignupComponent},
  {path: 'loggedInUser/matchhistory', component: SummonersComponent, canActivate: [canActivateRoute]},
  {path: '**', redirectTo: '/summoners'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, ]
})
export class AppRoutingModule { }
