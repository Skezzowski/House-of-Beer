import { Injectable } from '@angular/core';
import { Brewery } from '../breweries/brewery.model';

@Injectable({
	providedIn: 'root'
})
export class BreweryService {

	constructor() { }

	private breweries: Brewery[] = [
		new Brewery('0', 'Sörgyár', 'Prága', 'sörgyár leírása', 'assets/pictures/brewery.jpg'),
		new Brewery('1', 'Sörgyár 2', 'Sopron', 'sörgyár leírása', 'assets/pictures/brewery2.jpg'),
		new Brewery('2', 'Sörgyár 3', 'Város neve', 'sörgyár leírása', 'assets/pictures/brewery3.jpg')
	];

	getBreweries(): Brewery[] {
		return this.breweries.slice();
	}

	getBrewery(id: string): Brewery {
		let brewery: Brewery;
		this.breweries.forEach(e => {
			if (e.id === id) {
				brewery = e;
			}
		});
		return brewery;
	}
}
