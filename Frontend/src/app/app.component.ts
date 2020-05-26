import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';
import { BrewService } from './services/brew.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	title = 'Frontend';
	isLoggedIn: Observable<boolean>;
	brewChanged: Observable<{ value: boolean }>;

	constructor(private userService: UserService, private brewService: BrewService) { }

	ngOnInit(): void {
		this.isLoggedIn = this.userService.isLoggedIn();
		this.brewChanged = this.brewService.isBrewChanged();
	}


}
