import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BrewService } from '../services/brew.service';
import { Observable, interval, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

	logoutError: string = '';
	interval: Subscription;
	actionNeeded: boolean = false;
	_isLoggedIn: boolean = false;
	private loading: boolean = false;

	constructor(private userService: UserService, private brewService: BrewService) { }

	ngOnInit(): void {
		this.interval = this.isActionNeeded()
			.pipe(
				switchMap(() => {
					return interval(5000)
						.pipe(
							switchMap(() => {
								return this.isActionNeeded();
							})
						);
				})
			).subscribe(
				undefined,
				console.log
			);

	}

	isActionNeeded(): Observable<boolean> {
		return this.isLoggedIn()
			.pipe(
				switchMap(isLoggedIn => {
					if (isLoggedIn && !this.loading) {
						this.loading = true;
						return this.brewService.isActionNeeded()
							.pipe(
								map(actionNeeded => {
									this.loading = false;
									this.actionNeeded = actionNeeded;
									return actionNeeded;
								}
								));
					}
					return of(false);
				})
			);
	}

	ngOnDestroy(): void {
		this.interval.unsubscribe();
	}

	logout() {
		this.userService.logout().subscribe(data => {
			this.logoutError = '';
			this.loading = false;
			this.userService.loggedOut();
		}, (error: HttpErrorResponse) => {
			this.logoutError = error.error.msg;
		});
	}

	isLoggedIn(): Observable<boolean> {
		return this.userService.isLoggedIn();
	}

}
