import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import {MatTabNav, MatTabsModule} from "@angular/material/tabs";
import { SummonersComponent } from './summoners/summoners.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SummonersSearchComponent } from './summoners/search/summoners-search.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {SummonersService} from "./summoners/summoners.service";
import { MatchhistoryComponent } from './summoners/matchhistory/matchhistory.component';
import {MatchhistoryService} from "./summoners/matchhistory/matchhistory.service";
import { TeamsComponent } from './summoners/matchhistory/teams/teams.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SummonersComponent,
    SummonersSearchComponent,
    MatchhistoryComponent,
    TeamsComponent

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
    MatInputModule
  ],
  providers: [MatTabNav, SummonersService, MatchhistoryService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
