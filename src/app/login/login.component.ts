import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";
import {User} from "./user.model";
import {NgForm} from "@angular/forms";

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
      this.router.navigate(["/loggedInUser/matchhistory"], {state: {name: this.authservice.getLoggedInUsername()}})
    }
  }

  login(form: NgForm) {
    console.log(form)
    this.authservice.login(form.value.username, form.value.password)
      .subscribe((response) => {
        this.isLoggedIn = true
        this.router.navigate(["/loggedInUser/matchhistory"], {state: {name: this.authservice.getLoggedInUsername()}})
      })
  }

  onSignUpClick() {
    this.router.navigate(["signup"], {relativeTo: this.route})
  }


}
