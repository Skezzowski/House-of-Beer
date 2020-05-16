import { Component, OnInit } from '@angular/core';
import { BreweryService } from 'src/app/services/brewery.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Brewery } from '../brewery.model';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-brewery-details',
	templateUrl: './brewery-details.component.html',
	styleUrls: ['./brewery-details.component.scss']
})
export class BreweryDetailsComponent implements OnInit {
	brewery: Brewery;
	id: string;
	dbUrl = environment.dbUrl;

	constructor(private breweryService: BreweryService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = params['id'];
					this.breweryService.getBrewery(this.id).subscribe(res => this.brewery = res);
				}
			);
	}
}
