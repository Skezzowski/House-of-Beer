import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-password',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.scss']
})
export class PasswordComponent {

	errorMsg = '';
	successMsg = '';
	readonly passwordMinLength: number = 4;
	success = false;

	constructor(private userService: UserService, private router: Router) { }

	changePasswd(form: NgForm) {
		this.userService.changePasswd(form.value.oldpassword, form.value.newpassword).subscribe(
			(data) => {
				this.success = true;
				this.successMsg = data.msg;
				setTimeout(() => {
					this.router.navigate(['/profile']);
				}, 3000);
			},
			(error: HttpErrorResponse) => {
				this.errorMsg = error.error.msg;
			}
		);
	}

}
