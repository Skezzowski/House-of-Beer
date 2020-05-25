import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	private focusedTag: NgModel;
	errorMsg: string = '';

	constructor(private userServie: UserService, private router: Router) { }

	ngOnInit() {
		localStorage.clear();
	}

	submit(f: NgForm) {
		this.userServie.login(f.value.username, f.value.password).subscribe(data => {
			this.router.navigate(['/beers']);
			this.userServie.loggedIn();
		}, (error: HttpErrorResponse) => {
			this.errorMsg = error.error.msg;
		});
	}

	focused(tag?: NgModel) {
		this.focusedTag = tag;
	}

	isFocused(tag: NgModel): boolean {
		return this.focusedTag === tag;
	}

}
