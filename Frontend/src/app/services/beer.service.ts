import { Injectable } from '@angular/core';
import { Beer } from '../beers/beer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class BeerService {

	private static readonly httpOptions = environment.httpOptions;

	constructor(private httpClient: HttpClient) { }

	getBeers(): Observable<Beer[]> {
		return this.httpClient.get<Beer[]>(environment.dbUrl + '/beers', BeerService.httpOptions).pipe(first());
	}

	getBeer(id: string): Observable<Beer> {
		return this.httpClient.get<Beer>(environment.dbUrl + '/beers/' + id, BeerService.httpOptions).pipe(first());
	}
}
