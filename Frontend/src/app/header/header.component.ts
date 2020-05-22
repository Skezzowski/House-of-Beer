import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BrewService } from '../services/brew.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

	logoutError: string = '';
	interval: any;
	actionNeeded: boolean = false;
	private loading: boolean = false;

	constructor(private userService: UserService, private brewService: BrewService) { }

	ngOnInit(): void {
		this.isActionNeeded();
		this.interval = setInterval(() => {
			this.isActionNeeded();
		}, 5000);
	}

	isActionNeeded() {
		if (this.isLoggedIn() && !this.loading) {
			this.loading = true;
			this.brewService.isActionNeeded().subscribe(
				data => {
					this.actionNeeded = data;
					this.loading = false;
				},
				console.log
			);
		}
	}

	ngOnDestroy(): void {
		clearInterval(this.interval);
	}

	logout() {
		this.userService.logout().subscribe(data => {
			this.logoutError = '';
			this.loading = false;
		}, (error: HttpErrorResponse) => {
			this.logoutError = error.error.msg;
		});
		localStorage.clear();
	}

	isLoggedIn(): boolean {
		return this.userService.isLoggedIn;
	}

}
