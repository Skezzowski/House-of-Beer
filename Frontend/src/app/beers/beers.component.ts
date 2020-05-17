import { Component, OnInit } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { Beer } from './beer.model';

@Component({
	selector: 'app-beers',
	templateUrl: './beers.component.html',
	styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {

	beerList: Beer[];

	constructor(private beerService: BeerService) { }

	ngOnInit(): void {
		this.beerService.getBeers().subscribe(res => this.beerList = res);
	}

}
