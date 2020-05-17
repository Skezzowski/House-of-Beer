import { Component, OnInit } from '@angular/core';
import { Brew } from './brew.model';
import { BrewService } from '../services/brew.service';

@Component({
	selector: 'app-brews',
	templateUrl: './brews.component.html',
	styleUrls: ['./brews.component.scss']
})
export class BrewsComponent implements OnInit {

	brewsList: Brew[];

	constructor(private brewService: BrewService) { }

	ngOnInit(): void {
		this.brewService.getBrews().subscribe(res => this.brewsList = res);
	}

}
