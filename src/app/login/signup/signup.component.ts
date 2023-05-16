import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username = '';
  password = '';
  isLoggedIn = false;

  constructor(private http: HttpClient,
              private authservice: AuthService,
              private router: Router) {
  }

  signUp() {
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
