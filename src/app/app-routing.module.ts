import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SummonersComponent} from "./summoners/summoners.component";
import {SummonersSearchComponent} from "./summoners/search/summoners-search.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: 'summoners', component: SummonersSearchComponent},
  {path: 'summoners/:summoner', component: SummonersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
