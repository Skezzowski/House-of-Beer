import { Component, OnInit, Input } from '@angular/core';
import { Beer } from '../beer.model';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { BrewService } from 'src/app/services/brew.service';

@Component({
	selector: 'app-beer-item',
	templateUrl: './beer-item.component.html',
	styleUrls: ['./beer-item.component.scss']
})
export class BeerItemComponent implements OnInit {

	@Input() beer: Beer;

	dbUrl = environment.dbUrl;

	constructor(
		private userService: UserService,
		private brewService: BrewService) { }

	ngOnInit(): void {
	}

	public isLoggedIn(): boolean {
		return this.userService.isLoggedIn;
	}

	public startBrew(): void {
		this.brewService.startBrew(this.beer._id);
	}

}
