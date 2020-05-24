import { IBrew, IBrewMenuModel } from "../models/brew.model";
import { stat } from "fs";

export function brewsToMenuModel(brews: IBrew[]): IBrewMenuModel[] {
	const result: IBrewMenuModel[] = []

	brews.map(brew => {
		result.push({
			beerId: brew.beer._id,
			beerName: brew.beer.name,
			beerType: brew.beer.type,
			brewId: brew._id,
			actionNeeded: brew.isActionNeeded(),
			done: brew.done
		});
	});

	return result;
}

export function hourToMilliseconds(hour: number): number {
	return hour * 3600000;
}

export function millisecondsToHour(millisec: number) {
	return millisec / 3600000;
}


export class IError extends Error {
	status: number

	constructor(status: number, msg: string) {
		super(msg);
		this.status = status;
	}
}
