import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {LoginRequest} from "../models/login-request.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authservice: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.authservice.isUserLoggedIn()) {
      this.router.navigate(["/loggedInUser/matchhistory"], {
          state: {
            name: this.authservice.getLoggedInUsername()
          }
        }
      )
    }
  }

  login(form: NgForm) {
    this.authservice.login(new LoginRequest(form.value.email, form.value.password))
      .subscribe((response) => {
          this.isLoggedIn = true
          this.router.navigate(["/loggedInUser/matchhistory"], {
              state: {
                name: this.authservice.getLoggedInUsername()
              }
            }
          )
        }
      )
  }

  onSignUpClick() {
    this.router.navigate(["signup"], {relativeTo: this.route})
  }
}
