import { Component } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {Router} from "@angular/router";

export interface ExampleTab {
  label: string;
  routeDestination: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  tabs = [
    {label: 'Summoners', routeDestination: '/summoners'},
    {label: 'Second', routeDestination: '/second'},
    {label: 'Third', routeDestination: '/third'},
  ]

  constructor(private router: Router) {

  }


  onClickRoute(routeDestination: string) {
    this.router.navigate([routeDestination])
  }
}
