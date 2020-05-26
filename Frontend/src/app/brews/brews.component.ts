import { Component, OnInit } from '@angular/core';
import { Brew } from './brew.model';
import { BrewService } from '../services/brew.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-brews',
	templateUrl: './brews.component.html',
	styleUrls: ['./brews.component.scss']
})
export class BrewsComponent implements OnInit {

	brewsList: Brew[];
	loading: boolean = true;
	errorMsg = '';

	constructor(private brewService: BrewService) { }

	ngOnInit(): void {
		this.getBrews();
	}

	getBrews() {
		this.brewService.getBrews()
			.subscribe(
				res => this.brewsList = res,
				console.log,
				() => this.loading = false
			);
	}

	deleteBrew(id: string) {
		this.brewService.deleteBrew(id)
			.subscribe(
				() => this.getBrews(),
				(error: HttpErrorResponse) => {
					this.errorMsg = error.error.msg;
					setTimeout(() => {
						this.errorMsg = '';
					}, 3000);
				}
			);
	}

}
