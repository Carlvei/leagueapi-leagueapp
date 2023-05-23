import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {SignupRequest} from "../models/signup-request.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoggedIn = false;

  constructor(private http: HttpClient,
              private authservice: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.authservice.isUserLoggedIn()) {
      this.router.navigate(["/loggedInUser/matchhistory"], {state: {name: this.authservice.getLoggedInUsername()}})
    }
  }

  signUp(form: NgForm) {
    console.log(form)
    this.authservice.signUp(new SignupRequest(form.value.username, form.value.requiredInputsGroup.email, form.value.requiredInputsGroup.password))
      .subscribe((response) => {
          this.router.navigate(["/loggedInUser/matchhistory"], {
              state: {
                name: this.authservice.getLoggedInUsername()
              }
            }
          )
        }
      )
  }
}
