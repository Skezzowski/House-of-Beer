import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BrewService } from '../services/brew.service';
import { Observable, of, Subscription, timer, Subject } from 'rxjs';
import { switchMap, tap, takeUntil, repeat } from 'rxjs/operators';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {

	private readonly _stop = new Subject<void>();

	@Input() isLoggedIn: boolean = false;
	@Input() brewChanged: { value: boolean } = { value: false };

	logoutError: string = '';
	interval: Subscription;
	actionNeeded: boolean = false;

	constructor(private userService: UserService, private brewService: BrewService) { }

	ngOnInit(): void {
		this.interval = timer(0, 5000)
			.pipe(
				switchMap(() => {
					return this.isActionNeeded();
				}),
				takeUntil(this._stop),
				repeat()
			)
			.subscribe(
				undefined,
				console.log
			);
	}

	ngOnChanges(changes: SimpleChanges): void {
		this._stop.next();
	}

	isActionNeeded(): Observable<boolean> {
		if (!this.isLoggedIn)
			return of(this.actionNeeded);

		return this.brewService.isActionNeeded()
			.pipe(
				tap(
					actionNeeded => this.actionNeeded = actionNeeded
				)
			);
	}

	ngOnDestroy(): void {
		this.interval.unsubscribe();
	}

	logout() {
		this.userService.logout()
			.subscribe(() =>
				this.logoutError = '',
				(error: HttpErrorResponse) => {
					this.logoutError = error.error.msg;
				});
	}

}
