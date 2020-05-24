import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private httpClient: HttpClient) { }

	private static readonly httpOptions = environment.httpOptions;

	get isLoggedIn(): boolean {
		return !!localStorage.getItem('beerLoggedIn');
	}

	set isLoggedIn(value: boolean) {
		localStorage.setItem('beerLoggedIn', value ? "true" : "false");
	}

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

	profile(): Observable<any> {
		return this.httpClient.get(environment.dbUrl + '/profile', UserService.httpOptions);
	}

	changePasswd(oldpswd: string, newpswd: string): Observable<any> {
		return this.httpClient.post(environment.dbUrl + '/profile/chpasswd', { oldpswd, newpswd }, UserService.httpOptions);
	}
}
