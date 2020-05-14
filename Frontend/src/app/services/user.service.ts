import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn: boolean = true;
  
  constructor(private httpClient: HttpClient) { }

  logout(): boolean {
    const httpOptions = {
      withCredential: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let isLogoutSuccsessful: boolean = false;
    this.httpClient.post('http://localhost:3000/logout', {}, httpOptions).subscribe(data => {
      console.log(data);
      this.loggedIn = false;
      isLogoutSuccsessful = true;
    }, error => {
      console.log(error);
      isLogoutSuccsessful = false;
    });
    return isLogoutSuccsessful;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  login(){

  }

  register(){

  }
}
