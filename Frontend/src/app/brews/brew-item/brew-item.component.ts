import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Brew } from '../brew.model';

@Component({
	selector: 'app-brew-item',
	templateUrl: './brew-item.component.html',
	styleUrls: ['./brew-item.component.scss']
})
export class BrewItemComponent {

	@Input() brew: Brew;
	@Output() delete = new EventEmitter<string>();

	mouseOver = false;

	constructor() { }

	deleteBrew() {
		this.delete.emit(this.brew.brewId);
	}
}
