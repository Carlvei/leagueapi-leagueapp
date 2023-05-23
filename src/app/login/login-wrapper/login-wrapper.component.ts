import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-wrapper',
  templateUrl: './login-wrapper.component.html',
  styleUrls: ['./login-wrapper.component.scss']
})
export class LoginWrapperComponent {

  constructor(private router: Router) {

  }

  isSignUpRoute() {
    return this.router.url === '/login/signup';
  }
}
