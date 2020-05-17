import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brew } from '../brews/brew.model';

@Injectable({
	providedIn: 'root'
})
export class BrewService {

	private static readonly httpOptions = environment.httpOptions;

	constructor(private httpClient: HttpClient) { }

	startBrew(beerId: string): Observable<any> {
		return this.httpClient.post(environment.dbUrl + '/brew/start', { beerId }, BrewService.httpOptions);
	}

	getBrews(): Observable<Brew[]> {
		return this.httpClient.get<Brew[]>(environment.dbUrl + '/brews', BrewService.httpOptions);
	}

	getBrew(id: string): Observable<any> {
		return this.httpClient.get(environment.dbUrl + '/brew/' + id, BrewService.httpOptions);
	}
}
