import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Brew } from '../brew.model';
import { BrewService } from 'src/app/services/brew.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-brew-item',
	templateUrl: './brew-item.component.html',
	styleUrls: ['./brew-item.component.scss']
})
export class BrewItemComponent implements OnInit {

	@Input() brew: Brew;
	@Output() delete = new EventEmitter<string>();

	mouseOver = false;

	constructor() { }

	ngOnInit(): void {
	}

	deleteBrew() {
		this.delete.emit(this.brew.brewId);
	}
}
