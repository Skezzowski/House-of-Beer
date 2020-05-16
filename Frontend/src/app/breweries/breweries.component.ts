import { Component, OnInit } from '@angular/core';
import { Brewery } from './brewery.model';
import { BreweryService } from '../services/brewery.service';

@Component({
	selector: 'app-breweries',
	templateUrl: './breweries.component.html',
	styleUrls: ['./breweries.component.scss']
})
export class BreweriesComponent implements OnInit {

	breweryList: Brewery[];

	constructor(private breweryService: BreweryService) { }

	ngOnInit(): void {
		this.breweryService.getBreweries().subscribe(res => this.breweryList = res);
	}

}
