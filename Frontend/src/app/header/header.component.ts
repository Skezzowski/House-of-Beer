import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	logoutError: string = '';

	constructor(private userService: UserService, private router: Router) { }

	logout() {
		this.userService.logout().subscribe(data => {
			this.logoutError = '';
			localStorage.clear();
		}, (error: HttpErrorResponse) => {
			this.logoutError = error.error.msg;
		});
	}

	isLoggedIn() {
		return this.userService.isLoggedIn;
	}

}
