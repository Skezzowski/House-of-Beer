import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	private focusedTag: NgModel;
	errorMsg: string = '';

	constructor(private userServie: UserService, private router: Router) { }

	submit(f: NgForm) {
		this.userServie.login(f.value.username, f.value.password)
			.subscribe(
				() => this.router.navigate(['/beers']),
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
