import { Injectable } from '@angular/core';
import { Brewery } from '../breweries/brewery.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class BreweryService {

	private static readonly httpOptions = environment.httpOptions;

	constructor(private httpClient: HttpClient) { }

	getBreweries(): Observable<Brewery[]> {
		return this.httpClient.get<Brewery[]>(environment.dbUrl + '/breweries', BreweryService.httpOptions).pipe(first());
	}

	getBrewery(id: string): Observable<Brewery> {
		return this.httpClient.get<Brewery>(environment.dbUrl + '/breweries/' + id, BreweryService.httpOptions).pipe(first());
	}
}
