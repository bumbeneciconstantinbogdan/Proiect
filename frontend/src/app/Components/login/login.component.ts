import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/Entity/CurrentUser';
import { AuthenticationService } from '../../Service/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username?: string;
  password?: string;
  private _errors: boolean;
  private _errorCause: String

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this._errors = false;
    this._errorCause = "Server error"
  }

  public async login() {
    var user = await this.authenticationService.login({ username: this.username, password: this.password, email: null })
    user.forEach(
      next => {
        this._errors = false
        this._errorCause = ""
        next.password = this.password
        this.router.navigateByUrl("/")
      }
    ).catch(
       error => { 
         this._errors = true
         this._errorCause = "Invalid login data"
       }
    )
  }

  public isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  public isError() {
    return this._errors;
  }

  public getErrorCause() {
    return this._errorCause;
  }
}
