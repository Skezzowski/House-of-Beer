import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: boolean = false;

  private static readonly httpOptions = {
    withCredential: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text' as 'text'
  };

  constructor(private httpClient: HttpClient) { }

  logout(): Observable<any> {
    return this.httpClient.post(environment.dbUrl + '/logout', {}, UserService.httpOptions);
  }

  login(){

  }

  register(username: string, fullname: string, password:string): Observable<any> {
    const userData = { username: username, name: fullname, password: password };
    return this.httpClient.post(environment.dbUrl + '/register', userData, UserService.httpOptions);
  }
}
