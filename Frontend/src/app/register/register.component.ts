import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgModel, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	constructor(private userServie: UserService, private router: Router) { }

	submit(f: NgForm) {
		const values = f.value;
		this.userServie.register(values.username, values.fullname, values.password).subscribe(data => {
			this.router.navigate(['/login']);
		}, error => {
			console.log('error', error);
		});
	}

}
