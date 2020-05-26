import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BrewService } from '../services/brew.service';
import { CurrentBrew, Stage } from './current-brew.model';
import { Observable, of, throwError, concat, interval, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
	selector: 'app-active-brew',
	templateUrl: './active-brew.component.html',
	styleUrls: ['./active-brew.component.scss']
})
export class ActiveBrewComponent implements OnInit, OnDestroy {

	private brewId: string;
	private beerId: string;

	stageList: Stage[] = [];
	errorMsg: string = '';
	brew: CurrentBrew;
	loading: boolean = true;
	selectedIndex: number;
	lastStage: number;
	remainingHours: number = 0;
	remainingMinutes: number = 0;
	interval: Subscription;
	activeBrewIsReady: boolean = false;

	constructor(private router: Router, private route: ActivatedRoute, private brewService: BrewService) { }

	ngOnInit(): void {
		this.route.params.subscribe(
			(params: Params) => {
				this.brewId = params.brewId;
				this.beerId = params.beerId;
				this.interval = this.syncBrew()
					.pipe(
						switchMap(
							() => {
								this.loading = false;
								return interval(5000);
							}),
						switchMap(
							() => {
								if (!this.brew.done && !this.brew.actionNeeded) {
									return this.syncBrew()
								}
								return of(this.brew);
							})
					).subscribe(
						undefined,
						(error: HttpErrorResponse) => this.errorHandling(error)
					);
			},
			console.log
		);
	}

	syncBrew(): Observable<CurrentBrew> {
		return this.getBrew()
			.pipe(
				switchMap(brew => {
					this.stageList = [];
					this.lastStage = this.brew.currentStageIndex - 1;
					this.brew.stages.map(stage => this.stageList.push(stage));
					this.stageList.shift();
					if (this.brew.actionNeeded) {
						if (this.brew.currentStageIndex + 1 === this.brew.stages.length) {
							return this.doAction()
								.pipe(
									switchMap(() => {
										return this.getBrew();
									})
								);
						} else {
							this.lastStage += 1;
						}
					}
					return of(brew);
				})
			);
	}

	getBrew(): Observable<CurrentBrew> {
		return this.brewService.getBrew(this.brewId)
			.pipe(
				switchMap(brew => {
					this.brew = brew;
					if (this.beerId !== brew.beerId) {
						return throwError(new HttpErrorResponse({ status: 401 }))
					}
					if (!this.brew.actionNeeded)
						this.setRemainingTime();
					return of(brew);
				})
			);
	}

	selectedAction(index?: number): void {
		this.selectedIndex = index;
	}

	actionButtonClicked(): void {
		concat(this.doAction(), this.getBrew())
			.subscribe(
				undefined,
				(error: HttpErrorResponse) => this.errorHandling(error)
			);
	}

	doAction(): Observable<any> {
		return this.brewService.doAction(this.brewId)
			.pipe(
				tap(
					_ => this.selectedAction()
				)
			);
	}

	setRemainingTime(): void {
		this.remainingMinutes = Math.trunc(60 * this.brew.timeBeforeNextStage);
		this.remainingHours = Math.trunc(this.remainingMinutes / 60);
		this.remainingMinutes = this.remainingMinutes - 60 * this.remainingHours;
	}

	deleteBrew() {
		this.brewService.deleteBrew(this.brewId)
			.subscribe(
				() => {
					this.router.navigate(['/brews']);
				},
				(error: HttpErrorResponse) => this.errorHandling(error)
			);
	}

	errorHandling(error: HttpErrorResponse) {
		if (error.status === 401) {
			this.router.navigate(['/unauthorized']);
			return;
		}
		console.log(error);
		this.errorMsg = error.error.msg;
		setTimeout(() => {
			this.errorMsg = '';
		}, 3000);
	}

	ngOnDestroy(): void {
		this.interval.unsubscribe();
	}

}
