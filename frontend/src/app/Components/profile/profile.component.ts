import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/Entity/CurrentUser';
import { AuthenticationService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  private currentUser?: CurrentUser

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser()
  }

  public getCurrentUser(){
    return this.currentUser
  }

}
