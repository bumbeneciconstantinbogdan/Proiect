import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../Service/authentication.service';
import {Response} from "../../Entity/response";

@Component({
  selector: 'app-user-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username? : String
  password? : String
  matchingPassword? : String
  email? : String

  private _succesful : boolean
  private _errors : boolean
  private _errorCause : String


  constructor(private userService : AuthenticationService) {
    this._errors = false
    this._succesful = false
  }

  ngOnInit(): void {
  }

  public register(){
    var newUser = {
      "username" : this.username,
      "password" : this.password,
      "email" : this.email
    };

    if(this.password != this.matchingPassword){
      this._errors = true
      this._errorCause = "Passwords won't match"
      return
    }

    this.userService.register(newUser).subscribe(
      (next : Response) => {
        if(next.response.includes("taken")){
          this._errors = true
          this._errorCause = next.response
        }else {
          this._succesful = true
          this._errors = false
          this._errorCause = ""
        }
      },
      () => {
        this._errors = true
        this._errorCause = "Server error"
      }
    );
  }

  public isError(){
    return this._errors
  }

  public isSuccesful(){
    return this._succesful
  }

  public getErrorCause(){
    return this._errorCause
  }

  public isAuthenticated(){
    return this.userService.isAuthenticated()
  }
}
