import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	constructor(private userService: UserService, private router: Router) { }

	logout() {
		this.userService.logout().subscribe(data => {
			this.userService.isLoggedIn = false;
			this.router.navigate(['/']);
		}, error => {
			console.log(error);
		});
	}

	isLoggedIn() {
		return this.userService.isLoggedIn;
	}

}
