import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BrewService } from '../services/brew.service';
import { CurrentBrew } from './current-brew.model';
import { Beer } from '../beers/beer.model';
import { BeerService } from '../services/beer.service';

@Component({
	selector: 'app-active-brew',
	templateUrl: './active-brew.component.html',
	styleUrls: ['./active-brew.component.scss']
})
export class ActiveBrewComponent implements OnInit {

	private brewId: string;
	private beerId: string;
	brew: CurrentBrew;
	loading: boolean = true;
	stageList: {
		name: string,
		description: string
	}[] = [];
	actionDescription: string;
	selectedIndex: number;
	actionButtonNeeded: boolean = false;

	constructor(private router: Router, private route: ActivatedRoute, private brewService: BrewService, private beerService: BeerService) {
		this.loading = true;
	}

	ngOnInit(): void {
		this.route.params.subscribe(
			(params: Params) => {
				this.brewId = params.brewId;
				this.beerId = params.beerId;
				this.getBrew();
			},
			console.log
		);
	}

	getBrew() {
		this.brewService.getBrew(this.brewId).subscribe(
			brew => {
				this.brew = brew;
				if (this.beerId !== brew.beerId) {
					this.router.navigate(['/unauthorized']);
					return;
				}
				this.stageList = [];
				for (let i = 0; i < this.brew.currentStageIndex; i++) {
					this.stageList.push(this.brew.stages[i + 1]);
				}
				if (this.brew.actionNeeded) {
					this.stageList.push(this.brew.stages[this.brew.currentStageIndex + 1]);
				}
				this.loading = false;
			},
			(error: HttpErrorResponse) => {
				if (error.status === 401 || error.status === 403) {
					this.router.navigate(['/unauthorized']);
				} else {
					this.router.navigate(['/error']);
				}
			}
		);
	}

	selectedAction(index: number) {
		this.selectedIndex = index;
		if (this.brew.currentStageIndex === index && this.brew.actionNeeded)
			this.actionButtonNeeded = true;
		else
			this.actionButtonNeeded = false;
		this.getBrew();
		this.actionDescription = this.stageList[index].description;
	}

	doAction() {
		this.brewService.doAction(this.brewId).subscribe(
			data => {
				console.log(data);
				this.actionButtonNeeded = false;
				this.actionDescription = undefined;
				this.selectedIndex = undefined;
				this.getBrew();
			},
			console.log
		);
	}

}
