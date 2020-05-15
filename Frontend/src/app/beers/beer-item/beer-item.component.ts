import { Component, OnInit, Input } from '@angular/core';
import { Beer } from '../beer.model';

@Component({
	selector: 'app-beer-item',
	templateUrl: './beer-item.component.html',
	styleUrls: ['./beer-item.component.scss']
})
export class BeerItemComponent implements OnInit {

	@Input() beer: Beer;
	@Input() id: string;

	constructor() { }

	ngOnInit(): void {
	}

}
