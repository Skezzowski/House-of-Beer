import { Component, OnInit, Input } from '@angular/core';
import { Brew } from '../brew.model';

@Component({
	selector: 'app-brew-item',
	templateUrl: './brew-item.component.html',
	styleUrls: ['./brew-item.component.scss']
})
export class BrewItemComponent implements OnInit {

	@Input() brew: Brew;

	constructor() { }

	ngOnInit(): void {
	}

}
