import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BeerService } from 'src/app/services/beer.service';
import { Beer } from '../beer.model';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-beer-details',
	templateUrl: './beer-details.component.html',
	styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {

	beer: Beer;
	id: string;
	@Input() colContent: boolean = true;
	@Output() loadingIsDone = new EventEmitter<boolean>();
	dbUrl = environment.dbUrl;
	loading: boolean = true;

	constructor(private beerService: BeerService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = params['beerId'];
					this.beerService.getBeer(this.id)
						.subscribe(
							res => {
								this.beer = res;
								this.loadingIsDone.emit(true);
								this.loading = false;
							},
							console.log
						);
				}
			);
	}

}
