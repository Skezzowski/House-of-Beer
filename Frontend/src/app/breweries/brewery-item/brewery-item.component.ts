import { Component, Input } from '@angular/core';
import { Brewery } from '../brewery.model';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-brewery-item',
	templateUrl: './brewery-item.component.html',
	styleUrls: ['./brewery-item.component.scss']
})
export class BreweryItemComponent {

	@Input() brewery: Brewery;

	dbUrl = environment.dbUrl;

	constructor() { }
}
