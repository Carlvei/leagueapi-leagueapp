import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";
import {User} from "./user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  isLoggedIn = false;

  constructor(private authservice: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.authservice.isUserLoggedIn()) {
      this.router.navigate(["/loggedInUser/matchhistory"], {state: {name: this.authservice.getLoggedInUsername()}})
    }
  }

  login() {
    this.authservice.login(this.username, this.password)
      .subscribe((response) => {
        this.isLoggedIn = true
        this.router.navigate(["/loggedInUser/matchhistory"], {state: {name: this.authservice.getLoggedInUsername()}})
      })
  }

  onSignUpClick() {
    this.router.navigate(["signup"], {relativeTo: this.route})
  }


}
