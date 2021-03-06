import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgModel, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	private focusedTag: NgModel;
	readonly usernameMinLength: number = 4;
	readonly passwordMinLength: number = 4;
	errorMsg: string = '';

	constructor(private userServie: UserService, private router: Router) { }

	submit(f: NgForm) {
		const values = f.value;
		this.userServie.register(values.username, values.fullname, values.password)
			.subscribe(
				() => this.router.navigate(['/login']),
				(error: HttpErrorResponse) => this.errorMsg = error.error.msg
			);
	}

	focused(tag?: NgModel) {
		this.focusedTag = tag;
	}

	isFocused(tag: NgModel): boolean {
		return this.focusedTag === tag;
	}

}
