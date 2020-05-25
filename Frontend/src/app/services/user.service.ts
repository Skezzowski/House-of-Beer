import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, iif, of } from 'rxjs';
import { first, switchMap, tap, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private _isLoggedIn: BehaviorSubject<boolean>;
	private static readonly httpOptions = environment.httpOptions;

	constructor(private httpClient: HttpClient) { }

	isLoggedIn(): Observable<boolean> {
		if (this._isLoggedIn === undefined) {
			return this.httpClient.get<boolean>(environment.dbUrl + '/authcheck', UserService.httpOptions)
				.pipe(first())
				.pipe(
					switchMap(
						data => {
							this._isLoggedIn = new BehaviorSubject(data);
							return this._isLoggedIn;
						}
					));
		}
		return this._isLoggedIn;
	}

	logout(): Observable<any> {
		return this.httpClient.post(environment.dbUrl + '/logout', {}, UserService.httpOptions)
			.pipe(first())
			.pipe(
				tap(() => this._isLoggedIn.next(false))
			);
	}

	login(username: string, password: string): Observable<any> {
		return this.httpClient.post(environment.dbUrl + '/login', { username, password }, UserService.httpOptions)
			.pipe(first())
			.pipe(
				tap(() => this._isLoggedIn.next(true))
			);;
	}

	register(username: string, fullname: string, password: string): Observable<any> {
		const userData = { username, name: fullname, password };
		return this.httpClient.post(environment.dbUrl + '/register', userData, UserService.httpOptions).pipe(first());
	}

	profile(): Observable<any> {
		return this.httpClient.get(environment.dbUrl + '/profile', UserService.httpOptions);
	}

	changePasswd(oldpswd: string, newpswd: string): Observable<any> {
		return this.httpClient.post(environment.dbUrl + '/profile/chpasswd', { oldpswd, newpswd }, UserService.httpOptions);
	}
}
