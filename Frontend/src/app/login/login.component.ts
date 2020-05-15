import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	constructor(private userServie: UserService, private router: Router) { }

	submit(f: NgForm) {
		this.userServie.login(f.value.username, f.value.password).subscribe(data => {
			this.userServie.isLoggedIn = true;
			this.router.navigate(['/beers']);
		}, error => {
			console.log('error', error);
		});
	}

}
