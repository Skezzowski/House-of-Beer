import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class BrewService {

	private static readonly httpOptions = {
		withCredentials: true,
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	constructor(private httpClient: HttpClient) { }

	startBrew(beerId: string): Observable<any> {
		return this.httpClient.post(environment.dbUrl + '/brew/start', { beerId }, BrewService.httpOptions);
	}
}
