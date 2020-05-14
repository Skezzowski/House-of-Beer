import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private httpClient: HttpClient) { }

	private static readonly httpOptions = {
		withCredential: true,
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		}),
		responseType: 'text' as 'text'
	};

	isLoggedIn = false;

	logout(): Observable<any> {
		return this.httpClient.post(environment.dbUrl + '/logout', {}, UserService.httpOptions);
	}

	login(username: string, password: string): Observable<any> {
		return this.httpClient.post(environment.dbUrl + '/login', { username, password }, UserService.httpOptions);
	}

	register(username: string, fullname: string, password: string): Observable<any> {
		const userData = { username, name: fullname, password };
		return this.httpClient.post(environment.dbUrl + '/register', userData, UserService.httpOptions);
	}
}
