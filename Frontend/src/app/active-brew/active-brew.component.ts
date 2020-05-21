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
	brew: CurrentBrew;
	loading: boolean = true;
	stageList: {
		name: string,
		description: string
	}[] = [];
	actionDescription: string;

	constructor(private router: Router, private route: ActivatedRoute, private brewService: BrewService, private beerService: BeerService) {
		this.loading = true;
	}

	ngOnInit(): void {
		this.route.params.subscribe(
			(params: Params) => {
				this.brewId = params.brewId;
				this.brewService.getBrew(this.brewId).subscribe(
					brew => {
						this.brew = brew;
						if (params.beerId !== brew.beerId) {
							this.router.navigate(['/unauthorized']);
							return;
						}
						for (let i = 0; i <= this.brew.currentStageIndex; i++)
							this.stageList.push(this.brew.stages[i + 1]);

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
			},
			error => { console.log(error); });
	}

	selectedAction(index: number) {
		this.actionDescription = this.stageList[index].description;
	}

}
