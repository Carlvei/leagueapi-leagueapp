import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../login/auth.service";

export interface ExampleTab {
  label: string;
  routeDestination: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription | undefined;

  tabs = [
    {label: 'Login', routeDestination: '/login'},
    {label: 'Summoners', routeDestination: '/summoners'},
    {label: 'Third', routeDestination: '/third'},
  ]

  constructor(private router: Router,
              private authservice: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authservice.user.subscribe(user => {
      if(!user) {
        this.tabs[0].label = 'Login'
      } else {
        this.tabs[0].label = user.userName
      }
      this.isAuthenticated = !!user;
    });
    console.log('On init triggered. Is authenticated = ' + this.isAuthenticated)
  }

  onClickRoute(routeDestination: string) {
    this.router.navigate([routeDestination])
  }

  ngOnDestroy(): void {
    if(this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
