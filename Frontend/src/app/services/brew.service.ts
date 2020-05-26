import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Brew } from '../brews/brew.model';
import { CurrentBrew } from '../active-brew/current-brew.model';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class BrewService {

	private static readonly httpOptions = environment.httpOptions;
	private brewChanged = new BehaviorSubject<{ value: boolean }>({ value: false });

	constructor(private httpClient: HttpClient) { }

	startBrew(beerId: string): Observable<any> {
		return this.httpClient.post(environment.dbUrl + '/brew/start', { beerId }, BrewService.httpOptions)
			.pipe(
				first(),
				tap(() => this.brewChanged.next({ value: true }))
			);
	}

	isBrewChanged() {
		return this.brewChanged;
	}

	isActionNeeded(): Observable<boolean> {
		return this.httpClient.get<boolean>(environment.dbUrl + '/brews/isActionNeeded', BrewService.httpOptions).pipe(first());
	}

	getBrews(): Observable<Brew[]> {
		return this.httpClient.get<Brew[]>(environment.dbUrl + '/brews', BrewService.httpOptions).pipe(first());
	}

	getBrew(id: string): Observable<CurrentBrew> {
		return this.httpClient.get<CurrentBrew>(environment.dbUrl + '/brew/' + id, BrewService.httpOptions).pipe(first());
	}

	doAction(id: string): Observable<any> {
		return this.httpClient.post(environment.dbUrl + '/brew/action', { brewId: id }, BrewService.httpOptions)
			.pipe(
				first(),
				tap(() => this.brewChanged.next({ value: true }))
			);
	}

	deleteBrew(id: string): Observable<any> {
		return this.httpClient.delete(environment.dbUrl + '/brew/' + id, BrewService.httpOptions)
			.pipe(
				first(),
				tap(() => this.brewChanged.next({ value: true }))
			);
	}
}
