import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {CurrentUser} from '../Entity/CurrentUser';
import {environment} from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    
    private _currentUser?: CurrentUser;

    constructor(private http: HttpClient) {
        if(localStorage.getItem("currentUser") != null) {
            this._currentUser = JSON.parse(atob(localStorage.getItem("currentUser")));
        }
    }

    public register(newUser): Observable<any> {
        return this.http.post(environment.apiUserUrl + "/register", newUser);
    }

    public async login(credentials) {
        const headers = new HttpHeaders(credentials ? {
            Authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password),
            "X-Requested-With": "XMLHttpRequest"
        } : {} );
        return this.http.post<CurrentUser>(environment.apiUserUrl + "/authenticate",
            {username : credentials.username, password : credentials.password, email : null}, {headers: headers})
            .pipe(map(user   => {
                localStorage.setItem("currentUser", btoa(JSON.stringify(user)))
                this._currentUser = user
                return user}))
    }

  public async logout(){
        return this.http.post<any>(environment.apiUserUrl + "/logout/succes", null)
        .pipe(
            map(response => {
                this._currentUser = null;
                localStorage.clear();
                sessionStorage.clear();
            })
        )
  }

  public isAuthenticated() : boolean{
        return this._currentUser != null ? true : false
  }

    public setCurrentUser(currentUser : CurrentUser){
        this._currentUser = currentUser;
    }

    public getCurrentUser(){
        return this._currentUser;
    }

}
