import { Component, OnInit, Input } from '@angular/core';
import { Brewery } from '../brewery.model';

@Component({
	selector: 'app-brewery-item',
	templateUrl: './brewery-item.component.html',
	styleUrls: ['./brewery-item.component.scss']
})
export class BreweryItemComponent implements OnInit {

	@Input() brewery: Brewery;
	@Input() id: string;

	constructor() { }

	ngOnInit(): void {
	}
}
