import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-wrapper',
  templateUrl: './login-wrapper.component.html',
  styleUrls: ['./login-wrapper.component.scss']
})
export class LoginWrapperComponent {

  constructor(private router: Router) {

  }

  public isSignUpRoute(): boolean {
    return this.router.url === '/login/signup';
  }
}
