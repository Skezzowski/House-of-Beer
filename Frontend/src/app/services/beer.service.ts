import { Injectable } from '@angular/core';
import { Beer } from '../beers/beer.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class BeerService {

	private static readonly httpOptions = {
		withCredentials: true,
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	constructor(private httpClient: HttpClient) { }

	getBeers(): Observable<Beer[]> {
		return this.httpClient.get<Beer[]>(environment.dbUrl + '/beers', BeerService.httpOptions);
	}

	getBeer(id: string): Observable<Beer> {
		return this.httpClient.get<Beer>(environment.dbUrl + '/beers/' + id, BeerService.httpOptions);
	}
}
