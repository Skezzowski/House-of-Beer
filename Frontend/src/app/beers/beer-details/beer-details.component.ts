import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BeerService } from 'src/app/services/beer.service';
import { Beer } from '../beer.model';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-beer-details',
	templateUrl: './beer-details.component.html',
	styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {
	beer: Beer;
	id: string;

	dbUrl = environment.dbUrl;

	constructor(private beerService: BeerService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = params['id'];
					this.beerService.getBeer(this.id).subscribe(res => this.beer = res);
				}
			);
	}

}
