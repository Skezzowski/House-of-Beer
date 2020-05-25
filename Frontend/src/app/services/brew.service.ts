import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Brew } from '../brews/brew.model';

@Injectable({
	providedIn: 'root'
})
export class BrewService {

	private static readonly httpOptions = environment.httpOptions;

	constructor(private httpClient: HttpClient) { }

	startBrew(beerId: string): Observable<any> {
		return this.httpClient.post(environment.dbUrl + '/brew/start', { beerId }, BrewService.httpOptions).pipe(first());
	}

	isActionNeeded(): Observable<boolean> {
		return this.httpClient.get<boolean>(environment.dbUrl + '/brews/isActionNeeded', BrewService.httpOptions).pipe(first());
	}

	getBrews(): Observable<Brew[]> {
		return this.httpClient.get<Brew[]>(environment.dbUrl + '/brews', BrewService.httpOptions).pipe(first());
	}

	getBrew(id: string): Observable<any> {
		return this.httpClient.get(environment.dbUrl + '/brew/' + id, BrewService.httpOptions).pipe(first());
	}

	doAction(id: string): Observable<any> {
		return this.httpClient.post(environment.dbUrl + '/brew/action', { brewId: id }, BrewService.httpOptions).pipe(first());
	}

	deleteBrew(id: string): Observable<any> {
		return this.httpClient.delete(environment.dbUrl + '/brew/' + id, BrewService.httpOptions);
	}
}
