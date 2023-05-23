import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  username = '';
  password = '';
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
    this.authservice.signUp(this.username, this.password)
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
