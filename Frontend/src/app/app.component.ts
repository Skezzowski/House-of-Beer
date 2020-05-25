import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	title = 'Frontend';
	isLoggedIn: Observable<boolean>;

	constructor(private userService: UserService) { }

	ngOnInit(): void {
		this.isLoggedIn = this.userService.isLoggedIn();

	}


}
