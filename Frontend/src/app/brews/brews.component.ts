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
		this.brewsList = [{
			'brewId': 'főzés_id',
			'beerName': 'soproni',
			'beerType': 'IPA',
			'actionNeeded': true,
			'beerId': 'sör_id'
		},
		{
			'brewId': 'főzés_id_2',
			'beerName': 'soproni2',
			'beerType': 'APA',
			'actionNeeded': false,
			'beerId': 'sör_id2'
		}];
		//this.brewService.getBrews().subscribe(res => this.brewsList = res);
	}

}
