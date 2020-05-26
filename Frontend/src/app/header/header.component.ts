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

	logoutError: string = '';
	private readonly _stop = new Subject<void>();
	interval: Subscription;
	actionNeeded: boolean = false;
	@Input() isLoggedIn: boolean = false;
	@Input() brewChanged: { value: boolean } = { value: false };
	private loading: boolean = false;

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
		console.log(changes);
	}

	isActionNeeded(): Observable<boolean> {
		if (!this.isLoggedIn || this.loading)
			return of(this.actionNeeded);
		this.loading = true;
		return this.brewService.isActionNeeded()
			.pipe(
				tap(actionNeeded => {
					this.loading = false;
					this.actionNeeded = actionNeeded;
				}
				));
	}

	ngOnDestroy(): void {
		this.interval.unsubscribe();
	}

	logout() {
		this.userService.logout()
			.pipe(
				tap(() => this.loading = false)
			)
			.subscribe(() =>
				this.logoutError = '',
				(error: HttpErrorResponse) => {
					this.logoutError = error.error.msg;
				});
	}

}
